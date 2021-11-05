import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Button
} from "reactstrap";
import { deleteMixtureRecording } from "../../../../store/actions";
import { formatDatetime } from "../../../../helpers/textUtils";
import Modal from "../../../../component/MixtureRecording/modal";
import LineChart from "../charts/linechart";
import DeleteGuard from "../../../../component/Prompt/DeleteGuard";

export default function MixtureRecording({ mTitle, mUnit, mixture, measureId, multiple, editable }) {
    const [showModal, setShowModal] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [records, setRecords] = useState([]);
    const [recordId, setRecordId] = useState(null);

    const dispatch = useDispatch();

    const batch = useSelector(state => {
        return state.Batch.details.data;
    });

    const props = {
        title: mTitle,
        unit: mUnit,
        batchId: batch.id,
        mixture,
        measureId,
        show: showModal,
        setShow: setShowModal
    };

    const lineChartProps = {
        datasets: [{
            data: records.map(r => ({
                x: new Date(r.recordedAt).toLocaleString(),
                y: r.value
            }))
        }],
        option: {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 50,
                        stepSize: 10
                    }
                }],
                xAxes: [{
                    type: "time",
                    time: {
                        // parser: timeFormat,
                        tooltipFormat: 'HH:mm'
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Date'
                    }
                }]
            },
            legend: false
        }
    };

    useEffect(() => {
        if (mixture && mixture.mixtureRecordings) {
            setRecords(mixture.mixtureRecordings
                .filter(r => r.measure.id === 4)
                .sort((a, b) => {
                    return new Date(a.recordedAt) - new Date(b.recordedAt);
                })
            );
        } else {
            setRecords([]);
        }
    }, [mixture]);

    function onDeleteTemperature(recordId) {
        setRecordId(recordId);
        setShowDeletePrompt(!!recordId);
    }

    return (
        <React.Fragment>
            <DeleteGuard
                when={showDeletePrompt}
                confirm={() => {
                    dispatch(
                        deleteMixtureRecording({
                            id: recordId,
                            batchId: batch.id
                        })
                    );
                    setShowDeletePrompt(false);
                }}
                close={() => {
                    setShowDeletePrompt(false);
                }}
                content="This cannot be undone. Are you sure want to delete this temperature record?"
            />
            <h4 className="font-size-12 pt-3 pt-sm-0 mb-3">Temperature</h4>
            <hr/>
            <div className="mb-3">
                <LineChart {...lineChartProps}/>
            </div>
            <div className="px-3">
                {
                    map(records, (record, index) => (
                        <div key={index} className="d-sm-inline-block mb-2">
                            <div style={{ width: "3rem"}} className="d-inline-block font-size-12">
                                {record.value}°C
                            </div>
                            <span className="font-size-12 mr-2">{formatDatetime(record.recordedAt)}</span>
                            <span className="font-size-12 align-middle mr-4" onClick={() => onDeleteTemperature(record.id)}><i className="mdi mdi-delete"></i></span>
                        </div>
                    ))
                }
                <div className="clearfix"></div>
                <Button
                    size="sm"
                    className="waves-effect"
                    onClick={() => setShowModal(true)}
                    hidden={!editable || (!multiple && records.length)}
                >
                    Add
                </Button>
            </div>
            <Modal {...props}/>
        </React.Fragment>
    );
}