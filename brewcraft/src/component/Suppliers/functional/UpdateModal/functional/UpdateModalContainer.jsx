import React, { useState } from 'react';
import { UpdateModalUI } from "../ui/UpdateModalUI"
import { useDispatch } from 'react-redux';
import { updateSupplier } from '../../../../../store/suppliers/suppliers-actions';

export const UpdateModalContainer = ({ vendors }) => {
    const [fields, setFields] = useState(null);
    const dispatch = useDispatch();

    const handleInputChange = e => {
        setFields(({ ...fields, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        dispatch(updateSupplier(fields));
    }

    const handleSelectChange = e => {
        setFields(e);
    }

    return <UpdateModalUI
        handleSelectChange={handleSelectChange}
        handleInputChange={handleInputChange}
        vendors={vendors}
        fields={fields || {}}
        disabled={!fields}
        handleUpdate={handleSubmit} />;
}