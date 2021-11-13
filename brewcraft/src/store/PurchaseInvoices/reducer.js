import {
    FETCH_PURCHASE_INVOICES_REQUEST,
    FETCH_PURCHASE_INVOICES_SUCCESS,
    FETCH_PURCHASE_INVOICES_FAILURE,
    FETCH_ALL_PURCHASE_INVOICES_SUCCESS,
    FETCH_ALL_PURCHASE_INVOICES_FAILURE,
    FETCH_ALL_PURCHASE_INVOICES_REQUEST,
    SET_PURCHASE_INVOICES_PAGE_INDEX,
    SET_PURCHASE_INVOICES_PAGE_SIZE,
    SET_PURCHASE_INVOICES_DETAILS,
    SET_PURCHASE_INVOICE_ITEM_DETAILS
} from "./actionTypes";

const initialState = {
    content: [],
    all: [],
    loading: false,
    error: null,
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20
};

const PurchaseInvoices = (state = initialState, { type, payload, data }) => {
    switch (type) {
        case FETCH_PURCHASE_INVOICES_REQUEST:
            return {
                ...state,
                data: null,
                loading: true,
                error: null,
            };
        case FETCH_PURCHASE_INVOICES_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_PURCHASE_INVOICES_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case FETCH_ALL_PURCHASE_INVOICES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ALL_PURCHASE_INVOICES_SUCCESS:
            return {
                ...state,
                all: data.data.content,
                loading: false,
                error: null,
            };
        case FETCH_ALL_PURCHASE_INVOICES_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case SET_PURCHASE_INVOICES_PAGE_INDEX:
        case SET_PURCHASE_INVOICES_PAGE_SIZE:
        case SET_PURCHASE_INVOICES_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case SET_PURCHASE_INVOICE_ITEM_DETAILS:
            return {
                ...state,
                content: {
                    ...state.content,
                    items: payload.items
                }
            };
        default:
            return {
                ...state,
                loading: true,
                error: null
            }
    }
}

export default PurchaseInvoices;