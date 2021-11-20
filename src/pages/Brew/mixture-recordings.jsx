import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTransferMixtureRecords, fetchMixtureRecordingsByBrewId, saveTransferMixtureRecords } from "../../store/actions";

export default function MixtureRecordings(props) {

    const dispatch = useDispatch();

    const { data: batch, save } = useSelector(state => {
        return state.Batch.Batch;
    });

    const { content: transferMixtureRecordings, initial: transferInitialMixtureRecordings } = useSelector(state => {
        return state.Batch.TransferMixtureRecordings;
    });

    useEffect(() => {
        if (batch.id) {
            dispatch(fetchMixtureRecordingsByBrewId(batch.id));
        }
    }, [batch.id]);

    useEffect(() => {
        props.setMixtureRecordingsChanged(isChanged());

    }, [transferMixtureRecordings]);

    useEffect(() => {
        if (save) {
            dispatch(
                saveTransferMixtureRecords({
                    form: transferMixtureRecordings.filter(r => !r.id).map(r => ({
                        mixtureId: r.mixture.id,
                        measureId: r.measure.id,
                        value: r.value
                    }))
                })
            );
            transferMixtureRecordings.filter(r => r.id).forEach(r => {
                dispatch(
                    editTransferMixtureRecords({
                        id: r.id,
                        form: {
                            mixtureId: r.mixture.id,
                            measureId: r.measure.id,
                            value: r.value,
                            version: r.version
                        }
                    })
                );
            });
        }
    }, [save]);

    function isChanged() {
        return JSON.stringify(transferMixtureRecordings) !== JSON.stringify(transferInitialMixtureRecordings);
    }

    return (
        <React.Fragment>{props.children}</React.Fragment>
    );
}