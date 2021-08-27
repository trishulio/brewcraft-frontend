import {
    FETCH_SUPPLIER_CONTACT_BY_ID_REQUEST,
    EDIT_SUPPLIER_CONTACT_REQUEST,
    DELETE_SUPPLIER_CONTACT_REQUEST,
    ADD_SUPPLIER_CONTACT_REQUEST,
    SET_SUPPLIER_CONTACT_DETAILS,
    RESET_SUPPLIER_CONTACT_DETAILS,
    INVALID_SUPPLIER_CONTACT_FIRST_NAME,
    INVALID_SUPPLIER_CONTACT_LAST_NAME,
    INVALID_SUPPLIER_CONTACT_COMPANY,
    INVALID_SUPPLIER_CONTACT_POSITION,
    INVALID_SUPPLIER_CONTACT_EMAIL,
    INVALID_SUPPLIER_CONTACT_PHONE_NUMBER
} from "./actionTypes";

export const setSupplierContactDetails = payload => ({
    type: SET_SUPPLIER_CONTACT_DETAILS,
    payload: payload
});

export const resetSupplierContactDetails = () => ({
    type: RESET_SUPPLIER_CONTACT_DETAILS,
    payload: null
});

export const fetchSupplierContactById = (payload) => ({
    type: FETCH_SUPPLIER_CONTACT_BY_ID_REQUEST,
    payload: payload,
});
export const editSupplierContact = (payload) => ({
    type: EDIT_SUPPLIER_CONTACT_REQUEST,
    payload: payload,
});

export const deleteSupplierContact = id => ({
    type: DELETE_SUPPLIER_CONTACT_REQUEST,
    payload: { id },
});

export const saveSupplierContact = payload => ({
    type: ADD_SUPPLIER_CONTACT_REQUEST,
    payload: payload
});

export const setInvalidSupplierContactFirstName = enabled => ({
    type: INVALID_SUPPLIER_CONTACT_FIRST_NAME,
    payload: {
        invalidFirstName: enabled
    }
});

export const setInvalidSupplierContactLastName = enabled => ({
    type: INVALID_SUPPLIER_CONTACT_LAST_NAME,
    payload: {
        invalidLastName: enabled
    }
});

export const setInvalidSupplierContactCompany = enabled => ({
    type: INVALID_SUPPLIER_CONTACT_COMPANY,
    payload: {
        invalidCompany: enabled
    }
});

export const setInvalidSupplierContactPosition = enabled => ({
    type: INVALID_SUPPLIER_CONTACT_POSITION,
    payload: {
        invalidPosition: enabled
    }
});

export const setInvalidSupplierContactEmail = enabled => ({
    type: INVALID_SUPPLIER_CONTACT_EMAIL,
    payload: {
        invalidEmail: enabled
    }
});

export const setInvalidSupplierContactPhoneNumber = enabled => ({
    type: INVALID_SUPPLIER_CONTACT_PHONE_NUMBER,
    payload: {
        invalidPhoneNumber: enabled
    }
});
