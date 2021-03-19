import { call, put, takeLatest } from "redux-saga/effects";
import { get } from 'lodash';
import AxiosInstance from "../../helpers/axiosInstance";
import {
    FETCH_PURCHASES_REQUEST,
    FETCH_PURCHASES_SUCCESS,
    FETCH_PURCHASES_FAIL,
    FETCH_PURCHASE_REQUEST,
    FETCH_PURCHASE_SUCCESS,
    FETCH_PURCHASE_FAIL,
    CREATE_PURCHASE_REQUEST,
    CREATE_PURCHASE_SUCCESS,
    CREATE_PURCHASE_FAIL,
    UPDATE_COMPANY_REQUEST,
    UPDATE_COMPANY_SUCCESS,
    UPDATE_COMPANY_FAIL,
    DELETE_COMPANY_REQUEST,
    DELETE_COMPANY_SUCCESS,
    DELETE_COMPANY_FAIL
} from "./actionTypes";
import {
    snackFailure,
    snackSuccess
} from "../Snackbar/actions";

async function fetchPurchaseInvoicesRequest() {
    return await AxiosInstance.get("/api/v1/purchases/invoices");
}

function* fetchPurchaseInvoices() {
    try {
        const response = yield call(fetchPurchaseInvoicesRequest)
        yield put({ type: FETCH_PURCHASES_SUCCESS, payload: response.data });
    } catch {
        yield put(snackFailure("Failed to fetch invoices."));
        yield put({ type: FETCH_PURCHASES_FAIL, payload: [] });
    }
}

async function fetchPurchaseInvoiceRequest(id) {
    return await AxiosInstance.get("/api/v1/purchases/invoices/" + id);
}

function* fetchPurchaseInvoice(action) {
    try {
        const response = yield call(fetchPurchaseInvoiceRequest, action.payload.id)
        yield put({ type: FETCH_PURCHASES_SUCCESS, payload: response.content });
        action.payload.success && action.payload.success(response.content);
    } catch {
        yield put(snackFailure("Failed to fetch invoice."));
        yield put({ type: FETCH_PURCHASES_FAIL, payload: [] });
    }
//   yield put({
//     type: ADD_INVOICE_SUCCESS,
//     payload: {
//       id: id,
//       invoice_id:3,
//       status: "status test",
//       due: "due test",
//       date: "date test",
//       number: "number test",
//       customer: "customer test",
//       amount_due: "amount_due test",
//       delivery_date: "delivery_date test",
//       payment_date: "payment_date test",
//       unpaid:false,
//       paid:true,
//     }
//   });
}

async function createPurchaseInvoiceRequest(data) {
    return await AxiosInstance.post("/api/v1/purchases/invoices", data);
}

function* createPurchaseInvoice(action) {
    try {
        yield call(createPurchaseInvoiceRequest, action.payload.id)
        yield put({ type: CREATE_PURCHASES_SUCCESS });
        action.payload.success && action.payload.success();
    } catch {
        yield put(snackFailure("Failed to create invoice."));
    }
}

async function updatePurchaseInvoiceRequest(id, data) {
    return await AxiosInstance.put("/api/v1/purchases/invoices/" + id, data);
}

function* updatePurchaseInvoice(action) {
    try {
        yield call(updatePurchaseInvoiceRequest, action.payload.id, action.payload.data);
        yield put({ type: UPDATE_PURCHASES_SUCCESS });
        action.payload.success && action.payload.success();
    } catch {
        yield put(snackFailure("Failed to update invoice."));
    }
}

async function deletePurchaseInvoiceRequest(id) {
    return await AxiosInstance.delete("/api/v1/purchases/invoices/" + id);
}

function* fetchPurchaseInvoice(action) {
    try {
        yield call(deletePurchaseInvoiceRequest, action.payload.id)
        yield put({ type: FETCH_PURCHASES_SUCCESS });
        action.payload.success && action.payload.success();
    } catch {
        yield put(snackFailure("Failed to delete invoice."));
        yield put({ type: FETCH_PURCHASES_FAIL });
    }
}

export default function* Invoice() {
    yield takeLatest(FETCH_PURCHASES_REQUEST, fetchPurchaseInvoices);
    yield takeLatest(FETCH_PURCHASE_REQUEST, fetchPurchaseInvoice);
    yield takeLatest(CREATE_PURCHASE_REQUEST, createPurchaseInvoice);
    yield takeLatest(UPDATE_PURCHASE_REQUEST, updatePurchaseInvoice);
    yield takeLatest(DELETE_PURCHASE_REQUEST, deletePurchaseInvoice);
}