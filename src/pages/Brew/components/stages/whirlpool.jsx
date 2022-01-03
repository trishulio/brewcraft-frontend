import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Details from "../mixture/details";
import {
    editWhirlpoolMixture,
    editWhirlpoolStage,
    setWhirlpoolMixtureDetails,
    setWhirlpoolStageDetails,
    setTransferMixtureRecords,
} from "../../../../store/actions";
import {
    Alert,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
} from "reactstrap";

export default function BrewWhirlpool() {
    const dispatch = useDispatch();

    // const { data: batch } = useSelector((state) => {
    //     return state.Batch.Batch;
    // });

    const {
        data: stage,
        initial: initialStage,
        editable,
        stageError,
    } = useSelector((state) => {
        return state.Batch.WhirlpoolStage;
    });

    const {
        data: mixture,
        initial: initialMixture,
        mixtureError,
    } = useSelector((state) => {
        return state.Batch.WhirlpoolMixture;
    });

    // const {
    //     content: materialPortions,
    //     initial: initialMaterialPortions,
    //     materialPortionError,
    // } = useSelector((state) => {
    //     return state.Batch.WhirlpoolMaterialPortion;
    // });

    const mixtureRecords = useSelector((state) => {
        return state.Batch.TransferMixtureRecordings.content;
    });

    function isChanged() {
        return (
            JSON.stringify(initialStage) !== JSON.stringify(stage) ||
            JSON.stringify(initialMixture) !== JSON.stringify(mixture)
        );
    }

    function setStage(stage) {
        dispatch(
            setWhirlpoolStageDetails({
                data: stage,
            })
        );
    }

    function setMixture(mixture) {
        dispatch(
            setWhirlpoolMixtureDetails({
                data: mixture,
            })
        );
    }

    function onSave() {
        if (isChanged()) {
            dispatch(
                editWhirlpoolStage({
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
                editWhirlpoolMixture({
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

    function setMixtureRecords(mixtureRecords) {
        dispatch(setTransferMixtureRecords(mixtureRecords));
    }

    const detailsProps = {
        stage,
        setStage,
        mixture,
        setMixture,
        mixtureRecords,
        setMixtureRecords,
        editable,
        showSkipCheckbox: true,
    };

    return (
        <React.Fragment>
            {(stageError || mixtureError) && (
                <Alert color="info" className="mt-2 mb-4">
                    <strong>Oh snap!</strong> Change a few things up and try
                    submitting again.
                </Alert>
            )}
            <Card className="mb-3">
                <CardHeader>Whirlpool Lauter</CardHeader>
                <CardBody>
                    <Details {...detailsProps} />
                    <div className="clearFix mb-3"></div>
                    <Button
                        type="button"
                        color="secondary"
                        size="sm"
                        className="waves-effect"
                        onClick={() => {
                            dispatch(
                                setWhirlpoolStageDetails({
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
                            disabled={!isChanged()}
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
                                    setWhirlpoolStageDetails({
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
