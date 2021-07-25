import {
    FETCH_SUPPLIER_BY_ID_REQUEST,
    EDIT_SUPPLIER_REQUEST,
    DELETE_SUPPLIER_REQUEST,
    ADD_SUPPLIER_REQUEST,
    SET_SUPPLIER_DETAILS,
    RESET_SUPPLIER_DETAILS,
    INVALID_SUPPLIER_NAME,
    INVALID_SUPPLIER_PARENT_SUPPLIER
} from "./actionTypes";

export const setSupplierDetails = payload => ({
    type: SET_SUPPLIER_DETAILS,
    payload: payload
});

export const resetSupplierDetails = () => ({
    type: RESET_SUPPLIER_DETAILS,
    payload: null
});

export const fetchSupplierById = (payload) => ({
    type: FETCH_SUPPLIER_BY_ID_REQUEST,
    payload: payload,
});
export const editSupplier = (payload) => ({
    type: EDIT_SUPPLIER_REQUEST,
    payload: payload,
});

export const deleteSupplier = (payload) => ({
    type: DELETE_SUPPLIER_REQUEST,
    payload: payload,
});

export const saveSupplier = payload => ({
    type: ADD_SUPPLIER_REQUEST,
    payload: payload
});

export const setInvalidSupplierName = enabled => ({
    type: INVALID_SUPPLIER_NAME,
    payload: {
        invalidName: enabled
    }
});

export const setInvalidSupplierParentCategory = enabled => ({
    type: INVALID_SUPPLIER_PARENT_SUPPLIER,
    payload: {
        invalidParentCategory: enabled
    }
});