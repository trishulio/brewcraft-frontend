import React, { useState } from "react";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { ErrorMessage } from "../../helpers/textUtils";
import { isValidNumberString, validDate } from "../../helpers/utils";
import { Modal, ModalBody, ModalFooter } from "../Common/modal";
import Materials from "./materials";

export default function FinishedGoodModal({
    mixture,
    finishedGood,
    setFinishedGood,
    show,
    error,
    onSave,
    onClose,
}) {
    const [volume, setVolume] = useState(
        finishedGood.mixturePortions[0]?.quantity.value || ""
    );
    const [unit, setUnit] = useState(
        finishedGood.mixturePortions[0]?.quantity.symbol || ""
    );
    const [quantity, setQuantity] = useState(finishedGood.quantity?.value);
    const [packagedOn, setPackagedOn] = useState(finishedGood.packagedOn);
    const [materialPortions, setMaterialPortions] = useState(
        JSON.parse(JSON.stringify(finishedGood.materialPortions))
    );
    return (
        <Modal
            title={finishedGood.id ? "Edit Finished Good" : "New Finished Good"}
            show={show}
            close={onClose}
        >
            <ModalBody>
                {error && <ErrorMessage props={{ ...error }} toggle />}
                <div className="d-flex">
                    {}
                    <FormGroup className="p-2">
                        <Label for="finishedGoodVolume">Volume / Unit</Label>
                        <Input
                            type="number"
                            className="waves-effect"
                            value={volume}
                            placeholder="Enter"
                            name="finishedGoodVolume"
                            onChange={(e) => {
                                setVolume(e.target.value);
                            }}
                            invalid={
                                volume !== "" && !isValidNumberString(volume)
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
                            value={unit || "ml"}
                            placeholder="Enter"
                            name="finishedGoodVolumeUnit"
                            onChange={(e) => {
                                setUnit(e.target.value);
                            }}
                            invalid={!unit && unit !== ""}
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
                        value={quantity}
                        placeholder="Enter"
                        name="finishedGoodQuantity"
                        onChange={(e) => {
                            setQuantity(e.target.value);
                        }}
                        invalid={
                            quantity !== null && !isValidNumberString(quantity)
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
                        value={packagedOn}
                        onChange={(e) => {
                            setPackagedOn(e.target.value);
                        }}
                        invalid={packagedOn !== "" && !validDate(packagedOn)}
                    />
                    <FormFeedback>Enter a valid time and date</FormFeedback>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label for="finishedGoodMaterialPortions">
                        Packaging Materials
                    </Label>
                    <Materials
                        name="finishedGoodMaterialPortions"
                        materialPortions={materialPortions}
                        setMaterialPortions={setMaterialPortions}
                    />
                    <FormFeedback>Enter a valid time and date</FormFeedback>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        setFinishedGood({
                            ...finishedGood,
                            materialPortions: JSON.parse(
                                JSON.stringify(materialPortions)
                            ),
                            mixturePortions: [
                                {
                                    mixture,
                                    quantity: {
                                        value:
                                            parseFloat(volume) *
                                            parseFloat(quantity),
                                        symbol: unit,
                                    },
                                },
                            ],
                            quantity: {
                                value: parseFloat(quantity),
                                symbol: "each",
                            },
                        });
                        onSave();
                    }}
                >
                    Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}
