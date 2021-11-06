import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editMashStage, fetchAllBrewStages } from "../../store/actions";

export default function Stages(props) {

    const dispatch = useDispatch();

    const { data: batch, save } = useSelector(state => {
        return state.Batch.details;
    });

    const { data: mashStage, initial: initialMashStage } = useSelector(state => {
        return state.Batch.MashStage;
    });

    const { data: kettleStage, initial: initialKettleStage } = useSelector(state => {
        return state.Batch.KettleStage;
    });

    const { data: whirlpoolStage, initial: initialWhirlpoolStage } = useSelector(state => {
        return state.Batch.WhirlpoolStage;
    });

    useEffect(() => {
        if (batch.id) {
            dispatch(fetchAllBrewStages(batch.id));
        }
    }, [batch.id]);

    useEffect(() => {
        props.setStagesChanged(isChanged());

    }, [mashStage, kettleStage, whirlpoolStage]);

    useEffect(() => {
        if (save && isStageChanged(mashStage, initialMashStage)) {
            dispatch(
                editMashStage({
                    id: mashStage.id,
                    form: {
                        statusId : mashStage.status.id,
                        taskId: mashStage.task.id,
                        startedAt: mashStage.startedAt,
                        endedAt: mashStage.endedAt,
                        version: mashStage.version
                    }
                })
            );
        }
        if (save && isStageChanged(kettleStage, initialKettleStage)) {
            dispatch(
                editMashStage({
                    id: kettleStage.id,
                    form: {
                        statusId : kettleStage.status.id,
                        taskId: kettleStage.task.id,
                        startedAt: kettleStage.startedAt,
                        endedAt: kettleStage.endedAt,
                        version: kettleStage.version
                    }
                })
            );
        }
        if (save && isStageChanged(whirlpoolStage, initialWhirlpoolStage)) {
            dispatch(
                editMashStage({
                    id: whirlpoolStage.id,
                    form: {
                        statusId : whirlpoolStage.status.id,
                        taskId: whirlpoolStage.task.id,
                        startedAt: whirlpoolStage.startedAt,
                        endedAt: whirlpoolStage.endedAt,
                        version: whirlpoolStage.version
                    }
                })
            );
        }
    }, [save]);

    function isStageChanged(stage, initialStage) {
        return JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(initialStage))
            !== JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(stage));
    }

    function isChanged() {
        return JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(initialMashStage))
            !== JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(mashStage))
            || JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(initialKettleStage))
            !== JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(kettleStage))
            || JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(initialWhirlpoolStage))
            !== JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(whirlpoolStage))
    }

    return (
        <React.Fragment>{props.children}</React.Fragment>
    );
}