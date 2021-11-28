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
    fetchBatchTasks,
    fetchMeasures,
    fetchMaterialStockQuantity,
    setBatchDetails
} from "../../store/actions";
import {
    useQuery
} from "../../helpers/utils";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";
import BatchInner from "./batch";
import Stages from "./stages";
import Mixtures from "./mixtures";
import MaterialPortions from "./material-portions";
import MixtureRecordings from "./mixture-recordings";

export default function Batch() {
    const [changed, setChanged] = useState(false);
    const [batchChanged, setBatchChanged] = useState(false);
    const [stagesChanged, setStagesChanged] = useState(false);
    const [mixturesChanged, setMixturesChanged] = useState(false);
    const [materialPortionsChanged, setMaterialPortionsChanged] = useState(false);
    const [mixtureRecordingsChanged, setMixtureRecordingsChanged] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const {
        data: batch,
        initial: initialBatch,
        invalidBatchId,
        invalidBatchStartedAt,
        invalidBatchEndedAt,
        invalidBatchProduct,
        editable,
        error
    } = useSelector(state => {
        return state.Batch.Batch;
    });

    useEffect(() => {
        dispatch(resetBatchDetails());
        if (id === "new") {
            history.replace("/brews/new?edit=true");
        } else {
            dispatch(fetchBatchById(id));
        }
        dispatch(fetchAllProducts());
        dispatch(fetchBatchStatuses());
        dispatch(fetchBatchTasks());
        dispatch(fetchMeasures());
        dispatch(fetchMaterialStockQuantity());
        dispatch(setBatchDetails({
            editable: editMode && editMode !== "false"
        }));
        setShowRouterPrompt(!!editMode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode]);

    useEffect(() => {
        if (batch.id) {
            dispatch(
                setBreadcrumbItems(`Brew ${batch.batchId}`, [
                    { title: "Main", link: "#" },
                    { title: "Batches", link: "#" },
                    { title: "Brews", link: "#"}
                ]),
            );
        } else {
            dispatch(
                setBreadcrumbItems("New Brew", [
                    { title: "Main", link: "#" },
                    { title: "Batches", link: "#" }
                ]),
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [batch]);

    useEffect(() => {
        setChanged(isChanged());
    }, [
        batchChanged,
        stagesChanged,
        mixturesChanged,
        materialPortionsChanged,
        mixtureRecordingsChanged
    ]);

    useEffect(() => {
        setBatchChanged(isBatchChanged());
    }, [batch, initialBatch]);

    function isBatchChanged() {
        return JSON.stringify(
                (({ id, name, description, batchId, product, parentBrewId, startedAt, endedAt }) => ({ id, name, description, batchId, product, parentBrewId, startedAt, endedAt }))(initialBatch))
            !== JSON.stringify(
                (({ id, name, description, batchId, product, parentBrewId, startedAt, endedAt }) => ({ id, name, description, batchId, product, parentBrewId, startedAt, endedAt }))(batch))
    }

    function isChanged() {
        return batchChanged
            || stagesChanged
            || mixturesChanged
            || materialPortionsChanged
            || mixtureRecordingsChanged
    }

    function onSave() {
        if (invalidBatchId
            || invalidBatchStartedAt
            || invalidBatchEndedAt
            || invalidBatchProduct) {
                dispatch(setBatchDetails({ error: true }));

        } else if (!batchChanged) {
            dispatch(setBatchDetails({ save: true }));

        } else if (batch.id) {
            dispatch(
                editBatch({
                    id: batch.id,
                    form: {
                        name: batch.name,
                        description: batch.description,
                        batchId: batch.batchId,
                        productId: parseInt(batch.product.id),
                        parentBrewId: batch.parentBrewId,
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

    function setEditable() {
        history.push({
            search: "?edit=true"
        });
    }

    const props = {
        editable,
        setEditable,
        changed,
        setChanged,
        error,
        onSave,
        onDelete,
        batch,
        setStagesChanged,
        setMixturesChanged,
        setMaterialPortionsChanged,
        setMixtureRecordingsChanged
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
            {batch.id && <Stages {...props}/>}
            {batch.id && <Mixtures {...props}/>}
            {batch.id && <MaterialPortions {...props}/>}
            {batch.id && <MixtureRecordings {...props}/>}
            <BatchInner {...props} />
        </React.Fragment>
    );
}