import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    editTransferMixtureRecords,
    fetchMixtureRecordingsByBrewId,
    saveTransferMixtureRecords,
} from "../../store/actions";

export default function MixtureRecordings(props) {
    const dispatch = useDispatch();

    const { data: batch, save } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const {
        content: transferMixtureRecordings,
        initial: transferInitialMixtureRecordings,
    } = useSelector((state) => {
        return state.Batch.TransferMixtureRecordings;
    });

    const {
        content: kettleMixtureRecordings,
        initial: kettleInitialMixtureRecordings,
    } = useSelector((state) => {
        return state.Batch.TransferMixtureRecordings;
    });

    const isChanged = useCallback(() => {
        return (
            JSON.stringify(transferMixtureRecordings) !==
                JSON.stringify(transferInitialMixtureRecordings) ||
            JSON.stringify(kettleMixtureRecordings) !==
                JSON.stringify(kettleInitialMixtureRecordings)
        );
    }, [
        transferInitialMixtureRecordings,
        transferMixtureRecordings,
        kettleInitialMixtureRecordings,
        kettleMixtureRecordings,
    ]);

    useEffect(() => {
        if (batch.id) {
            dispatch(fetchMixtureRecordingsByBrewId(batch.id));
        }
    }, [batch.id, dispatch]);

    useEffect(() => {
        props.setMixtureRecordingsChanged(isChanged());
    }, [transferMixtureRecordings, kettleMixtureRecordings, props, isChanged]);

    useEffect(() => {
        if (save) {
            dispatch(
                saveTransferMixtureRecords({
                    form: transferMixtureRecordings
                        .filter((r) => !r.id)
                        .map((r) => ({
                            mixtureId: r.mixture.id,
                            measureId: r.measure.id,
                            value: r.value,
                        })),
                })
            );
            transferMixtureRecordings
                .filter((r) => r.id)
                .forEach((r) => {
                    dispatch(
                        editTransferMixtureRecords({
                            id: r.id,
                            form: {
                                mixtureId: r.mixture.id,
                                measureId: r.measure.id,
                                value: r.value,
                                version: r.version,
                            },
                        })
                    );
                });
        }
        // eslint-disable-next-line
    }, [save]);

    return <React.Fragment>{props.children}</React.Fragment>;
}
