import {CREATE_SUPPLIER, GET_SUPPLIERS_DATA, SET_DATA, DELETE_SUPPLIER, UPDATE_SUPPLIER} from "./actionTypes";

export const setData = (data) => ({ type: SET_DATA, payload: data });

export const startGetSuppliersWatcher = () => ({ type: GET_SUPPLIERS_DATA });

export const startCreateSupplierWatcher = (data) => ( { type: CREATE_SUPPLIER, payload: data } )

export const deleteSupplierWatcher = (id) => ( { type: DELETE_SUPPLIER, payload: id} );

export const updateSupplierWatcher = (formData) => ( { type: UPDATE_SUPPLIER, payload: formData })
