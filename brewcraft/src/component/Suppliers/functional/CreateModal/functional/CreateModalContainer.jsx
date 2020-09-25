import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSupplier } from '../../../../../store/suppliers/suppliers-actions';
import { CreateModalUI } from '../ui/CreateModalUI';

export const CreateModalContainer = () => {
    const [fields, setFields] = useState({});
    const dispatch = useDispatch();

    const handleInputChange = e => {
        setFields(({...fields, [e.target.name]: e.target.value}))
    }

    const handleSubmit = () => {
        dispatch(createSupplier(fields));
    }

    return <CreateModalUI handleCreate={handleSubmit}  handleInputChange={handleInputChange}/>;
}