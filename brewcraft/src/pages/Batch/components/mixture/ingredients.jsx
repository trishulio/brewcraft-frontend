import React, { useState } from "react";
import { useSelector } from "react-redux";
import { map } from "lodash";
import {
    Button, FormFeedback, FormGroup, Input, Label
} from "reactstrap";
import Modal from "../../../../component/MaterialLots/modal";
import CommonTable from "../../../../component/Common/table";

export default function BatchIngredients({ mixture, materialPortions, materialPortionsChanged, setMaterialPortions, mTitle, editable, changed }) {
    const [showModal, setShowModal] = useState(false);
    const [lots, setLots] = useState([]);
    const [selectedLot, setSelectedLot] = useState("");
    const [selectedLotQuantity, setSelectedLotQuantity] = useState(0);

    const materialLots = useSelector(state => {
        return state.MaterialLots.stock;
    });

    const props = {
        title: mTitle,
        mixture,
        show: showModal,
        setShow: setShowModal
    }

    function onFormInputChange() {

    }

    return (
        <React.Fragment>
            {console.log(materialPortions)}
            {console.log(lots)}
            <div className="mb-3">
                <CommonTable>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Ingredients</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        !materialPortions.length && (
                            <tr><td></td><td>-</td><td>-</td></tr>
                        )
                    }
                    {
                        materialPortions && map(materialPortions, (portion, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="d-flex align-items-center vertical-center">
                                        <Input
                                            className="ml-1"
                                            type="checkbox"
                                            disabled={!editable}
                                            onChange={e => {
                                                if (e.target.checked) {
                                                    setLots([
                                                        ...lots,
                                                        portion.material.name // bug this is the only unique field
                                                    ])
                                                } else {
                                                    setLots(lots.filter(l => l !== portion.material.name))
                                                }
                                            }}
                                            checked={lots.includes(portion.material.name)}
                                        />
                                    </div>
                                </td>
                                <td>{portion.material.name}</td>
                                <td>{portion.quantity.value} {portion.quantity.symbol}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </CommonTable>
            </div>
            <div
                hidden={!editable}
            >
                <FormGroup
                    className="d-block d-sm-inline-block mr-2"
                >
                    <Input
                        type="select"
                        className="waves-effect"
                        style={{ width: "14rem" }}
                        value={selectedLot.lotNumber || ""}
                        onChange={e => {
                            const materialLot = materialLots.find (s => s.lotNumber === e.target.value);
                            setSelectedLot(materialLot);
                        }}
                    >
                        <option value="">Ingredient</option>
                        {
                            map(materialLots, (value, index) => (
                                <option value={value.lotNumber} key={index}>
                                    {value.material.name} ({value.quantity.value}{value.quantity.symbol})
                                </option>
                            ))
                        }
                    </Input>
                    <FormFeedback>Enter a valid ingredient.</FormFeedback>
                </FormGroup>
                <FormGroup
                    className="d-block d-sm-inline-block mr-2"
                >
                    <Input
                        type="number"
                        className="waves-effect"
                        style={{ width: "8rem" }}
                        value={selectedLotQuantity}
                        onChange={e => {
                            setSelectedLotQuantity(parseFloat(e.target.value));
                        }}
                    />
                    <FormFeedback>Enter a valid number.</FormFeedback>
                </FormGroup>
                <Button
                    size="sm"
                    className="waves-effect mr-2"
                    onClick={() => {
                        setMaterialPortions([
                            ...materialPortions,
                            {
                                materialLotId: 1, // bug materialLotId not available yet!
                                quantity: {
                                    symbol: selectedLot.quantity.symbol,
                                    value: selectedLotQuantity
                                },
                                material: {
                                    name: selectedLot.material.name
                                },
                                mixtureId: mixture.id
                            }])
                    }}
                    hidden={!editable}
                >
                    Enter
                </Button>
                <Button
                    size="sm"
                    color="warning"
                    className="waves-effect"
                    onClick={() => {
                        setMaterialPortions(
                            materialPortions.filter(p => !lots.includes(p.material.name))
                        )
                    }}
                    hidden={!editable}
                    disabled={!materialPortionsChanged}
                >
                    Remove
                </Button>
            </div>
        </React.Fragment>
    );
}