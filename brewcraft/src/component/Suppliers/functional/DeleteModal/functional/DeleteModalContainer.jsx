import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSupplier } from '../../../../../store/suppliers/suppliers-actions';
import { DeleteModalUI } from '../ui/DeleteModalUI';

export const DeleteModalContainer = (props) => {
    const [vendorId, setVendorId] = useState(0);
    const dispatch = useDispatch();
    const handleVendorChange = e => {
        setVendorId(e.value);
    }

    const handleDelete = () => {
        dispatch(deleteSupplier(vendorId));
    }

    return <DeleteModalUI
        handleDelete={handleDelete}
        handleVendorChange={handleVendorChange}
        {...props} />;
}