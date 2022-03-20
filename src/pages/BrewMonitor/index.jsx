import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    fetchBrewStages,
    fetchBatches,
    setBreadcrumbItems,
    fetchBatch,
} from "../../store/actions";
import BrewMonitorInner from "./monitor";

export default function BrewMonitor() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { data: batch } = useSelector((state) => {
        return state.Batch.Batch;
    });

    useEffect(() => {
        dispatch(fetchBrewStages(id));
        dispatch(fetchBatches({ pageSize: 5000 }));
        dispatch(
            setBreadcrumbItems(batch.batchId, [
                { title: "Main", link: "#" },
                { title: "Brews", link: "#" },
            ])
        );
        // eslint-disable-next-line
    }, [batch, id]);

    const originalGravity = useSelector((state) => {
        const record = state.Batch.TransferMixtureRecordings.content.find(
            (r) => r.measure.name === "gravity"
        );
        return record ? record.value : 0;
    });

    const gravityRecords = useSelector((state) => {
        return state.Batch.FermentMixtureRecordings.content.filter(
            (r) => r.measure.name === "gravity"
        );
    });

    const abvRecords = useSelector((state) => {
        return state.Batch.FermentMixtureRecordings.content
            .filter((r) => r.measure.name === "gravity")
            .map((r) => ({
                ...r,
                value: Math.ceil((originalGravity - r.value) * 131.25),
            }));
    });

    const temperatureRecords = useSelector((state) => {
        return state.Batch.FermentMixtureRecordings.content.filter(
            (r) => r.measure.name === "temperature"
        );
    });

    const phRecords = useSelector((state) => {
        return state.Batch.FermentMixtureRecordings.content.filter(
            (r) => r.measure.name === "ph"
        );
    });

    useEffect(() => {
        dispatch(fetchBatch({ batchId: id }));
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
