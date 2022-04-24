import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    Alert,
    Button,
    FormFeedback,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import {
    Modal,
    ModalBody,
    ModalFooter,
} from "../../../../component/Common/modal";
import { map } from "lodash";

export default function StageInitModal({
    title,
    addBatchStage,
    show,
    setShow,
}) {
    const [equipmentItem, setEquipmentItem] = useState("");

    const equipment = useSelector((state) => {
        return state.Equipment.content;
    });

    return (
        <Modal
            title={title}
            show={show}
            close={() => {
                setShow(false);
            }}
        >
            <ModalBody>
                <Alert color="info" fade={false}>
                    Select equipment.
                </Alert>
                <Label for="mixtureEquipment">Equipment</Label>
                <FormGroup className="mb-3">
                    <Input
                        type="select"
                        className="waves-effect"
                        value={equipmentItem?.id || ""}
                        placeholder={"Enter"}
                        name="mixtureEquipment"
                        onChange={(e) => {
                            setEquipmentItem(
                                equipment.find((item) => {
                                    return item.id === parseInt(e.target.value);
                                })
                            );
                        }}
                    >
                        <option value="">Select</option>
                        {map(equipment, (value, index) => (
                            <option value={value.id} key={index}>
                                {value.name}
                            </option>
                        ))}
                    </Input>
                    <FormFeedback>Select a valid equipment item.</FormFeedback>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        addBatchStage(equipmentItem);
                        setShow(false);
                    }}
                    disabled={!equipmentItem}
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
