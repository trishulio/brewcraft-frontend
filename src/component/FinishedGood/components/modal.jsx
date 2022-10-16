import React, { useState } from "react";
import { useEffect } from "react";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { ErrorMessage } from "../../../helpers/textUtils";
import { isValidNumberString, validDate } from "../../../helpers/utils";
import { Modal, ModalBody, ModalFooter } from "../../Common/modal";
import Materials from "./materials";

export default function FinishedGoodModal({
    mixture,
    finishedGood: initialFinishedGood = {},
    show,
    error,
    onSave,
    onClose,
}) {
    const [finishedGood, setFinishedGood] = useState({});

    useEffect(() => {
        setFinishedGood({
            mixture,
            materialPortions: [],
            mixturePortions: [],
            packagedOn: "",
            quantity: "",
            ...initialFinishedGood,
        });
    }, [initialFinishedGood, mixture]);

    return (
        <Modal
            title={finishedGood.id ? "Edit Finished Good" : "New Finished Good"}
            show={show}
            close={onClose}
        >
            <ModalBody>
                {error && <ErrorMessage props={{ ...error }} toggle />}
                <div className="d-flex">
                    <FormGroup className="p-2">
                        <Label for="finishedGoodVolume">Volume / Unit</Label>
                        <Input
                            type="number"
                            className="waves-effect"
                            value={
                                finishedGood.mixturePortions[0]?.quantity
                                    .value || ""
                            }
                            placeholder="Enter"
                            name="finishedGoodVolume"
                            onChange={(e) => {
                                setFinishedGood({
                                    ...finishedGood,
                                    mixturePortions: [
                                        {
                                            quantity: {
                                                value: e.target.value,
                                            },
                                        },
                                    ],
                                });
                            }}
                            invalid={
                                finishedGood.mixturePortions[0]?.quantity
                                    .value !== "" &&
                                !isValidNumberString(
                                    finishedGood.mixturePortions[0]?.quantity
                                        .value
                                )
                            }
                        />
                        <FormFeedback>Enter a valid volume.</FormFeedback>
                    </FormGroup>
                    <FormGroup
                        className="p-2"
                        style={{
                            width: "6rem",
                        }}
                    >
                        <Label for="finishedGoodVolumeUnit">Unit</Label>
                        <Input
                            type="select"
                            className="waves-effect"
                            value={
                                finishedGood.mixturePortions[0]?.quantity
                                    .symbol || "ml"
                            }
                            placeholder="Enter"
                            name="finishedGoodVolumeUnit"
                            onChange={(e) => {
                                setFinishedGood({
                                    ...finishedGood,
                                    mixturePortions: [
                                        {
                                            quantity: {
                                                symbol: e.target.value,
                                            },
                                        },
                                    ],
                                });
                            }}
                            invalid={
                                finishedGood.mixturePortions.length &&
                                !finishedGood.mixturePortions[0].quantity.symbol
                            }
                        >
                            <option value="hl">hl</option>
                            <option value="l">l</option>
                            <option value="ml">ml</option>
                        </Input>
                        <FormFeedback>Invalid form value.</FormFeedback>
                    </FormGroup>
                </div>
                <FormGroup
                    className="p-2"
                    style={{
                        maxWidth: "20rem",
                    }}
                >
                    <Label for="finishedGoodQuantity">Number of Units</Label>
                    <Input
                        type="number"
                        className="waves-effect"
                        value={finishedGood.quantity}
                        placeholder="Enter"
                        name="finishedGoodQuantity"
                        onChange={(e) => {
                            setFinishedGood({
                                ...finishedGood,
                                quantity: e.target.value,
                            });
                        }}
                        invalid={
                            finishedGood.quantity !== null &&
                            !isValidNumberString(finishedGood.quantity)
                        }
                    />
                    <FormFeedback>Enter a valid quantity.</FormFeedback>
                </FormGroup>
                <FormGroup
                    className="p-2"
                    style={{
                        maxWidth: "20rem",
                    }}
                >
                    <Label for="finishedGoodPackagedOn">Packaged Date</Label>
                    <Input
                        type="datetime-local"
                        name="finishedGoodPackagedOn"
                        className="waves-effect"
                        value={finishedGood.packagedOn}
                        onChange={(e) => {
                            setFinishedGood({
                                ...finishedGood,
                                packagedOn: e.target.value,
                            });
                        }}
                        invalid={
                            finishedGood.packagedOn !== "" &&
                            !validDate(finishedGood.packagedOn)
                        }
                    />
                    <FormFeedback>Enter a valid time and date</FormFeedback>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label for="finishedGoodMaterialPortions">
                        Packaging Materials
                    </Label>
                    <Materials
                        name="finishedGoodMaterialPortions"
                        materialPortions={finishedGood.materialPortions}
                        setMaterialPortions={(materialPortions) => {
                            setFinishedGood({
                                ...finishedGood,
                                materialPortions,
                            });
                        }}
                    />
                    <FormFeedback>Enter a valid time and date</FormFeedback>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        if (
                            JSON.stringify(initialFinishedGood) !==
                            JSON.stringify(finishedGood)
                        ) {
                            onSave(finishedGood);
                        } else {
                            onClose();
                        }
                    }}
                >
                    Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}
