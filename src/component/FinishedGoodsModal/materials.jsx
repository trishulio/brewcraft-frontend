import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { Button, FormFeedback, FormGroup, Input } from "reactstrap";
import { isValidNumberString } from "../../helpers/utils";
import { setFinishedGoodInvalidMaterialPortions } from "../../store/actions";
import CommonTable from "../Common/table";

function Th({ children }) {
    return (
        <th
            style={{
                fontSize: "1rem",
            }}
        >
            {children}
        </th>
    );
}

export default function FinishedGoodMaterials({
    materialPortions,
    setMaterialPortions,
}) {
    const [invalidQuantity, setInvalidQuantity] = useState(false);
    const [lots, setLots] = useState([]);
    const [selectedLot, setSelectedLot] = useState("");
    const [selectedLotQuantity, setSelectedLotQuantity] = useState(0);
    const dispatch = useDispatch();

    const materialLots = useSelector((state) => {
        return state.MaterialLots.stock;
    });

    return (
        <React.Fragment>
            <CommonTable className="mb-3">
                <thead>
                    <tr>
                        <Th></Th>
                        <Th>Material</Th>
                        <Th>Lot Number</Th>
                        <Th>Quantity</Th>
                    </tr>
                </thead>
                <tbody>
                    {!materialPortions ||
                        (!materialPortions.length && (
                            <tr>
                                <td></td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        ))}
                    {materialPortions &&
                        map(materialPortions, (portion, index) => (
                            <tr key={index}>
                                <td style={{ width: "2rem" }}>
                                    <div className="d-flex align-items-center vertical-center">
                                        <Input
                                            className="ml-1"
                                            type="checkbox"
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setLots([...lots, index]);
                                                } else {
                                                    setLots(
                                                        lots.filter(
                                                            (l) => l !== index
                                                        )
                                                    );
                                                }
                                            }}
                                            checked={lots.includes(index)}
                                        />
                                    </div>
                                </td>
                                <td>
                                    {
                                        portion.materialLot.invoiceItem.material
                                            .name
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
            <div className="d-flex align-items-center">
                <FormGroup className="px-1">
                    <Input
                        type="select"
                        className="waves-effect"
                        value={selectedLot.materialLot?.id || ""}
                        onChange={(e) => {
                            const materialLot = materialLots.find((s) => {
                                return (
                                    s.materialLot.id ===
                                    parseInt(e.target.value)
                                );
                            });
                            if (
                                !materialPortions ||
                                materialPortions.length < 1
                            ) {
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
                                (lot) => lot.material.materialClass.id === 2
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
                    <FormFeedback>Select at least one material.</FormFeedback>
                </FormGroup>
                <FormGroup className="flex-shrink-1 px-1">
                    <Input
                        type="number"
                        className="waves-effect"
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
            </div>
            <div className="d-flex align-items-center">
                <span className="px-1">
                    <Button
                        onClick={() => {
                            let materialPortion;
                            if (materialPortions?.length) {
                                materialPortion = materialPortions.find(
                                    (mp) =>
                                        mp.materialLot.id ===
                                        selectedLot.materialLot.id
                                );
                            }
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
                                    },
                                ]);
                            }
                        }}
                        disabled={!selectedLot || !selectedLotQuantity}
                    >
                        Enter
                    </Button>
                </span>
                <span className="px-1">
                    <Button
                        color="warning"
                        className="px-1"
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
                </span>
            </div>
        </React.Fragment>
    );
}
