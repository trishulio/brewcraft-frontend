import React from 'react';
import { setBreadcrumbItems } from '../../../store/actions';
import { SuppliersUI } from '../ui/SuppliersUI';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { batch } from 'react-redux';
import { getSuppliersData } from '../../../store/suppliers/suppliers-actions';
import { useMemo } from 'react';
import { useCallback } from 'react';
import { CreateModalContainer } from './CreateModal/functional/CreateModalContainer';
import { openModal } from '../../../store/modal/modal-actions';
import { DeleteModalContainer } from './DeleteModal/functional/DeleteModalContainer';
import { UpdateModalContainer } from './UpdateModal/functional/UpdateModalContainer';

export const SuppliersContainer = () => {
    const dispatch = useDispatch();
    const tableData = useSelector(state => state.suppliers);

    const vendors = useMemo(() => tableData.rows.map(row => ({ label: row.name, value: row.id, ...row })), [tableData])


    const handleCreateOpen = useCallback(() => {
        dispatch(openModal(<CreateModalContainer />));
    }, []);

    const handleDeleteOpen = useCallback(() => {
        dispatch(openModal(<DeleteModalContainer vendors={vendors}/>));
    }, [vendors, dispatch]);

    const handleUpdateOpen = useCallback(() => {
        dispatch(openModal(<UpdateModalContainer vendors={vendors}/>))
    }, [vendors, dispatch]);

    useEffect(() => {
        batch(() => {
            dispatch(setBreadcrumbItems("Suppliers", [
                { title : "Dashboard", link : "#" },
                { title : "Suppliers", link : "#" }
            ]))
            dispatch(getSuppliersData());
        })
    }, []);

    const actions = useMemo(() => [
        { value: 'create', label: 'Create', onSelect: handleCreateOpen },
        { value: 'update', label: 'Update', onSelect: handleUpdateOpen },
        { value: 'delete', label: 'Delete', onSelect: handleDeleteOpen },
    ], [handleDeleteOpen, handleCreateOpen]);

    const handleSelectChange = e => {
        e.onSelect();
    }


    return <SuppliersUI
                data={tableData}
                actions={actions}
                handleSelectChange={handleSelectChange}
            />;
}