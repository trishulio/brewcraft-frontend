import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "reactstrap";
import {
    setFermentMaterialPortionDetails,
    setFermentMixtureDetails,
    setFermentMixtureRecords,
    setFermentStageDetails,
    setFermentFinishedGoodsDetails,
    editFermentStage,
    editFermentMixture,
    saveFermentFinishedGoods,
    fetchFermentFinishedGoods,
    editFermentMaterialPortion,
    deleteFermentMaterialPortion,
} from "../../../../store/actions";
import Details from "../mixture/details";
import Ingredients from "../mixture/ingredients";
import Recordings from "../mixture/mixture-recordings";
import FinishedGoods from "../mixture/finished-goods";

export default function BatchFerment() {
    const dispatch = useDispatch();

    const {
        data: stage,
        initial: initialStage,
        changed,
        editable,
        stageError,
    } = useSelector((state) => {
        return state.Batch.FermentStage;
    });

    const {
        data: mixture,
        initial: initialMixture,
        mixtureError,
    } = useSelector((state) => {
        return state.Batch.FermentMixture;
    });

    const {
        content: materialPortions,
        initial: initialMaterialPortions,
        materialPortionError,
    } = useSelector((state) => {
        return state.Batch.FermentMaterialPortion;
    });

    const {
        content: mixtureRecordings,
        initial: initialMixtureRecordings,
        mixtureRecordingsError,
    } = useSelector((state) => {
        return state.Batch.FermentMixtureRecordings;
    });

    const {
        content: finishedGoods,
        initial: initialFinishedGoods,
        finishedGoodsError,
    } = useSelector((state) => {
        return state.Batch.FermentFinishedGoods;
    });

    useEffect(() => {
        if (mixture.id) {
            dispatch(
                fetchFermentFinishedGoods({
                    mixtureId: mixture.id,
                    pageSize: 500,
                })
            );
        }
        // eslint-disable-next-line
    }, [mixture]);

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
        showOriginalGravityCheckbox: true,
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
        if (changed) {
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
            dispatch(
                saveFermentFinishedGoods({
                    form: finishedGoods.map((fg) => ({
                        skuId: fg.sku.id,
                        mixturePortions: fg.mixturePortions.map((mp) => ({
                            mixtureId: mp.mixture.id,
                            quantity: mp.quantity,
                        })),
                        materialPortions: [],
                    })),
                })
            );
        }
    }

    return (
        <React.Fragment>
            {(stageError ||
                mixtureError ||
                materialPortionError ||
                mixtureRecordingsError ||
                finishedGoodsError) && (
                <Alert color="info" className="mt-2 mb-4">
                    <strong>Oh snap!</strong> Change a few things up and try
                    submitting again.
                </Alert>
            )}
            <Card className="mb-3">
                <CardHeader>Ferment</CardHeader>
                <CardBody>
                    <Details {...detailsProps} />
                    <div className="clearFix mb-4"></div>
                    <div className="px-2 mb-4">
                        <Ingredients {...ingredientsProps} />
                    </div>
                    <div className="px-2 mb-4">
                        <Recordings {...recordingsProps} />
                    </div>
                    <div className="px-2">
                        <FinishedGoods {...finishedGoodsProps} />
                    </div>
                    <Button
                        type="button"
                        color="secondary"
                        size="sm"
                        className="waves-effect"
                        onClick={() => {
                            dispatch(
                                setFermentStageDetails({
                                    editable: true,
                                })
                            );
                        }}
                        hidden={editable}
                    >
                        Edit
                    </Button>
                </CardBody>
                {editable && (
                    <CardFooter>
                        <Button
                            type="button"
                            color="primary"
                            size="sm"
                            className="waves-effect mr-2"
                            onClick={onSave}
                            disabled={!changed}
                        >
                            Save
                        </Button>
                        <Button
                            type="button"
                            color="secondary"
                            size="sm"
                            className="waves-effect mr-2"
                            onClick={() => {
                                dispatch(
                                    setFermentStageDetails({
                                        data: {
                                            ...initialStage,
                                        },
                                        editable: false,
                                    })
                                );
                            }}
                        >
                            Done
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </React.Fragment>
    );
}
