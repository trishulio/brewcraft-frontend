import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "lodash";
import {
    EDIT_SUPPLIER_CONTACT_REQUEST,
    EDIT_SUPPLIER_CONTACT_SUCCESS,
    EDIT_SUPPLIER_CONTACT_FAILURE,
    DELETE_SUPPLIER_CONTACT_REQUEST,
    DELETE_SUPPLIER_CONTACT_FAILURE,
    FETCH_SUPPLIER_CONTACT_BY_ID_REQUEST,
    FETCH_SUPPLIER_CONTACT_BY_ID_FAILURE,
    ADD_SUPPLIER_CONTACT_SUCCESS,
    ADD_SUPPLIER_CONTACT_FAILURE,
    ADD_SUPPLIER_CONTACT_REQUEST,
    SET_SUPPLIER_CONTACT_DETAILS
} from "./actionTypes";
import { api } from "./api";
import { snackFailure, snackSuccess } from "../Snackbar/actions";

function formatResponse(res) {
    res.initial = JSON.parse(JSON.stringify(res.data));
    if (res.data.supplier) {
        res.data.company = res.data.supplier;
        delete res.data.supplier;
    }
}

function* fetchSupplierContactByIdGenerator(action) {
    try {
        let res = yield call(api.fetchSupplierContactById,get(action,"payload.id"));
        formatResponse(res);
        yield put({ type: SET_SUPPLIER_CONTACT_DETAILS, payload: { data: res.data, initial: res.data }});
        action.payload.success && action.payload.success(res.data);
    } catch (e) {
        yield put({ type: FETCH_SUPPLIER_CONTACT_BY_ID_FAILURE });
    }
}

function* addSupplierContactGenerator(action) {
    try {
        const res = yield call(api.addSupplierContact, get(action, "payload.supplierId"), get(action, "payload.form"));
        formatResponse(res);
        yield put({ type: ADD_SUPPLIER_CONTACT_SUCCESS, payload: { data: res.data, initial: res.data }});
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: ADD_SUPPLIER_CONTACT_FAILURE });
        yield put(snackFailure());
    }
}

function* editSupplierContactGenerator(action) {
    try {
        let res = yield call(api.updateSupplierContact, get(action, "payload.id"), get(action, "payload.supplierId"), get(action, "payload.form"));
        formatResponse(res);
        yield put({ type: EDIT_SUPPLIER_CONTACT_SUCCESS, payload: { data: res.data, initial: res.data }});
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_SUPPLIER_CONTACT_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteSupplierContactGenerator(action) {
    try {
        yield call(api.deleteSupplierContact, get(action, "payload.id"));
        if (action.payload.success) {
            yield call(action.payload.success);
        }
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_SUPPLIER_CONTACT_FAILURE });
        yield put(snackFailure());
    }
}

function* SupplierContact() {
    yield takeEvery(
        FETCH_SUPPLIER_CONTACT_BY_ID_REQUEST,
        fetchSupplierContactByIdGenerator
      );
      yield takeEvery(
        EDIT_SUPPLIER_CONTACT_REQUEST,
        editSupplierContactGenerator
      );
      yield takeEvery(
        DELETE_SUPPLIER_CONTACT_REQUEST,
        deleteSupplierContactGenerator
      );

      yield takeEvery(ADD_SUPPLIER_CONTACT_REQUEST, addSupplierContactGenerator);
}

export default SupplierContact;