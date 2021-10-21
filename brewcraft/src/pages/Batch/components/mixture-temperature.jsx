import React, { useEffect, useState } from "react";
import { map } from "lodash";
import {
    Button
} from "reactstrap";
import { formatDatetime } from "../../../helpers/textUtils";
import Modal from "../../../component/MixtureRecording/modal";
import LineChart from "./charts/linechart";

export default function MixtureRecording({ mTitle, mUnit, mixture, measureId, multiple, editable }) {
    const [showModal, setShowModal] = useState(false);
    const [records, setRecords] = useState([]);

    const props = {
        title: mTitle,
        unit: mUnit,
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

    return (
        <React.Fragment>
            <h4 className="font-size-12 pt-3 pt-sm-0 mb-3">Temperature</h4>
            <hr/>
            <div className="mb-2">
                <LineChart {...lineChartProps}/>
            </div>
            <div className="px-3">
                {
                    map(records, (record, index) => (
                        <div key={index} className="d-sm-inline-block mb-2"><div style={{ width: "3rem"}} className="d-inline-block font-size-12">{record.value}°C</div><span className="font-size-12">{formatDatetime(record.recordedAt)}</span></div>
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