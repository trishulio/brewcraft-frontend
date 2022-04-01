import React from "react";
import { Button } from "reactstrap";
import { Modal, ModalBody, ModalFooter } from "../Common/modal";
import FinishedGoodDetails from "./components/details";

export default function FinishedGoodModal({
    finishedGood,
    setFinishedGood,
    showBatch,
    show,
    editable,
    repackage,
    onSave,
    onClose,
}) {
    return (
        <Modal
            title="Finished Good Lot Details"
            size="lg"
            show={show}
            close={onClose}
        >
            <ModalBody>
                <FinishedGoodDetails
                    finishedGood={finishedGood}
                    setFinishedGood={setFinishedGood}
                    showBatch={showBatch}
                    editable={editable}
                    repackage={repackage}
                ></FinishedGoodDetails>
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
