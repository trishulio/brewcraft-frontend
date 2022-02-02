import React from "react";
import { useSelector } from "react-redux";
import { prettyBrewTaskName } from "../../../helpers/textUtils";
import { Badge } from "./badge";

export function ProductWidget() {
    const product = useSelector((state) => {
        return state.Batch.Batch.data.product;
    });

    return (
        <span className="waves-effect font-size-16">
            <span className="mr-1">{product.name}</span>
        </span>
    );
}

export function ActiveStageWidget() {
    const stage = useSelector((state) => {
        let stage;
        stage = state.Batch.Stages.content.find(
            (s) => s.status.id !== 2 && s.status.id !== 6
        );
        if (!stage) {
            stage = state.Batch.Stages.content
                .reverse()
                .find((s) => s.status.id === 2);
        }
        return stage;
    });

    return (
        <span className="waves-effect font-size-16">
            <span className="mr-1">
                {stage.task.name && prettyBrewTaskName(stage.task.name)}
            </span>
            <Badge className="waves-effect d-inline" stage={stage} />
        </span>
    );
}

export function DaysWidget() {
    const number = useSelector((state) => {
        return Math.floor(
            (new Date().getTime() -
                new Date(state.Batch.Batch.data.startedAt).getTime()) /
                (1000 * 3600 * 24)
        );
    });

    return (
        <span className="waves-effect font-size-16">{number || "-"} Days</span>
    );
}
