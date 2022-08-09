import React, { useState } from "react";
import { useSelector } from "react-redux";
import { map, findIndex } from "lodash";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import CommonTable from "../../../../component/Common/table";
import { isValidNumberString } from "../../../../helpers/utils";
import { editBatch, setBrewMaterialPortions } from "../../../../store/actions";
import { useDispatch } from "react-redux";
import {
    Modal,
    ModalBody,
    ModalFooter,
} from "../../../../component/Common/modal";

export function BatchIngredientsModal({ show, setShow, afterSave, mixture }) {
    const dispatch = useDispatch();
    return (
        <Modal
            title="Ingredients"
            size="lg"
            show={show}
            close={() => {
                setShow(false);
            }}
        >
            <ModalBody>
                <BatchIngredients mixture={mixture} />
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        dispatch(editBatch());
                        afterSave();
                        setShow(false);
                    }}
                >
                    Save
                </Button>{" "}
                <Button
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default function BatchIngredients({ mixture }) {
    const [invalidQuantity, setInvalidQuantity] = useState(false);
    const [lots, setLots] = useState([]);
    const [selectedLot, setSelectedLot] = useState("");
    const [selectedLotQuantity, setSelectedLotQuantity] = useState(0);
    const dispatch = useDispatch();

    const { editable } = useSelector((state) => {
        return state.Batch.Batch;
    });

    const ingredientLots = useSelector((state) => {
        return state.MaterialLots.stock.filter((ml) => {
            return ml.material.materialClass.id === 1;
        });
    });

    const materialPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.content.filter(
            (mp) => mp.mixture.id === mixture.id
        );
    });

    const allMaterialPortions = useSelector((state) => {
        return state.Batch.MaterialPortions.content;
    });

    return (
        <React.Fragment>
            <Label>Mixture Ingredients</Label>
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
                    <FormGroup className="d-block d-sm-inline-block mr-2 mb-0">
                        <Input
                            type="select"
                            className="waves-effect"
                            style={{ width: "14rem" }}
                            value={selectedLot.materialLot?.id || ""}
                            onChange={(e) => {
                                const materialLot = ingredientLots.find((s) => {
                                    return (
                                        s.materialLot.id ===
                                        parseInt(e.target.value)
                                    );
                                });
                                setSelectedLot(materialLot || "");
                            }}
                        >
                            <option value="">Ingredient</option>
                            {map(ingredientLots, (value, index) => (
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
                    <Button
                        className="waves-effect mr-2 mb-0"
                        onClick={() => {
                            const materialPortionIndex = findIndex(
                                materialPortions,
                                {
                                    materialLot: {
                                        id: selectedLot.materialLot.id,
                                    },
                                }
                            );

                            if (materialPortionIndex !== -1) {
                                const tempAllMaterialPortions = [
                                    ...allMaterialPortions,
                                ];
                                const materialPortion =
                                    allMaterialPortions[materialPortionIndex];
                                tempAllMaterialPortions[materialPortionIndex] =
                                    {
                                        ...materialPortion,
                                        quantity: {
                                            ...materialPortion.quantity,
                                            value: (materialPortion.quantity.value +=
                                                parseFloat(
                                                    selectedLotQuantity
                                                )),
                                        },
                                    };
                                dispatch(
                                    setBrewMaterialPortions({
                                        content: tempAllMaterialPortions,
                                    })
                                );
                            } else {
                                dispatch(
                                    setBrewMaterialPortions({
                                        content: [
                                            ...allMaterialPortions,
                                            {
                                                ...selectedLot,
                                                quantity: {
                                                    symbol: selectedLot.quantity
                                                        .symbol,
                                                    value: parseFloat(
                                                        selectedLotQuantity
                                                    ),
                                                },
                                                mixture: mixture,
                                            },
                                        ],
                                    })
                                );
                            }
                        }}
                        disabled={!selectedLot || !selectedLotQuantity}
                    >
                        Enter
                    </Button>
                    <Button
                        color="warning"
                        className="waves-effect"
                        onClick={() => {
                            dispatch(
                                setBrewMaterialPortions({
                                    content: allMaterialPortions.filter(
                                        (_, index) => !lots.includes(index)
                                    ),
                                })
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
