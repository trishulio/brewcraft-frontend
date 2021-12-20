import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, FormGroup, Input } from "reactstrap";
import { Modal, ModalBody, ModalFooter } from "../Common/modal";
import { saveMixtureRecording } from "../../store/actions";

export default function MixtureRecordingModal(props) {
    const [recordValue, setRecordValue] = useState("");
    const [recordRecordedAt, setRecordRecordedAt] = useState("");
    const dispatch = useDispatch();

    function close() {
        props.setShow(false);
    }

    function onFormSubmit() {
        dispatch(
            saveMixtureRecording({
                form: [
                    {
                        mixtureId: props.mixture.id,
                        measureId: props.measureId,
                        value: recordValue,
                        recordedAt: recordRecordedAt,
                    },
                ],
                batchId: props.batchId,
            })
        );
        close();
    }

    return (
        <Modal
            size="md"
            show={props.show}
            onValidSubmit={onFormSubmit}
            close={close}
            title={props.title}
        >
            <ModalBody>
                <h4 className="font-size-14">New Record</h4>
                <FormGroup className="d-sm-inline-block mr-2 mb-3">
                    <Input
                        type="datetime-local"
                        name="batchStartDateTime"
                        className="waves-effect"
                        // bsSize="sm"
                        style={{ width: "16rem" }}
                        value={recordRecordedAt}
                        onChange={(e) => {
                            setRecordRecordedAt(e.target.value);
                        }}
                    />
                </FormGroup>
                <FormGroup
                    hidden={!props.editable}
                    className="d-sm-inline-block mr-2 mb-3"
                >
                    <Input
                        type="text"
                        className="d-sm-inline-block mr-2 mb-3"
                        placeholder="Value"
                        style={{ width: "4rem" }}
                        hidden={!props.editable}
                        value={recordValue !== "" ? recordValue : ""}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (Number.isInteger(value)) {
                                setRecordValue(value);
                            } else {
                                setRecordValue("");
                            }
                        }}
                    />
                    <span className="d-sm-inline-block font-size-14 mr-2 mb-3">
                        {props.unit}
                    </span>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" type="submit" onClick={onFormSubmit}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
}
