import React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../../store/modal/modal-actions';
import { ModalUI } from '../ui/ModalUI';

export const ModalContainer = () => {
    const modal = useSelector(state => state.global.modal);
    const dispatch = useDispatch();

    const handleModalClose = useCallback(() => {
        dispatch(closeModal());
    }, []);

    if (!modal.open) {
        return null;
    }

    return <ModalUI content={modal.content} handleModalClose={handleModalClose}/>;
}