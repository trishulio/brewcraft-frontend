import {
    FETCH_SUPPLIER_CONTACTS_REQUEST,
    FETCH_ALL_SUPPLIER_CONTACTS_REQUEST,
    SET_SUPPLIER_CONTACTS_DETAILS,
    SET_SUPPLIER_CONTACTS_PAGE_INDEX,
    SET_SUPPLIER_CONTACTS_PAGE_SIZE
} from "./actionTypes";

export const fetchSupplierContacts = params => ({
    type: FETCH_SUPPLIER_CONTACTS_REQUEST,
    payload: { params },
});

export const fetchAllSupplierContacts = () => ({
    type: FETCH_ALL_SUPPLIER_CONTACTS_REQUEST,
});

export const setSupplierContactsPageIndex = index => ({
    type: SET_SUPPLIER_CONTACTS_PAGE_INDEX,
    payload: {
        pageIndex: index
    }
});

export const setSupplierContactsPageSize = size => ({
    type: SET_SUPPLIER_CONTACTS_PAGE_SIZE,
    payload: {
        pageSize: size
    }
});

export const setInvalidSupplierFirstName = value => ({
    type: SET_SUPPLIER_CONTACTS_DETAILS,
    payload: {
        invalidSupplierFirstName: value
    }
});

export const setInvalidSupplierLastName = value => ({
    type: SET_SUPPLIER_CONTACTS_DETAILS,
    payload: {
        invalidSupplierLastName: value
    }
});

export const setInvalidSupplierPosition = value => ({
    type: SET_SUPPLIER_CONTACTS_DETAILS,
    payload: {
        invalidSupplierPosition: value
    }
});

export const setInvalidSupplierEmail = value => ({
    type: SET_SUPPLIER_CONTACTS_DETAILS,
    payload: {
        invalidSupplierEmail: value
    }
});

export const setInvalidSupplierPhoneNumber = value => ({
    type: SET_SUPPLIER_CONTACTS_DETAILS,
    payload: {
        invalidSupplierPhoneNumber: value
    }
});

export const setInvalidSupplierCompany = value => ({
    type: SET_SUPPLIER_CONTACTS_DETAILS,
    payload: {
        invalidSupplierCompany: value
    }
});