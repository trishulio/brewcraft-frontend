import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    editKettleStage,
    editMashStage,
    editWhirlpoolStage,
    fetchAllBrewStages,
} from "../../store/actions";

export default function Stages(props) {
    const dispatch = useDispatch();

    const { data: batch, save } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const { data: mashStage, initial: initialMashStage } = useSelector(
        (state) => {
            return state.Batch.MashStage;
        }
    );

    const { data: kettleStage, initial: initialKettleStage } = useSelector(
        (state) => {
            return state.Batch.KettleStage;
        }
    );

    const { data: whirlpoolStage, initial: initialWhirlpoolStage } =
        useSelector((state) => {
            return state.Batch.WhirlpoolStage;
        });

    const isChanged = useCallback(() => {
        return (
            JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({
                    startedAt,
                    endedAt,
                    status,
                    task,
                }))(initialMashStage)
            ) !==
                JSON.stringify(
                    (({ startedAt, endedAt, status, task }) => ({
                        startedAt,
                        endedAt,
                        status,
                        task,
                    }))(mashStage)
                ) ||
            JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({
                    startedAt,
                    endedAt,
                    status,
                    task,
                }))(initialKettleStage)
            ) !==
                JSON.stringify(
                    (({ startedAt, endedAt, status, task }) => ({
                        startedAt,
                        endedAt,
                        status,
                        task,
                    }))(kettleStage)
                ) ||
            JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({
                    startedAt,
                    endedAt,
                    status,
                    task,
                }))(initialWhirlpoolStage)
            ) !==
                JSON.stringify(
                    (({ startedAt, endedAt, status, task }) => ({
                        startedAt,
                        endedAt,
                        status,
                        task,
                    }))(whirlpoolStage)
                )
        );
    }, [
        initialMashStage,
        mashStage,
        initialKettleStage,
        kettleStage,
        initialWhirlpoolStage,
        whirlpoolStage,
    ]);

    useEffect(() => {
        if (batch.id) {
            dispatch(fetchAllBrewStages(batch.id));
        }
    }, [batch.id, dispatch]);

    useEffect(() => {
        props.setStagesChanged(isChanged());
    }, [mashStage, kettleStage, whirlpoolStage, props, isChanged]);

    useEffect(() => {
        if (save && isStageChanged(mashStage, initialMashStage)) {
            dispatch(
                editMashStage({
                    id: mashStage.id,
                    form: {
                        statusId: mashStage.status.id,
                        taskId: mashStage.task.id,
                        startedAt: mashStage.startedAt,
                        endedAt: mashStage.endedAt,
                        version: mashStage.version,
                    },
                })
            );
        }
        if (save && isStageChanged(kettleStage, initialKettleStage)) {
            dispatch(
                editKettleStage({
                    id: kettleStage.id,
                    form: {
                        statusId: kettleStage.status.id,
                        taskId: kettleStage.task.id,
                        startedAt: kettleStage.startedAt,
                        endedAt: kettleStage.endedAt,
                        version: kettleStage.version,
                    },
                })
            );
        }
        if (save && isStageChanged(whirlpoolStage, initialWhirlpoolStage)) {
            dispatch(
                editWhirlpoolStage({
                    id: whirlpoolStage.id,
                    form: {
                        statusId: whirlpoolStage.status.id,
                        taskId: whirlpoolStage.task.id,
                        startedAt: whirlpoolStage.startedAt,
                        endedAt: whirlpoolStage.endedAt,
                        version: whirlpoolStage.version,
                    },
                })
            );
        }
        // eslint-disable-next-line
    }, [save]);

    function isStageChanged(stage, initialStage) {
        return (
            JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({
                    startedAt,
                    endedAt,
                    status,
                    task,
                }))(initialStage)
            ) !==
            JSON.stringify(
                (({ startedAt, endedAt, status, task }) => ({
                    startedAt,
                    endedAt,
                    status,
                    task,
                }))(stage)
            )
        );
    }

    return <React.Fragment>{props.children}</React.Fragment>;
}
