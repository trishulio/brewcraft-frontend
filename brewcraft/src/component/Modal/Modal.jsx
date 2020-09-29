import React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../store/modal/modal-actions';
import {
    Modal,
    ModalBody,
    ModalFooter,
    Button
} from "reactstrap";

export const ModalContainer = () => {
    const modal = useSelector(state => state.modal);
    const dispatch = useDispatch();

    const handleModalClose = useCallback(() => {
        dispatch(closeModal());
    }, []);

    if (!modal.open) {
        return null;
    }
    const { content } = modal;

    return <Modal isOpen={true} autoFocus>
        <ModalBody>
            {content}
            <ModalFooter>
                <Button type="button" color="secondary" className="waves-effect" onClick={handleModalClose}>Close</Button>
            </ModalFooter>
        </ModalBody>
    </Modal>

}