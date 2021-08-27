import {
    FETCH_SUPPLIER_BY_ID_REQUEST,
    SET_SUPPLIER_DETAILS,
    ADD_SUPPLIER_REQUEST,
    EDIT_SUPPLIER_REQUEST,
    DELETE_SUPPLIER_REQUEST,
    RESET_SUPPLIER_DETAILS
} from "./actionTypes";

export const fetchSupplierById = (payload) => ({
    type: FETCH_SUPPLIER_BY_ID_REQUEST,
    payload: payload,
  });

export const setSupplierDetails = payload => ({
    type: SET_SUPPLIER_DETAILS,
    payload: payload
});

export const resetSupplierDetails = () => ({
    type: RESET_SUPPLIER_DETAILS,
    payload: null
});

export const saveSupplier = payload => ({
    type: ADD_SUPPLIER_REQUEST,
    payload: payload,
});

export const editSupplier = payload => ({
    type: EDIT_SUPPLIER_REQUEST,
    payload: payload,
});

export const deleteSupplier = id => ({
    type: DELETE_SUPPLIER_REQUEST,
    payload: { id },
});

export const setInvalidSupplierName = value => ({
    type: SET_SUPPLIER_DETAILS,
    payload: {
        invalidName: value
    }
});

export const setInvalidSupplierAddressLine1 = value => ({
    type: SET_SUPPLIER_DETAILS,
    payload: {
        invalidAddressLine1: value
    }
});

export const setInvalidSupplierCity = value => ({
    type: SET_SUPPLIER_DETAILS,
    payload: {
        city: value
    }
});

export const setInvalidSupplierProvince = value => ({
    type: SET_SUPPLIER_DETAILS,
    payload: {
        province: value
    }
});

export const setInvalidSupplierPostalCode = value => ({
    type: SET_SUPPLIER_DETAILS,
    payload: {
        postalCode: value
    }
});

export const setInvalidSupplierCountry = value => ({
    type: SET_SUPPLIER_DETAILS,
    payload: {
        country: value
    }
});