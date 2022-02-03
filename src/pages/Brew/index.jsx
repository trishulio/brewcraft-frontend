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
    fetchBatchStatuses,
    fetchBatchTasks,
    fetchMeasures,
    fetchMaterialStockQuantity,
    setBatchDetails,
    fetchMaterialPortionsByBrewId,
    fetchMixtureRecordingsByBrewId,
    fetchFinishedGoodsByBrewId,
    fetchMixturesByBrewId,
    fetchAllBrewStages,
    editFermentMixtureRecords,
    deleteFermentMixtureRecords,
    saveFermentFinishedGoods,
    deleteFermentFinishedGoods,
    deleteTransferMixtureRecords,
    saveTransferMixtureRecords,
    editBrewStages,
    editBrewMixtures,
    editMaterialPortions,
    deleteMaterialPortions,
} from "../../store/actions";
import { useQuery } from "../../helpers/utils";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";
import BatchInner from "./batch";

export default function Batch() {
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
        return state.Batch.Mixtures.content;
    });

    const initialMixtures = useSelector((state) => {
        return state.Batch.Mixtures.initial;
    });

    const materialPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.content;
    });

    const initialMaterialPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.initial;
    });

    const {
        content: transferMixtureRecords,
        initial: initialTransferMixtureRecords,
    } = useSelector((state) => {
        return state.Batch.TransferMixtureRecordings;
    });

    const {
        content: fermentMixtureRecords,
        initial: initialFermentMixtureRecords,
    } = useSelector((state) => {
        return state.Batch.FermentMixtureRecordings;
    });

    const {
        content: fermentFinishedGoods,
        initial: initialFermentFinishedGoods,
    } = useSelector((state) => {
        return state.Batch.FermentFinishedGoods;
    });

    useEffect(() => {
        history.push({
            search: "?edit=true",
        });
        if (id !== "new") {
            dispatch(fetchBatchById(id));
            dispatch(fetchAllBrewStages(id));
            dispatch(fetchMixturesByBrewId(id));
            dispatch(fetchMaterialPortionsByBrewId(id));
            dispatch(fetchMixtureRecordingsByBrewId(id));
            dispatch(fetchFinishedGoodsByBrewId({ brewId: id, pageSize: 500 }));
        } else {
            dispatch(resetBatchDetails());
        }
        dispatch(fetchBatchStatuses());
        dispatch(fetchBatchTasks());
        dispatch(fetchMeasures());
        dispatch(fetchMaterialStockQuantity());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (batch.id) {
            dispatch(
                setBreadcrumbItems(
                    `Brew ${batch.batchId} - ${batch.product.name}`,
                    [
                        { title: "Main", link: "#" },
                        { title: "Batches", link: "#" },
                        { title: "Brews", link: "#" },
                    ]
                )
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

    const changed = useSelector((state) => {
        return (
            JSON.stringify(state.Batch.Batch.data) !==
                JSON.stringify(state.Batch.Batch.initial) ||
            JSON.stringify(state.Batch.Stages.content) !==
                JSON.stringify(state.Batch.Stages.initial) ||
            JSON.stringify(state.Batch.Mixtures.content) !==
                JSON.stringify(state.Batch.Mixtures.initial) ||
            JSON.stringify(state.Batch.MaterialPortions.content) !==
                JSON.stringify(state.Batch.MaterialPortions.initial)
        );
    });

    function saveStage(stage, initialStage, editStage) {
        if (JSON.stringify(initialStage) !== JSON.stringify(stage)) {
            dispatch(
                editStage({
                    id: stage.id,
                    form: {
                        statusId: stage.status.id,
                        taskId: stage.task.id,
                        startedAt: stage.startedAt,
                        endedAt: stage.endedAt,
                        version: stage.version,
                    },
                })
            );
        }
    }

    function saveMixture(mixture, initialMixture, editMixture) {
        if (JSON.stringify(initialMixture) !== JSON.stringify(mixture)) {
            dispatch(
                editMixture({
                    id: mixture.id,
                    form: {
                        parentMixtureId: mixture.parentMixtureId,
                        quantity: {
                            ...mixture.quantity,
                        },
                        brewStageId: mixture.brewStage.id,
                        version: mixture.version,
                    },
                })
            );
        }
    }

    function saveFinishedGoods(
        finishedGoods,
        initialFinishedGoods,
        saveFinishedGoods,
        deleteFinishedGoods
    ) {
        if (
            JSON.stringify(finishedGoods) !==
            JSON.stringify(initialFinishedGoods)
        ) {
            if (finishedGoods.length) {
                dispatch(
                    saveFinishedGoods({
                        batchId: batch.id,
                        form: finishedGoods.map((fg) => ({
                            id: fg.id,
                            skuId: fg.sku.id,
                            materialPortions: fg.materialPortions.map((mp) => ({
                                mixtureId: mp.mixture.id,
                                quantity: mp.quantity,
                                addedAt: mp.addedAt,
                            })),
                            mixturePortions: fg.mixturePortions.map((mp) => ({
                                mixtureId: mp.mixture.id,
                                quantity: mp.quantity,
                                addedAt: mp.addedAt,
                            })),
                            packagedOn: fg.packagedOn,
                            version: fg.version,
                            quantity: fg.quantity,
                        })),
                    })
                );
            }
            // delete finished goods
            const map = finishedGoods.map((mp) => mp.id);
            const finishedGoodsIds = initialFinishedGoods
                .filter((ifg) => !map.includes(ifg.id))
                .map((finishedGoods) => finishedGoods.id);
            if (finishedGoodsIds.length) {
                dispatch(
                    deleteFinishedGoods({
                        batchId: batch.id,
                        form: finishedGoodsIds,
                    })
                );
            }
        }
    }

    function saveMaterialPortions(
        materialPortions,
        initialMaterialPortions,
        saveMaterialPortions,
        deleteMaterialPortions
    ) {
        if (
            JSON.stringify(initialMaterialPortions) !==
            JSON.stringify(materialPortions)
        ) {
            if (materialPortions.length) {
                dispatch(
                    saveMaterialPortions({
                        form: materialPortions.map((mp) => ({
                            id: mp.id,
                            materialLotId: mp.materialLot.id,
                            quantity: mp.quantity,
                            mixtureId: mp.mixture.id,
                            // addedAt: "2021-11-03T02:59:16.053Z",
                            version: mp.version,
                        })),
                    })
                );
            }
            // delete material portions
            const map = materialPortions.map((mp) => mp.id);
            const mp = initialMaterialPortions
                .filter((imp) => !map.includes(imp.id))
                .map((mp) => mp.id);
            if (mp.length) {
                dispatch(
                    deleteMaterialPortions({
                        form: mp,
                    })
                );
            }
        }
    }

    function saveMixtureRecords(
        mixtureRecords,
        initialMixtureRecords,
        saveMixtureRecords,
        deleteMixtureRecords
    ) {
        if (
            JSON.stringify(initialMixtureRecords) !==
            JSON.stringify(mixtureRecords)
        ) {
            if (mixtureRecords.length) {
                dispatch(
                    saveMixtureRecords({
                        form: mixtureRecords.map((record) => ({
                            id: record.id,
                            mixtureId: record.mixture.id,
                            measureId: record.measure.id,
                            value: record.value,
                            recordedAt: record.recordedAt,
                            version: record.version,
                        })),
                    })
                );
            }
            // delete mixture records
            const map = mixtureRecords.map((mp) => mp.id);
            const records = initialMixtureRecords
                .filter((imp) => !map.includes(imp.id))
                .map((records) => records.id);
            if (records.length) {
                dispatch(
                    deleteMixtureRecords({
                        batchId: batch.id,
                        form: records,
                    })
                );
            }
        }
    }

    function onSave() {
        if (batch.id) {
            // save stages
            for (let i = 0; i < stages.length; i++) {
                saveStage(stages[i], initialStages[i], editBrewStages);
            }
            // save mixtures
            for (let i = 0; i < mixtures.length; i++) {
                saveMixture(mixtures[i], initialMixtures[i], editBrewMixtures);
            }
            // save material portions
            saveMaterialPortions(
                materialPortions,
                initialMaterialPortions,
                editMaterialPortions,
                deleteMaterialPortions
            );
            saveMixtureRecords(
                fermentMixtureRecords,
                initialFermentMixtureRecords,
                editFermentMixtureRecords,
                deleteFermentMixtureRecords
            );
            saveFinishedGoods(
                fermentFinishedGoods,
                initialFermentFinishedGoods,
                saveFermentFinishedGoods,
                deleteFermentFinishedGoods
            );
            // save transfer
            saveMixtureRecords(
                transferMixtureRecords,
                initialTransferMixtureRecords,
                saveTransferMixtureRecords,
                deleteTransferMixtureRecords
            );
            // save batch
            if (JSON.stringify(batch) !== JSON.stringify(initialBatch)) {
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
                            version: batch.version,
                        },
                    })
                );
            }
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
                        endedAt: batch.endedAt,
                    },
                })
            );
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
                content="This cannot be undone. Are you sure want to delete this batch?"
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
