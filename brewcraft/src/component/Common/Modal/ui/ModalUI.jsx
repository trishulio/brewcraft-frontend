import React from 'react';
import {
    Modal,
    ModalBody,
    ModalFooter,
    Button
} from "reactstrap";


export const ModalUI = ({ content, handleModalClose }) => {
    return <Modal isOpen={true} autoFocus>
        <ModalBody>
            {content}
            <ModalFooter>
                <Button type="button" color="secondary" className="waves-effect" onClick={handleModalClose}>Close</Button>
            </ModalFooter>
        </ModalBody>
    </Modal>
}