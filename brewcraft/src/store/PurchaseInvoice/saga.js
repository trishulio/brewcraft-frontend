import {
    SET_PURCHASE_INVOICE_DETAILS,
    FETCH_PURCHASE_INVOICE,
    CREATE_PURCHASE_INVOICE,
    UPDATE_PURCHASE_INVOICE,
    DELETE_PURCHASE_INVOICE
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../Brewery/actions";

function* fetchPurchaseInvoiceByIdGenerator(action) {
    try {
        const res = yield call(api.fetchPurchaseInvoiceById, get(action, "payload"));
        const data = {
            ...res.data,
            generatedOn: res.data.generatedOn?.split("T")[0],
            paymentDueDate: res.data.paymentDueDate?.split("T")[0],
            items: res.data.invoiceItems
        };
        delete data.invoiceItems;
        yield put({ type: SET_PURCHASE_INVOICE_DETAILS, payload: { data: data, initial: data } });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* createPurchaseInvoiceGenerator(action) {
    let res;
    try {
        res = yield call(api.postProcurements, get(action, "payload.form"));
        const data = {
            ...res.data[0],
            items: res.data[0].procurementItems
        }
        delete data.procurementItems;
        yield put({ type: SET_PURCHASE_INVOICE_DETAILS, payload: { data: data, initial: data } });
        yield put(setGlobalRedirect({ pathname: "/purchases/invoices/" + res.data.id }));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* udpatePurchaseInvoiceGenerator(action) {
    try {
        const res = yield call(api.putPurchaseInvoice, get(action, "payload.form"));
        const data = {
            ...res.data[0],
            generatedOn: res.data[0].generatedOn?.split("T")[0],
            paymentDueDate: res.data[0].paymentDueDate?.split("T")[0],
            items: res.data[0].invoiceItems
        };
        delete data.invoiceItems;
        yield put({ type: SET_PURCHASE_INVOICE_DETAILS, payload: { data: data, initial: data } });
        yield put(snackSuccess(`Updated purchase invoice ${get(action, "payload.form.name")}.`));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* deletePurchaseInvoiceGenerator(action) {
    try {
        yield call(api.deletePurchaseInvoice, get(action, "payload.id"));
        yield put(setGlobalRedirect({ pathname: "/purchases/invoices" }));
        yield put(snackSuccess("Deleted purchase invoice."));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* PurchaseInvoice() {
    yield takeEvery(CREATE_PURCHASE_INVOICE, createPurchaseInvoiceGenerator);
    yield takeEvery(FETCH_PURCHASE_INVOICE, fetchPurchaseInvoiceByIdGenerator);
    yield takeEvery(UPDATE_PURCHASE_INVOICE, udpatePurchaseInvoiceGenerator);
    yield takeEvery(DELETE_PURCHASE_INVOICE, deletePurchaseInvoiceGenerator);
}

export default PurchaseInvoice;
