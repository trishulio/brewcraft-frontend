import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ingredients from "../mixture/ingredients";
import Details from "../mixture/details";
import {
    deleteKettleMaterialPortion,
    editKettleMaterialPortion,
    editKettleMixture,
    editKettleStage,
    setKettleMaterialPortionDetails,
    setKettleMixtureDetails,
    setKettleStageDetails,
} from "../../../../store/actions";
import { Alert, Button } from "reactstrap";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "../../../../component/Common/Card";
import { Badge } from "../badge";

export default function BrewKettle() {
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();

    const {
        data: stage,
        initial: initialStage,
        changed,
        loading: stageLoading,
        editable,
        error: stageError,
    } = useSelector((state) => {
        return state.Batch.KettleStage;
    });

    const {
        data: mixture,
        initial: initialMixture,
        loading: mixtureLoading,
        error: mixtureError,
    } = useSelector((state) => {
        return state.Batch.KettleMixture;
    });

    const {
        content: materialPortions,
        initial: initialMaterialPortions,
        loading: materialPortionsLoading,
        error: materialPortionError,
    } = useSelector((state) => {
        return state.Batch.KettleMaterialPortion;
    });

    useEffect(() => {
        dispatch(
            setKettleStageDetails({
                changed: isChanged(),
            })
        );
        // eslint-disable-next-line
    }, [stage, mixture, materialPortions]);

    function isChanged() {
        return (
            JSON.stringify(initialStage) !== JSON.stringify(stage) ||
            JSON.stringify(initialMixture) !== JSON.stringify(mixture) ||
            JSON.stringify(initialMaterialPortions) !==
                JSON.stringify(materialPortions)
        );
    }

    function setStage(stage) {
        dispatch(
            setKettleStageDetails({
                data: stage,
            })
        );
    }

    function setMixture(mixture) {
        dispatch(
            setKettleMixtureDetails({
                data: mixture,
            })
        );
    }

    function setMaterialPortions(materialPortions) {
        dispatch(
            setKettleMaterialPortionDetails({
                content: materialPortions,
            })
        );
    }

    function onSave() {
        if (changed) {
            dispatch(
                editKettleStage({
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
                editKettleMixture({
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
                    editKettleMaterialPortion({
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
                    deleteKettleMaterialPortion({
                        form: mp,
                    })
                );
            }
        }
    }

    const detailsProps = {
        stage,
        setStage,
        mixture,
        setMixture,
        editable,
    };

    const ingredientsProps = {
        mixture,
        editable,
        materialPortions,
        setMaterialPortions,
    };

    return (
        <React.Fragment>
            {(stageError || mixtureError || materialPortionError) && (
                <Alert color="info" className="mt-2 mb-4">
                    <strong>Oh snap!</strong> Change a few things up and try
                    submitting again.
                </Alert>
            )}
            <Card className="mb-3">
                <CardHeader>
                    <div
                        className="d-inline-block mr-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <i
                            className={`fa fa-caret-right font-size-14 mr-2 ${
                                isOpen ? " rotate-down" : ""
                            }`}
                        ></i>
                        Kettle Lauter
                    </div>
                    <div className="d-inline-block">
                        <Badge stage={stage} />
                    </div>
                </CardHeader>
                <CardBody
                    isLoading={
                        stageLoading ||
                        mixtureLoading ||
                        materialPortionsLoading
                    }
                    isOpen={isOpen}
                >
                    <Details {...detailsProps} />
                    <div className="clearFix mb-3"></div>
                    <div className="px-2">
                        <Ingredients {...ingredientsProps} />
                    </div>
                    <Button
                        type="button"
                        color="secondary"
                        size="sm"
                        className="waves-effect"
                        onClick={() => {
                            dispatch(
                                setKettleStageDetails({
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
                                    setKettleStageDetails({
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
