import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchBatch,
    editBatch,
    deleteBatch,
    resetBatchDetails,
    fetchBatchStatuses,
    fetchBatchTasks,
    fetchMeasures,
    fetchMaterialStockQuantity,
    fetchAllUsers,
    setBatchDetails,
    addBatch,
    fetchEquipment,
} from "../../store/actions";
import { useQuery } from "../../helpers/utils";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";
import BatchInner from "./batch";

export default function Batch() {
    const [activeTab, setActiveTab] = useState("details");
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const edit = query.get("edit");
    const dispatch = useDispatch();

    const {
        data: batch,
        initial: initialBatch,
        changed,
        error,
    } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const stages = useSelector((state) => {
        return state.Batch.Stages.content;
    });

    const initialStages = useSelector((state) => {
        return state.Batch.Stages.initial;
    });

    const mixtures = useSelector((state) => {
        return state.Batch.BrewMixtures.content;
    });

    const initialMixtures = useSelector((state) => {
        return state.Batch.BrewMixtures.initial;
    });

    const materialPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.content;
    });

    const initialMaterialPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial;
    });

    const mixtureRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.content;
    });

    const initialMixtureRecordings = useSelector((state) => {
        return state.Batch.MixtureRecordings.initial;
    });

    const finishedGoods = useSelector((state) => {
        return state.Batch.BatchFinishedGoods.content;
    });

    const initialFinishedGoods = useSelector((state) => {
        return state.Batch.BatchFinishedGoods.initial;
    });

    useEffect(() => {
        if (!edit) {
            history.replace({
                search: "?edit=true",
            });
        }
        if (id !== "new") {
            dispatch(fetchBatch({ batchId: id }));
        } else {
            dispatch(resetBatchDetails());
        }
        dispatch(fetchBatchStatuses());
        dispatch(fetchBatchTasks());
        dispatch(fetchMeasures());
        dispatch(fetchMaterialStockQuantity());
        dispatch(fetchEquipment());
        dispatch(fetchAllUsers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (batch.id) {
            dispatch(
                setBreadcrumbItems(`Brew ${batch.id} - ${batch.product.name}`, [
                    { title: "Main", link: "#" },
                    { title: "Batches", link: "#" },
                    { title: "Brews", link: "#" },
                ])
            );
        } else {
            dispatch(
                setBreadcrumbItems("New Brew", [
                    { title: "Main", link: "#" },
                    { title: "Batches", link: "#" },
                ])
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [batch]);

    useEffect(() => {
        dispatch(
            setBatchDetails({
                editable: !!edit,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit]);

    useEffect(() => {
        dispatch(
            setBatchDetails({
                changed:
                    JSON.stringify(batch) !== JSON.stringify(initialBatch) ||
                    JSON.stringify(stages) !== JSON.stringify(initialStages) ||
                    JSON.stringify(mixtures) !==
                        JSON.stringify(initialMixtures) ||
                    JSON.stringify(materialPortions) !==
                        JSON.stringify(initialMaterialPortions) ||
                    JSON.stringify(mixtureRecordings) !==
                        JSON.stringify(initialMixtureRecordings) ||
                    JSON.stringify(finishedGoods) !==
                        JSON.stringify(initialFinishedGoods),
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        batch,
        stages,
        mixtures,
        materialPortions,
        mixtureRecordings,
        finishedGoods,
    ]);

    function onSave() {
        if (!changed) {
            return;
        }
        if (!batch.id) {
            dispatch(addBatch());
        } else {
            dispatch(editBatch());
        }
    }

    function onDelete() {
        setShowDeletePrompt(!!batch.id);
    }

    function setEditable() {
        history.push({
            search: "?edit=true",
        });
    }

    const props = {
        activeTab,
        setActiveTab,
        setEditable,
        changed,
        error,
        onSave,
        onDelete,
        batch,
    };

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
                content="This cannot be undone. Are you sure want to delete this brew?"
            />
            <RouteLeavingGuard
                when={showRouterPrompt}
                navigate={(path) => {
                    history.push(path);
                }}
                shouldBlockNavigation={() => changed}
                content="There are unsaved changes. Are you sure want to leave this page?"
            />
            <BatchInner {...props} />
        </React.Fragment>
    );
}
