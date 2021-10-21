import React, { useEffect, useState } from "react";
import { map } from "lodash";
import {
    Button
} from "reactstrap";
import Modal from "../../../component/MaterialLots/modal";
import BarChart from "./charts/horizontal-barchart";

export default function BatchIngredients({ title, mTitle, mixture, multiple, editable }) {
    const [showModal, setShowModal] = useState(false);
    const [materialPortions, setMaterialPortions] = useState([]);

    const props = {
        title: mTitle,
        mixture,
        show: showModal,
        setShow: setShowModal
    };

    const barChartProps = {
        labels: // materialPortions.map(p => p.material.name),
            ["Malt 1", "Malt 2", "Additive 1", "Additive 2", "Additive 3"],
        datasets: [{
            // data: materialPortions.map(p => p.quantity.value)
            data: [65, 59, 8, 5, 6]
        }],
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 50,
                        stepSize: 10
                    }
                }],
            },
            // legend: false
        }
    };

    useEffect(() => {

    }, [mixture]);

    return (
        <React.Fragment>
            <h4 className="font-size-12 pt-3 pt-sm-0 mb-3">{title}</h4>
            <hr/>
            <div className="mb-2">
                <BarChart {...barChartProps}/>
            </div>
            <div className="px-3">
                {
                    map(materialPortions, (portion, index) => (
                        <div key={index} className="d-sm-inline-block mb-2"><div style={{ width: "3rem"}} className="d-inline-block font-size-12">{portion.material.name}</div><span className="font-size-12">{portion.quantity.value}{portion.quantity.symbol}</span></div>
                    ))
                }
                <div className="clearfix"></div>
                <Button
                    size="sm"
                    className="waves-effect"
                    onClick={() => setShowModal(true)}
                    hidden={!editable || (!multiple && materialPortions.length)}
                >
                    Add
                </Button>
            </div>
            <Modal {...props}/>
        </React.Fragment>
    );
}