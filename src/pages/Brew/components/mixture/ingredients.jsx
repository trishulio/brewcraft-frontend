import React, { useState } from "react";
import { useSelector } from "react-redux";
import { map } from "lodash";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import CommonTable from "../../../../component/Common/table";

export default function BatchIngredients({
    mixture,
    materialPortions,
    setMaterialPortions,
    editable,
}) {
    const [lots, setLots] = useState([]);
    const [selectedLot, setSelectedLot] = useState("");
    const [selectedLotQuantity, setSelectedLotQuantity] = useState(0);

    const materialLots = useSelector((state) => {
        return state.MaterialLots.stock;
    });

    return (
        <React.Fragment>
            <Label
                for="mixtureStartDateTime"
                className="d-block d-sm-inline-block font-size-12 mb-3"
                style={{
                    width: "5rem",
                }}
            >
                Ingredients
            </Label>
            <div className="mb-3">
                <CommonTable>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Ingredient</th>
                            <th>Category</th>
                            <th>Lot Number</th>
                            <th>Quantity</th>
                            {/* <th>Cost</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {!materialPortions.length && (
                            <tr>
                                <td></td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        )}
                        {materialPortions &&
                            map(materialPortions, (portion, index) => (
                                <tr key={index}>
                                    <td style={{ width: "2rem" }}>
                                        <div className="d-flex align-items-center vertical-center">
                                            {editable && (
                                                <Input
                                                    className="ml-1"
                                                    type="checkbox"
                                                    disabled={!editable}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setLots([
                                                                ...lots,
                                                                index,
                                                            ]);
                                                        } else {
                                                            setLots(
                                                                lots.filter(
                                                                    (l) =>
                                                                        l !==
                                                                        index
                                                                )
                                                            );
                                                        }
                                                    }}
                                                    checked={
                                                        lots.includes(index) &&
                                                        editable
                                                    }
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        {
                                            portion.materialLot.invoiceItem
                                                .material.name
                                        }
                                    </td>
                                    <td>
                                        {
                                            portion.materialLot.invoiceItem
                                                .material.category?.name
                                        }
                                    </td>
                                    <td>{portion.materialLot.lotNumber}</td>
                                    <td>
                                        {portion.quantity.value}{" "}
                                        {portion.quantity.symbol}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </CommonTable>
            </div>
            {editable && (
                <div>
                    <FormGroup className="d-block d-sm-inline-block mr-2">
                        <Input
                            type="select"
                            className="waves-effect"
                            style={{ width: "14rem" }}
                            value={selectedLot.materialLot?.id || ""}
                            onChange={(e) => {
                                const materialLot = materialLots.find((s) => {
                                    return (
                                        s.materialLot.id ===
                                        parseInt(e.target.value)
                                    );
                                });
                                setSelectedLot(materialLot || "");
                            }}
                        >
                            <option value="">Ingredient</option>
                            {map(materialLots, (value, index) => (
                                <option
                                    value={value.materialLot.id}
                                    key={index}
                                >
                                    {value.material.name} (
                                    {value.quantity.value}
                                    {value.quantity.symbol})
                                </option>
                            ))}
                        </Input>
                        <FormFeedback>Enter a valid ingredient.</FormFeedback>
                    </FormGroup>
                    <FormGroup className="d-block d-sm-inline-block mr-2">
                        <Input
                            type="text"
                            className="waves-effect"
                            style={{ width: "8rem" }}
                            value={selectedLotQuantity}
                            onChange={(e) => {
                                setSelectedLotQuantity(e.target.value);
                            }}
                        />
                        <FormFeedback>Enter a valid number.</FormFeedback>
                    </FormGroup>
                    <Button
                        size="sm"
                        className="waves-effect mr-2"
                        onClick={() => {
                            const materialPortion = materialPortions.find(
                                (mp) =>
                                    mp.materialLot.id ===
                                    selectedLot.materialLot.id
                            );
                            if (materialPortion) {
                                materialPortion.quantity.value +=
                                    parseFloat(selectedLotQuantity);
                                setMaterialPortions([...materialPortions]);
                            } else {
                                setMaterialPortions([
                                    ...materialPortions,
                                    {
                                        ...selectedLot,
                                        quantity: {
                                            symbol: selectedLot.quantity.symbol,
                                            value: parseFloat(
                                                selectedLotQuantity
                                            ),
                                        },
                                        mixture: mixture,
                                    },
                                ]);
                            }
                        }}
                        disabled={!selectedLot || !selectedLotQuantity}
                    >
                        Enter
                    </Button>
                    <Button
                        size="sm"
                        color="warning"
                        className="waves-effect"
                        onClick={() => {
                            setMaterialPortions(
                                materialPortions.filter(
                                    (_, index) => !lots.includes(index)
                                )
                            );
                            setLots([]);
                        }}
                        disabled={!lots.length}
                    >
                        Remove
                    </Button>
                </div>
            )}
        </React.Fragment>
    );
}
