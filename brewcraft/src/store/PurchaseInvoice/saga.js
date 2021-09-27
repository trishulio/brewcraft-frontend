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
import { createShipment } from "../Shipments/actions";
import { setGlobalRedirect } from "../Brewery/actions";

function* fetchPurchaseInvoiceByIdGenerator(action) {
    try {
        const res = yield call(api.fetchPurchaseInvoiceById, get(action, "payload"));
        res.data.generatedOn = res.data.generatedOn?.split("T")[0];
        res.data.paymentDueDate = res.data.paymentDueDate?.split("T")[0];
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_PURCHASE_INVOICE_DETAILS, payload: { ...res } });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* createPurchaseInvoiceGenerator(action) {
    let res;
    try {
        res = yield call(api.postPurchaseInvoice, get(action, "payload.form"));
        res.data = {
            ...res.data.invoice,
            purchaseOrder: {
                ...res.data.purchaseOrder
            }
        };
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_PURCHASE_INVOICE_DETAILS, payload: { ...res } });
        yield put(setGlobalRedirect({ pathname: "/purchases/invoices/" + res.data.id }));
        yield put(snackSuccess(`Created purchase invoice ${get(action, "payload.form.invoiceNumber")}.`));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
        return;
    }
    const data = {
        form: {
            shipmentNumber: "hi",
            statusId: 1, // delivered
            deliveredDate: res.data.generatedOn,
            lots: []
        }
    };
    res.data.items.forEach(item => {
        data.form.lots.push({
            // lotNumber:
            invoiceItemId: item.id,
            quantity: {
                ...item.quantity
            }
        });
    });
    yield put(createShipment(data));
}

function* udpatePurchaseInvoiceGenerator(action) {
    try {
        const res = yield call(api.putPurchaseInvoice, get(action, "payload.id"), get(action, "payload.form"));
        res.data.generatedOn = res.data.generatedOn?.split("T")[0];
        res.data.paymentDueDate = res.data.paymentDueDate?.split("T")[0];
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_PURCHASE_INVOICE_DETAILS, payload: { ...res } });
        yield put(setGlobalRedirect({ pathname: "/purchases/invoices/" + res.data.id }));
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
