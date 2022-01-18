import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setFermentMaterialPortionDetails,
    setFermentMixtureDetails,
    setFermentMixtureRecords,
    setFermentStageDetails,
    setFermentFinishedGoodsDetails,
    editFermentStage,
    editFermentMixture,
    saveFermentFinishedGoods,
    editFermentMaterialPortion,
    deleteFermentMaterialPortion,
    editFermentMixtureRecords,
    deleteFermentMixtureRecords,
    deleteFermentFinishedGoods,
} from "../../../../store/actions";
import Details from "../mixture/details";
import Ingredients from "../mixture/ingredients";
import Recordings from "../mixture/mixture-recordings";
import FinishedGoods from "../mixture/finished-goods";
import BatchStage from "./stage";

export default function BatchFerment() {
    const dispatch = useDispatch();

    const {
        data: stage,
        initial: initialStage,
        changed,
        editable,
        loading: stageLoading,
        error: stageError,
    } = useSelector((state) => {
        return state.Batch.FermentStage;
    });

    const batch = useSelector((state) => {
        return state.Batch.Batch.data;
    });

    const {
        data: mixture,
        initial: initialMixture,
        loading: mixtureLoading,
        error: mixtureError,
    } = useSelector((state) => {
        return state.Batch.FermentMixture;
    });

    const {
        content: materialPortions,
        initial: initialMaterialPortions,
        loading: materialPortionsLoading,
        error: materialPortionsError,
    } = useSelector((state) => {
        return state.Batch.FermentMaterialPortion;
    });

    const {
        content: mixtureRecordings,
        initial: initialMixtureRecordings,
        loading: mixtureRecordingsLoading,
        error: mixtureRecordingsError,
    } = useSelector((state) => {
        return state.Batch.FermentMixtureRecordings;
    });

    const {
        content: finishedGoods,
        initial: initialFinishedGoods,
        loading: finishedGoodsLoading,
        error: finishedGoodsError,
    } = useSelector((state) => {
        return state.Batch.FermentFinishedGoods;
    });

    useEffect(() => {
        dispatch(
            setFermentStageDetails({
                changed: isChanged(),
            })
        );
        // eslint-disable-next-line
    }, [stage, mixture, materialPortions, mixtureRecordings, finishedGoods]);

    function isChanged() {
        return (
            JSON.stringify(initialStage) !== JSON.stringify(stage) ||
            JSON.stringify(initialMixture) !== JSON.stringify(mixture) ||
            JSON.stringify(initialMaterialPortions) !==
                JSON.stringify(materialPortions) ||
            JSON.stringify(initialMixtureRecordings) !==
                JSON.stringify(mixtureRecordings) ||
            JSON.stringify(initialFinishedGoods) !==
                JSON.stringify(finishedGoods)
        );
    }

    function setStage(stage) {
        dispatch(
            setFermentStageDetails({
                data: {
                    ...stage,
                },
            })
        );
    }

    function setMixture(mixture) {
        dispatch(
            setFermentMixtureDetails({
                data: {
                    ...mixture,
                },
            })
        );
    }

    function setMaterialPortions(materialPortions) {
        dispatch(
            setFermentMaterialPortionDetails({
                content: [...materialPortions],
            })
        );
    }

    function setMixtureRecordings(mixtureRecordings) {
        dispatch(
            setFermentMixtureRecords({
                content: [...mixtureRecordings],
            })
        );
    }

    function setFinishedGoods(finishedGoods) {
        dispatch(
            setFermentFinishedGoodsDetails({
                content: [...finishedGoods],
            })
        );
    }

    const detailsProps = {
        stage,
        setStage,
        mixture,
        setMixture,
        editable,
        showCompleteCheckbox: true,
        // showOriginalGravityCheckbox: true,
    };

    const ingredientsProps = {
        mixture,
        editable,
        materialPortions,
        setMaterialPortions,
    };

    const recordingsProps = {
        mixture,
        editable,
        mixtureRecordings,
        setMixtureRecordings,
    };

    const finishedGoodsProps = {
        mixture,
        editable,
        finishedGoods,
        setFinishedGoods,
    };

    function onSave() {
        if (changed && JSON.stringify(initialStage) !== JSON.stringify(stage)) {
            dispatch(
                editFermentStage({
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
        if (
            changed &&
            JSON.stringify(initialMixture) !== JSON.stringify(mixture)
        ) {
            dispatch(
                editFermentMixture({
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
        if (
            changed &&
            JSON.stringify(initialMaterialPortions) !==
                JSON.stringify(materialPortions)
        ) {
            if (materialPortions.length) {
                dispatch(
                    editFermentMaterialPortion({
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
                    deleteFermentMaterialPortion({
                        form: mp,
                    })
                );
            }
        }
        if (
            changed &&
            JSON.stringify(initialMixtureRecordings) !==
                JSON.stringify(mixtureRecordings)
        ) {
            if (mixtureRecordings.length) {
                dispatch(
                    editFermentMixtureRecords({
                        form: mixtureRecordings.map((record) => ({
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
            // delete mixture recordings
            const map = mixtureRecordings.map((mp) => mp.id);
            const records = initialMixtureRecordings
                .filter((imp) => !map.includes(imp.id))
                .map((records) => records.id);
            if (records.length) {
                dispatch(
                    deleteFermentMixtureRecords({
                        batchId: batch.id,
                        form: records,
                    })
                );
            }
        }
        if (
            changed &&
            JSON.stringify(initialFinishedGoods) !==
                JSON.stringify(finishedGoods)
        ) {
            if (finishedGoods.length) {
                dispatch(
                    saveFermentFinishedGoods({
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
                    deleteFermentFinishedGoods({
                        batchId: batch.id,
                        form: finishedGoodsIds,
                    })
                );
            }
        }
    }

    const stageProps = {
        title: "Mash Lauter",
        editable,
        setEditable: () => {
            dispatch(
                setFermentStageDetails({
                    editable: true,
                })
            );
        },
        changed,
        initialStage,
        stage,
        stageLoading,
        mixtureLoading,
        materialPortionsLoading,
        mixtureRecordingsLoading,
        finishedGoodsLoading,
        stageError,
        mixtureError,
        materialPortionsError,
        mixtureRecordingsError,
        finishedGoodsError,
        onSave,
        onCancel: () => {
            dispatch(
                setFermentStageDetails({
                    data: {
                        ...initialStage,
                    },
                    editable: false,
                })
            );
        },
    };

    return (
        <React.Fragment>
            <BatchStage {...stageProps}>
                <Details {...detailsProps} />
                <div className="clearFix mb-1"></div>
                <Ingredients {...ingredientsProps} />
                <div className="clearFix mb-1"></div>
                <Recordings {...recordingsProps} />
                <div className="clearFix mb-1"></div>
                <FinishedGoods {...finishedGoodsProps} />
            </BatchStage>
        </React.Fragment>
    );
}
