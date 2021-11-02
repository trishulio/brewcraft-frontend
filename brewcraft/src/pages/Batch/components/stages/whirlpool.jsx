import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    editWhirlpoolMixture,
    editWhirlpoolStage,
    setWhirlpoolMixtureDetails,
    setWhirlpoolStageDetails
} from "../../../../store/actions";
import Details from "../mixture/details";
import MixtureToolbar from "../mixture/toolbar";

export default function BrewWhirlpool() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);

    const dispatch = useDispatch();

    const stage = useSelector(state => {
        return state.Batch.WhirlpoolStage.data;
    });

    const initialStage = useSelector(state => {
        return state.Batch.WhirlpoolStage.initial;
    });

    const mixture = useSelector(state => {
        return state.Batch.WhirlpoolMixture.data;
    });

    const initialMixture = useSelector(state => {
        return state.Batch.WhirlpoolMixture.initial;
    });

    useEffect(() => {
        setChanged(isChanged());
    }, [stage, mixture, setChanged]);

    useEffect(() => {
        setEditable(stage.editable);
    }, [stage]);

    function isChanged() {
        return JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(initialStage))
            !== JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(stage))
            || JSON.stringify(
                    (({ quantity }) => ({ quantity }))(initialMixture))
            !== JSON.stringify(
                (({ quantity }) => ({ quantity }))(mixture));
    }

    function setStage(stage) {
        dispatch(
            setWhirlpoolStageDetails({
                data: stage
            })
        )
    }

    function setMixture(mixture) {
        dispatch(
            setWhirlpoolMixtureDetails({
                data: mixture
            })
        )
    }

    function onSave() {
        dispatch(
            editWhirlpoolStage({
                id: stage.id,
                form: {
                    statusId : stage.status.id,
                    taskId: stage.task.id,
                    startedAt: stage.startedAt,
                    endedAt: stage.endedAt,
                    version: stage.version
                }
            })
        );
        dispatch(
            editWhirlpoolMixture({
                id: mixture.id,
                form: {
                    parentMixtureId: mixture.parentMixtureId,
                    quantity: {
                        ...mixture.quantity
                    },
                    brewStageId: mixture.brewStage.id,
                    version: mixture.version
                }
            })
        );
    }

    const detailsProps = {
        stage,
        initialStage,
        setStage,
        mixture,
        initialMixture,
        setMixture,
        editable,
        showSkipCheckbox: true
    };

    const toolbarProps = {
        editable,
        setEditable,
        changed,
        onSave
    }

    return (
        <React.Fragment>
            <Details {...detailsProps}/>
            <MixtureToolbar {...toolbarProps}/>
        </React.Fragment>
    );
}