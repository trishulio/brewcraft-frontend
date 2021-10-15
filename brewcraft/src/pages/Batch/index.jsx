import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchBatchById,
    editBatch,
    saveBatch,
    deleteBatch,
    resetBatchDetails,
    fetchAllProducts,
    fetchBatchStatuses,
    fetchBatchTasks
} from "../../store/actions";
import {
    useQuery
} from "../../helpers/utils";
import BatchInner from "./batch";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";

export default function Batch() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);
    const [activeTab, setActiveTab] = useState("mash");
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const batch = useSelector(state => {
        return state.Batch.details.data;
    });

    const initialBatch = useSelector(state => {
        return state.Batch.details.initial;
    });

    const { invalidName } = useSelector(state => {
        return state.Batch.details;
    })

    useEffect(() => {
        function fetchBatch() {
            dispatch(fetchBatchById(id));
            // dispatch(fetchMaterialPortionById(id));
            // dispatch(fetchMixtureById(id));
            // dispatch(fetchMixtureRecordingById(id));
        };
        if (id === "new") {
            dispatch(resetBatchDetails());
            history.replace("/batches/new?edit=true");
        } else {
            fetchBatch();
        }
        if (editMode) {
            dispatch(fetchAllProducts());
        }
        dispatch(fetchBatchStatuses());
        dispatch(fetchBatchTasks());
        setEditable(editMode && editMode !== "false");
        setShowRouterPrompt(!!editMode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode]);

    useEffect(() => {
        if (batch.id) {
            dispatch(
                setBreadcrumbItems(batch.name, [
                    { title: "Main", link: "#" },
                    { title: "Batches", link: "#" }
                ]),
            );
        } else {
            dispatch(
                setBreadcrumbItems("New Batch", [
                    { title: "Main", link: "#" },
                    { title: "Batches", link: "#" }
                ]),
            );
        }
        setChanged(isChanged());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [batch]);

    function isChanged() {
        debugger;
        return JSON.stringify(
                (({ id, name, description, batchId, product, parentBrewId, startedAt, endedAt }) => ({ id, name, description, batchId, product, parentBrewId, startedAt, endedAt }))(initialBatch))
            !== JSON.stringify(
                (({ id, name, description, batchId, product, parentBrewId, startedAt, endedAt }) => ({ id, name, description, batchId, product, parentBrewId, startedAt, endedAt }))(batch))
    }

    function onSave() {
        if (invalidName) {
            return;
        }
        if (!isChanged()) {
            history.push("/batches/" + id);

        } else if (batch.id) {
            dispatch(
                editBatch({
                    id: batch.id,
                    form: {
                        name: batch.name,
                        description: batch.description,
                        batchId: batch.batchId,
                        productId: parseInt(batch.product.id),
                        parentBrewId: batch.parentBrewId || null,
                        startedAt: batch.startedAt,
                        endedAt: batch.endedAt,
                        version: batch.version
                    }
                })
            );
        } else {
            dispatch(
                saveBatch({
                    form: {
                        name: batch.name,
                        description: batch.description,
                        batchId: batch.batchId,
                        productId: parseInt(batch.product.id),
                        parentBrewId: batch.parentBrewId || null,
                        startedAt: batch.startedAt,
                        endedAt: batch.endedAt
                    }
                })
            );
        }
    }

    function onDelete() {
        setShowDeletePrompt(!!batch.id);
    }

    function onTabChange(tab) {
        setActiveTab(tab);
    }

    const props = {
        activeTab,
        editable,
        changed,
        onSave,
        onDelete,
        onTabChange
    }

    return (
        <React.Fragment>
            <DeleteGuard
                when={showDeletePrompt}
                confirm={() => {
                    dispatch(deleteBatch(batch.id));
                    setShowRouterPrompt(false);
                }}
                close={() => {
                    setShowDeletePrompt(false);
                }}
                content="This cannot be undone. Are you sure want to delete this batch?"
            />
            <RouteLeavingGuard
                when={showRouterPrompt}
                navigate={path => {
                    history.push(path);
                }}
                shouldBlockNavigation={() => editMode && isChanged()}
                content="There are unsaved changes. Are you sure want to leave this page?"
            />
            <BatchInner {...props} />
        </React.Fragment>
    );
}