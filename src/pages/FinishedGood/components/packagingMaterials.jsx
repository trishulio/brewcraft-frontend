import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import {
    Row,
    Col,
    Button,
    FormFeedback,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import CommonTable from "../../../component/Common/table";
import { isValidNumberString } from "../../../helpers/utils";
import { setFinishedGoodInvalidMaterialPortions } from "../../../store/actions";

export default function FinishedGoodMaterials({
    label,
    editable,
    materialPortions,
    setMaterialPortions,
}) {
    const [invalidQuantity, setInvalidQuantity] = useState(false);
    const [lots, setLots] = useState([]);
    const [selectedLot, setSelectedLot] = useState("");
    const [selectedLotQuantity, setSelectedLotQuantity] = useState(0);
    const dispatch = useDispatch();

    const { invalidMaterialPortions } = useSelector((state) => {
        return state.FinishedGood;
    });

    const materialLots = useSelector((state) => {
        return state.MaterialLots.stock;
    });

    return (
        <React.Fragment>
            <Label>{label}</Label>
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
                        {map(materialPortions, (portion, index) => (
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
                                                                    l !== index
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
                                        portion.materialLot.invoiceItem.material
                                            .name
                                    }
                                </td>
                                <td>
                                    {
                                        portion.materialLot.invoiceItem.material
                                            .category?.name
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
                    <Row className="ml-0">
                        <FormGroup className="d-block d-sm-inline-block mr-2 mb-0">
                            <Input
                                type="select"
                                className="waves-effect"
                                style={{ width: "14rem" }}
                                value={selectedLot.materialLot?.id || ""}
                                invalid={invalidMaterialPortions}
                                onChange={(e) => {
                                    const materialLot = materialLots.find(
                                        (s) => {
                                            return (
                                                s.materialLot.id ===
                                                parseInt(e.target.value)
                                            );
                                        }
                                    );
                                    if (materialPortions.length < 1) {
                                        dispatch(
                                            setFinishedGoodInvalidMaterialPortions(
                                                !e.target.value
                                            )
                                        );
                                    }
                                    setSelectedLot(materialLot || "");
                                }}
                            >
                                <option value="">Material</option>
                                {map(
                                    materialLots.filter(
                                        (lot) =>
                                            lot.material.materialClass.id === 2
                                    ),
                                    (value, index) => (
                                        <option
                                            value={value.materialLot.id}
                                            key={index}
                                        >
                                            {value.material.name} (
                                            {value.quantity.value}
                                            {value.quantity.symbol})
                                        </option>
                                    )
                                )}
                            </Input>
                            <FormFeedback>
                                Select at least one material.
                            </FormFeedback>
                        </FormGroup>
                        <FormGroup className="d-block d-sm-inline-block mr-2 mb-0">
                            <Input
                                type="text"
                                className="waves-effect"
                                style={{ width: "8rem" }}
                                value={selectedLotQuantity}
                                invalid={invalidQuantity}
                                onChange={(e) => {
                                    setSelectedLotQuantity(e.target.value);
                                    if (!e.target.value) {
                                        setInvalidQuantity(false);
                                    } else {
                                        setInvalidQuantity(
                                            !isValidNumberString(e.target.value)
                                        );
                                    }
                                }}
                            />
                            <FormFeedback>Enter a valid number.</FormFeedback>
                        </FormGroup>
                        <Col>
                            <Button
                                size="sm"
                                className="waves-effect mr-2 mb-0"
                                onClick={() => {
                                    const materialPortion =
                                        materialPortions.find(
                                            (mp) =>
                                                mp.materialLot.id ===
                                                selectedLot.materialLot.id
                                        );
                                    if (materialPortion) {
                                        materialPortion.quantity.value +=
                                            parseFloat(selectedLotQuantity);
                                        setMaterialPortions([
                                            ...materialPortions,
                                        ]);
                                    } else {
                                        setMaterialPortions([
                                            ...materialPortions,
                                            {
                                                ...selectedLot,
                                                quantity: {
                                                    symbol: selectedLot.quantity
                                                        .symbol,
                                                    value: parseFloat(
                                                        selectedLotQuantity
                                                    ),
                                                },
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
                        </Col>
                    </Row>
                </div>
            )}
        </React.Fragment>
    );
}
