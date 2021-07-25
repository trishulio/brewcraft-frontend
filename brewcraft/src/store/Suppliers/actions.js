import {
    FETCH_SUPPLIERS_REQUEST,
    FETCH_ALL_SUPPLIERS_REQUEST,
    SET_SUPPLIERS_DETAILS,
    SET_SUPPLIERS_PAGE_INDEX,
    SET_SUPPLIERS_PAGE_SIZE
} from "./actionTypes";

export const fetchSuppliers = params => ({
    type: FETCH_SUPPLIERS_REQUEST,
    payload: { params },
});

export const fetchAllSuppliers = () => ({
    type: FETCH_ALL_SUPPLIERS_REQUEST,
});

export const setSuppliersSelectedCompany = company => ({
    type: SET_SUPPLIERS_DETAILS,
    payload: {
        selectedCompany: company
    }
});

export const setSuppliersPageIndex = index => ({
    type: SET_SUPPLIERS_PAGE_INDEX,
    payload: {
        pageIndex: index
    }
});

export const setSuppliersPageSize = size => ({
    type: SET_SUPPLIERS_PAGE_SIZE,
    payload: {
        pageSize: size
    }
});

export const setInvalidSupplierFirstName = value => ({
    type: SET_SUPPLIERS_DETAILS,
    payload: {
        invalidSupplierFirstName: value
    }
});

export const setInvalidSupplierLastName = value => ({
    type: SET_SUPPLIERS_DETAILS,
    payload: {
        invalidSupplierLastName: value
    }
});

export const setInvalidSupplierPosition = value => ({
    type: SET_SUPPLIERS_DETAILS,
    payload: {
        invalidSupplierPosition: value
    }
});

export const setInvalidSupplierEmail = value => ({
    type: SET_SUPPLIERS_DETAILS,
    payload: {
        invalidSupplierEmail: value
    }
});

export const setInvalidSupplierPhoneNumber = value => ({
    type: SET_SUPPLIERS_DETAILS,
    payload: {
        invalidSupplierPhoneNumber: value
    }
});

export const setInvalidSupplierCompany = value => ({
    type: SET_SUPPLIERS_DETAILS,
    payload: {
        invalidSupplierCompany: value
    }
});