import {
    SET_PURCHASE_INVOICE_DETAILS,
    FETCH_PURCHASE_INVOICE,
    CREATE_PURCHASE_INVOICE,
    UPDATE_PURCHASE_INVOICE,
    DELETE_PURCHASE_INVOICE,
    INVALID_PURCHASE_INVOICE_SUPPLIER,
    INVALID_PURCHASE_INVOICE_GENERATED_ON,
    SET_PURCHASE_INVOICE_DUE_DATE,
    INVALID_PURCHASE_INVOICE_INVOICE_NUMBER,
    SET_PURCHASE_INVOICE_SUPPLIER,
    INVALID_PURCHASE_INVOICE_PAYMENT_DUE_DATE,
    SET_PURCHASE_INVOICE_INVOICE_NUMBER,
    SET_PURCHASE_INVOICE_INVOICE_DATE,
    SET_PURCHASE_INVOICE_ERROR
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get, find } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../Brewery/actions";
import { setPurchaseInvoiceError } from "./actions";

function validId(id) {
    return id
        && ((Number.isInteger(id) && id > 0)
            || (typeof id === "string" && id.trim().length > 0));
}

function validInvoiceNumber(invoiceNumber) {
    return invoiceNumber && invoiceNumber.trim().length > 0;
}

function validDate(date) {
    return !(!date || isNaN(Date.parse(date)));
}

function validInvoice(invoice) {
    return validId(invoice.purchaseOrder.supplierId)
        && validInvoiceNumber(invoice.invoiceNumber)
        && validDate(invoice.generatedOn)
        && (!invoice.paymentDueDate || validDate(invoice.paymentDueDate));
}

function* validatePurchaseInvoiceSupplierGenerator(action) {
    yield put({
        type: INVALID_PURCHASE_INVOICE_SUPPLIER,
        payload: { invalidSupplier: !validId(get(action, "payload.supplier.id")) }
    });
}

function* validatePurchaseInvoiceInvoiceNumberGenerator(action) {
    yield put({ type:
        INVALID_PURCHASE_INVOICE_INVOICE_NUMBER,
        payload: { invalidInvoiceNumber: !validInvoiceNumber(get(action, "payload.invoiceNumber")) }
    });
}

function* validatePurchaseInvoiceGeneratedOnGenerator(action) {
    yield put({
        type: INVALID_PURCHASE_INVOICE_GENERATED_ON,
        payload: { invalidGeneratedOn: !validDate(get(action, "payload.generatedOn")) }
    });
}

function* validatePurchaseInvoicePaymentDateDueGenerator(action) {
    yield put({
        type: INVALID_PURCHASE_INVOICE_PAYMENT_DUE_DATE,
        payload: { invalidPaymentDueDate: !validDate(get(action, "payload.paymentDueDate")) }
    });
}


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
    try {
        if (!validInvoice(get(action, "payload.form[0]"))) {
            yield put({
                type: SET_PURCHASE_INVOICE_ERROR,
                payload: {
                    invalidInvoiceNumber: !validInvoiceNumber(get(action, "payload.form[0].invoiceNumber")),
                    invalidSupplier: !validId(get(action, "payload.form[0].purchaseOrder.supplierId")),
                    invalidGeneratedOn: !validDate(get(action, "payload.form[0].generatedOn")),
                    invalidPaymentDueDate: !validDate(get(action, "payload.form[0].paymentDueDate")),
                    error: true
                }
            });
        } else {
            let res;
            res = yield call(api.postProcurements, get(action, "payload.form"));
            const data = {
                ...res.data[0],
                items: res.data[0].procurementItems
            }
            delete data.procurementItems;
            yield put({ type: SET_PURCHASE_INVOICE_DETAILS, payload: { data: data, initial: data } });
            yield put(setGlobalRedirect({ pathname: "/purchases/invoices/" + res.data.id }));
        }
    } catch (e) {
        yield put({ type: SET_PURCHASE_INVOICE_ERROR, payload: { error: true }});
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
    yield takeEvery(SET_PURCHASE_INVOICE_SUPPLIER, validatePurchaseInvoiceSupplierGenerator);
    yield takeEvery(SET_PURCHASE_INVOICE_INVOICE_NUMBER, validatePurchaseInvoiceInvoiceNumberGenerator);
    yield takeEvery(SET_PURCHASE_INVOICE_INVOICE_DATE, validatePurchaseInvoiceGeneratedOnGenerator);
    yield takeEvery(SET_PURCHASE_INVOICE_DUE_DATE, validatePurchaseInvoicePaymentDateDueGenerator);
}

export default PurchaseInvoice;
