import {
    FETCH_PURCHASE_INVOICES_REQUEST,
    FETCH_PURCHASE_INVOICES_SUCCESS,
    FETCH_PURCHASE_INVOICES_FAILURE,
    FETCH_ALL_PURCHASE_INVOICES_REQUEST,
    FETCH_ALL_PURCHASE_INVOICES_SUCCESS,
    FETCH_ALL_PURCHASE_INVOICES_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { ALL } from "../../helpers/constants";
import { snackFailure, snackSuccess } from "../Snackbar/actions";

function* fetchAllPurchaseInvoicesGenerator() {
    try {
        let res = yield call(api.fetchPurchaseInvoices, ALL);
        yield put({ type: FETCH_ALL_PURCHASE_INVOICES_SUCCESS, data: { data: res.data }});
    } catch (e) {
        yield put({ type: FETCH_ALL_PURCHASE_INVOICES_FAILURE });
    }
}

function* fetchPurchaseInvoicesGenerator(action) {
    try {
      const res = yield call(api.fetchPurchaseInvoices,get(action, "payload.params"));
      yield put({ type: FETCH_PURCHASE_INVOICES_SUCCESS, data: { data: res.data }});
    } catch (e) {
      yield put({ type: FETCH_PURCHASE_INVOICES_FAILURE });
    }
  }

function* PurchaseInvoices() {
    yield takeEvery(FETCH_PURCHASE_INVOICES_REQUEST, fetchPurchaseInvoicesGenerator);
    yield takeEvery(FETCH_ALL_PURCHASE_INVOICES_REQUEST, fetchAllPurchaseInvoicesGenerator);
}

export default PurchaseInvoices;