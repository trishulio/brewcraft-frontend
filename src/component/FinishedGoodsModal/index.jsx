import React from "react";
import { Button, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { isValidNumberString, validDate } from "../../helpers/utils";
import { Modal, ModalBody, ModalFooter } from "../Common/modal";
import Materials from "./materials";

export default function FinishedGoodModal({
    finishedGood,
    setFinishedGood,
    show,
    onSave,
    onClose,
}) {
    return (
        <Modal title="Finished Good Lot Details" show={show} close={onClose}>
            <ModalBody>
                <div className="d-flex">
                    {console.log(finishedGood)}
                    <FormGroup className="p-2">
                        <Label for="finishedGoodQuantity">Quantity</Label>
                        <Input
                            type="number"
                            className="waves-effect"
                            value={finishedGood.quantity.value}
                            placeholder="Enter"
                            name="finishedGoodQuantity"
                            onChange={(e) => {
                                setFinishedGood({
                                    ...finishedGood,
                                    quantity: {
                                        ...finishedGood.quantity,
                                        value: e.target.value,
                                    },
                                });
                            }}
                            invalid={
                                finishedGood.quantity.value !== null &&
                                !isValidNumberString(
                                    finishedGood.quantity.value
                                )
                            }
                        />
                        <FormFeedback>Enter a valid quantity.</FormFeedback>
                    </FormGroup>
                    <FormGroup
                        className="p-2"
                        style={{
                            width: "6rem",
                        }}
                    >
                        <Label for="finishedGoodQuantity">Units</Label>
                        <Input
                            type="select"
                            className="waves-effect"
                            value={finishedGood.quantity.symbol || "hl"}
                            placeholder="Enter"
                            name="finishedGoodQuantity"
                            onChange={(e) => {
                                setFinishedGood({
                                    ...finishedGood,
                                    quantity: {
                                        ...finishedGood.quantity,
                                        symbol: e.target.value,
                                    },
                                });
                            }}
                            invalid={
                                !finishedGood.quantity.symbol &&
                                finishedGood.quantity.symbol !== ""
                            }
                        >
                            <option value="hl" selected>
                                hl
                            </option>
                            <option value="l">l</option>
                            <option value="ml">ml</option>
                            <option value="each">each</option>
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
                            finishedGood.packagedOn !== null &&
                            !validDate(finishedGood.packagedOn)
                        }
                    />
                    <FormFeedback>Enter a valid time and date</FormFeedback>
                </FormGroup>
                <FormGroup className="p-2">
                    <Label for="finishedGoodPackagedOn">
                        Packaging Materials
                    </Label>
                    <Materials
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
                <Button color="primary" onClick={onSave}>
                    Save
                </Button>{" "}
                <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}
