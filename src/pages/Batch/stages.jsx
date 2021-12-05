import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    editBriteTankStage,
    editConditionStage,
    editFermentStage,
    fetchAllBrewStages
} from "../../store/actions";

export default function Stages(props) {

    const dispatch = useDispatch();

    const { data: batch, save } = useSelector(state => {
        return state.Batch.Batch;
    });

    const { data: fermentState, initial: initialFermentStage } = useSelector(state => {
        return state.Batch.FermentStage;
    });

    const { data: conditionStage, initial: initialConditionStage } = useSelector(state => {
        return state.Batch.ConditionStage;
    });

    const { data: briteTankStage, initial: initialBriteTankStage } = useSelector(state => {
        return state.Batch.BriteTankStage;
    });

    useEffect(() => {
        if (batch.id) {
            dispatch(fetchAllBrewStages(batch.id));
        }
    }, [batch.id, dispatch]);

    useEffect(() => {
        props.setStagesChanged(isChanged());

    }, [
        fermentState,
        conditionStage,
        briteTankStage,
        props,
        isChanged
    ]);

    useEffect(() => {
        if (save && isStageChanged(fermentState, initialFermentStage)) {
            dispatch(
                editFermentStage({
                    id: fermentState.id,
                    form: {
                        statusId : fermentState.status.id,
                        taskId: fermentState.task.id,
                        startedAt: fermentState.startedAt,
                        endedAt: fermentState.endedAt,
                        version: fermentState.version
                    }
                })
            );
        }
        if (save && isStageChanged(conditionStage, initialConditionStage)) {
            dispatch(
                editConditionStage({
                    id: conditionStage.id,
                    form: {
                        statusId : conditionStage.status.id,
                        taskId: conditionStage.task.id,
                        startedAt: conditionStage.startedAt,
                        endedAt: conditionStage.endedAt,
                        version: conditionStage.version
                    }
                })
            );
        }
        if (save && isStageChanged(briteTankStage, initialBriteTankStage)) {
            dispatch(
                editBriteTankStage({
                    id: briteTankStage.id,
                    form: {
                        statusId : briteTankStage.status.id,
                        taskId: briteTankStage.task.id,
                        startedAt: briteTankStage.startedAt,
                        endedAt: briteTankStage.endedAt,
                        version: briteTankStage.version
                    }
                })
            );
        }
        // eslint-disable-next-line
    }, [save]);

    function isStageChanged(stage, initialStage) {
        return JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(initialStage))
            !== JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(stage));
    }

    // eslint-disable-next-line
    function isChanged() {
        return JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(initialFermentStage))
            !== JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(fermentState))
            || JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(initialConditionStage))
            !== JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(conditionStage))
            || JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(initialBriteTankStage))
            !== JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({ startedAt, endedAt, status, task }))(briteTankStage))
    }

    return (
        <React.Fragment>{props.children}</React.Fragment>
    );
}