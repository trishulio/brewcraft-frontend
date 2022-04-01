import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchBatch,
    fetchMiniCardBrewsMixtures,
    fetchMiniCardFinishedGoods,
} from "../../store/actions";
import BrewMonitorInner from "./monitor";

export default function BrewMonitor() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { data: batch } = useSelector((state) => {
        return state.Batch.Batch;
    });

    useEffect(() => {
        dispatch(fetchBatch({ batchId: id }));
        dispatch(
            setBreadcrumbItems(batch.id, [
                { title: "Main", link: "#" },
                { title: "Brews", link: "#" },
            ])
        );
        // eslint-disable-next-line
    }, [batch, id]);

    const originalGravity = useSelector((state) => {
        const record = state.Batch.MixtureRecordings.content.find(
            (mr) =>
                mr.measure.name === "gravity" &&
                mr.mixture.brewStage.brew.id === id
        );
        return record ? record.value : 0;
    });

    const gravityRecords = useSelector((state) => {
        return state.Batch.MixtureRecordings.content.filter(
            (mr) =>
                mr.measure.name === "gravity" &&
                mr.mixture.brewStage.brew.id === id
        );
    });

    const abvRecords = useSelector((state) => {
        return state.Batch.MixtureRecordings.content
            .filter(
                (mr) =>
                    mr.measure.name === "gravity" &&
                    mr.mixture.brewStage.brew.id === id
            )
            .map((r) => ({
                ...r,
                value: Math.ceil((originalGravity - r.value) * 131.25),
            }));
    });

    const temperatureRecords = useSelector((state) => {
        return state.Batch.MixtureRecordings.content.filter(
            (mr) =>
                mr.measure.name === "temperature" &&
                mr.mixture.brewStage.brew.id === id
        );
    });

    const phRecords = useSelector((state) => {
        return state.Batch.MixtureRecordings.content.filter(
            (mr) =>
                mr.measure.name === "ph" && mr.mixture.brewStage.brew.id === id
        );
    });

    useEffect(() => {
        dispatch(fetchBatch({ batchId: id }));
        dispatch(
            fetchMiniCardBrewsMixtures({
                brewIds: [batch.id],
                stageStatusIds: [2, 6], // complete, skipped
                stageTaskIds: [3],
            })
        );
        dispatch(
            fetchMiniCardFinishedGoods({
                brewIds: [batch.id],
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const props = {
        originalGravity,
        gravityRecords,
        abvRecords,
        temperatureRecords,
        phRecords,
    };

    return <BrewMonitorInner {...props} />;
}
