import React from 'react';
import { ModalContainer } from '../../component/Common/Modal/functional/ModalContainer';
import { SuppliersContainer } from "../../component/Suppliers/functional/SuppliersContainer"

export const Suppliers = () => {
    return <>
        <SuppliersContainer />
        <ModalContainer />
    </>;
}