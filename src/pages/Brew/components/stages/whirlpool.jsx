import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Details from "../mixture/details";
import {
    editWhirlpoolMixture,
    editWhirlpoolStage,
    setWhirlpoolMixtureDetails,
    setWhirlpoolStageDetails,
} from "../../../../store/actions";
import BatchStage from "./stage";

export default function BrewWhirlpool() {
    const dispatch = useDispatch();

    const {
        data: stage,
        initial: initialStage,
        editable,
        changed,
        loading: stageLoading,
        error: stageError,
    } = useSelector((state) => {
        return state.Batch.WhirlpoolStage;
    });

    const {
        data: mixture,
        initial: initialMixture,
        loading: mixtureLoading,
        error: mixtureError,
    } = useSelector((state) => {
        return state.Batch.WhirlpoolMixture;
    });

    useEffect(() => {
        dispatch(
            setWhirlpoolStageDetails({
                changed: isChanged(),
            })
        );
        // eslint-disable-next-line
    }, [stage, mixture]);

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

    const detailsProps = {
        stage,
        setStage,
        mixture,
        setMixture,
        editable,
        showSkipCheckbox: true,
    };

    const stageProps = {
        title: "Whirlpool",
        editable,
        setEditable: () => {
            dispatch(
                setWhirlpoolStageDetails({
                    editable: true,
                })
            );
        },
        changed,
        initialStage,
        stage,
        stageLoading,
        mixtureLoading,
        stageError,
        mixtureError,
        onSave,
        onCancel: () => {
            dispatch(
                setWhirlpoolStageDetails({
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
            </BatchStage>
        </React.Fragment>
    );
}
