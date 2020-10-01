import React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Modal as BootStrapModal,
    ModalBody,
    ModalFooter,
    Button
} from "reactstrap";
import {closeModal} from "../../store/modal/modal-actions";

export const Modal = () => {
    const modal = useSelector(state => state.modal);
    const dispatch = useDispatch();

    const handleModalClose = useCallback(() => {
        dispatch(closeModal());
    }, [dispatch]);

    if (!modal.open) {
        return null;
    }
    const { content } = modal;

    return <BootStrapModal isOpen={true} autoFocus>
        <ModalBody>
            {content}
            <ModalFooter>
                <Button type="button" color="secondary" className="waves-effect" onClick={handleModalClose}>Close</Button>
            </ModalFooter>
        </ModalBody>
    </BootStrapModal>

}
