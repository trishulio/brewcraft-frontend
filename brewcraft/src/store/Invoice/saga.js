import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  FETCH_INVOICES_REQUEST,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
  ADD_INVOICE_REQUEST,
  ADD_INVOICE_SUCCESS,
  ADD_INVOICE_FAILURE,
  EDIT_INVOICE_REQUEST,
  EDIT_INVOICE_SUCCESS,
  EDIT_INVOICE_FAILURE,
  DELETE_INVOICE_REQUEST,
  DELETE_INVOICE_SUCCESS,
  FETCH_INVOICE_BY_ID_REQUEST,
  FETCH_INVOICE_BY_ID_SUCCESS,
  FETCH_INVOICE_BY_ID_FAILURE,
  DELETE_INVOICE_FAILURE,
} from "./actionTypes";
import { get } from "lodash";
import {api} from './api'
import { snackFailure, snackSuccess } from "../Snackbar/actions";
function* fetchInvoicesGenerator() {
  try {
    let data = yield call(api.fetchInvoices);

    yield put({ type: FETCH_INVOICES_SUCCESS, data: data.data });
  } catch (e) {
    yield put({ type: FETCH_INVOICES_FAILURE });
  }
}
function* fetchInvoiceByIdGenerator() {
  try {
    let data = yield call(api.fetchInvoiceById);
    yield put({ type: FETCH_INVOICE_BY_ID_SUCCESS, data: data.data });
  } catch (e) {
    yield put({ type: FETCH_INVOICE_BY_ID_FAILURE });
  }
}
function* addInvoiceGenerator(action) {
  try {
    let res = yield call(api.addInvoice, get(action, "payload.form"));
    yield put({ type: ADD_INVOICE_SUCCESS, data: res });
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: ADD_INVOICE_FAILURE });
    yield put(snackFailure());
  }
}

function* editInvoiceGenerator(action) {
  try {
    let res = yield call(
      api.updateInvoice,
      get(action, "payload.id"),
      get(action, "payload.form")
    );
    yield put({ type: EDIT_INVOICE_SUCCESS, data: res });
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: EDIT_INVOICE_FAILURE });
    yield put(snackFailure());
  }
}
function* deleteInvoiceGenerator(action) {
  try {
    let res = yield call(api.deleteInvoice, get(action, "payload.id"));
    yield put({ type: DELETE_INVOICE_SUCCESS, data: res });
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: DELETE_INVOICE_FAILURE });
    yield put(snackFailure());
  }
}
export default function* Invoice() {
  yield takeEvery(FETCH_INVOICES_REQUEST, fetchInvoicesGenerator);
  yield takeEvery(FETCH_INVOICE_BY_ID_REQUEST, fetchInvoiceByIdGenerator);
  yield takeEvery(ADD_INVOICE_REQUEST, addInvoiceGenerator);
  yield takeEvery(EDIT_INVOICE_REQUEST, editInvoiceGenerator);
  yield takeEvery(DELETE_INVOICE_REQUEST, deleteInvoiceGenerator);
}
