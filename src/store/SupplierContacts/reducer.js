import {
    FETCH_SUPPLIER_CONTACTS_REQUEST,
    FETCH_SUPPLIER_CONTACTS_SUCCESS,
    FETCH_SUPPLIER_CONTACTS_FAILURE,
    FETCH_ALL_SUPPLIER_CONTACTS_SUCCESS,
    FETCH_ALL_SUPPLIER_CONTACTS_FAILURE,
    FETCH_ALL_SUPPLIER_CONTACTS_REQUEST,
    SET_SUPPLIER_CONTACTS_DETAILS,
    SET_SUPPLIER_CONTACTS_PAGE_INDEX,
    SET_SUPPLIER_CONTACTS_PAGE_SIZE,
    SET_SUPPLIER_CONTACTS_SELECTED_COMPANY,
} from "./actionTypes";

const initialState = {
    content: [],
    all: [],
    loading: true,
    error: null,
    totalElements: 0,
    totalItems: 0,
    pageIndex: 0,
    pageSize: 20,
};

const SupplierContacts = (state = initialState, { type, payload, data }) => {
    switch (type) {
        case FETCH_SUPPLIER_CONTACTS_REQUEST:
            return {
                ...state,
                data: null,
                loading: true,
                error: null,
            };
        case FETCH_ALL_SUPPLIER_CONTACTS_SUCCESS:
        case FETCH_SUPPLIER_CONTACTS_SUCCESS:
            return {
                ...state,
                ...data.data,
                loading: false,
                error: null,
            };
        case FETCH_SUPPLIER_CONTACTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case FETCH_ALL_SUPPLIER_CONTACTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ALL_SUPPLIER_CONTACTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case SET_SUPPLIER_CONTACTS_PAGE_INDEX:
        case SET_SUPPLIER_CONTACTS_PAGE_SIZE:
        case SET_SUPPLIER_CONTACTS_DETAILS:
        case SET_SUPPLIER_CONTACTS_SELECTED_COMPANY:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
                error: null,
            };
    }
};

export default SupplierContacts;
