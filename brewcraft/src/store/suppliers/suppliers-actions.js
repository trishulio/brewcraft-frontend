import { suppliersConstants } from "./suppliers-constants";
import { batch } from 'react-redux';
import { closeModal } from '../modal/modal-actions';

export const setData = (data) => ({ type: suppliersConstants.SET_DATA, payload: data });

export const getSuppliersData = () => (dispatch) => {
    const timeout = setTimeout(() => {
        dispatch(setData([
            {
                name: 'Gayane',
                email: 'avetisyan72@yahoo.com',
                directDeposit: 'Not avaible',
                actions: 'Create Bill',
                id: 1,
            }
        ]));
        clearTimeout(timeout)
    }, 150);
}

export const createSupplier = (data) => (dispatch, getState) => {
    const tableData = getState().suppliers.rows;
    const timeout = setTimeout(() => {
        batch(() => {
            dispatch(setData([...tableData, { ...data, id: 2 }]));
            dispatch(closeModal());
        })
        clearTimeout(timeout);
    }, 500);
}

export const deleteSupplier = (id) => (dispatch, getState) => {
    const tableData = getState().suppliers.rows;

    const timeout = setTimeout(() => {
        const index = tableData.findIndex(row => row.id === id);
        batch(() => {
            dispatch(setData([...tableData.slice(0, index), ...tableData.slice(index + 1)]))
            dispatch(closeModal());
        })
        clearTimeout(timeout);
    }, 500);
}

export const updateSupplier = (formData) => (dispatch, getState) => {
    const tableData = getState().suppliers.rows;
    const timeout = setTimeout(() => {
        const data = {
            name: formData.name,
            email: formData.email,
            id: formData.id,
            directDeposit: formData.directDeposit,
            actions: formData.actions,
        }
        const index = tableData.findIndex(row => row.id === formData.id);
        batch(() => {
            dispatch(setData([...tableData.slice(0, index), data, ...tableData.slice(index + 1)]));
            dispatch(closeModal());
        })
        clearTimeout(timeout);
    }, 500);

}