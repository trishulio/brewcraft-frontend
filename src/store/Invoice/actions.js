import {
    ADD_INVOICE_REQUEST,
    EDIT_INVOICE_REQUEST,
    DELETE_INVOICE_REQUEST,
    FETCH_INVOICES_REQUEST,
    FETCH_INVOICE_BY_ID_REQUEST,
} from "./actionTypes";

export const saveInvoice = (payload) => ({
    type: ADD_INVOICE_REQUEST,
    payload: payload,
});

export const fetchInvoices = () => ({
    type: FETCH_INVOICES_REQUEST,
});

export const fetchInvoiceById = () => ({
    type: FETCH_INVOICE_BY_ID_REQUEST,
});

export const editInvoice = (payload) => ({
    type: EDIT_INVOICE_REQUEST,
    payload: payload,
});

export const deleteInvoice = (payload) => ({
    type: DELETE_INVOICE_REQUEST,
    payload: payload,
});

export const dialogPen = (payload) => ({
    type: DELETE_INVOICE_REQUEST,
    payload: payload,
});
