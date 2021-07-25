import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "lodash";
import {
    EDIT_SUPPLIER_REQUEST,
    EDIT_SUPPLIER_SUCCESS,
    EDIT_SUPPLIER_FAILURE,
    DELETE_SUPPLIER_REQUEST,
    DELETE_SUPPLIER_SUCCESS,
    DELETE_SUPPLIER_FAILURE,
    FETCH_SUPPLIER_BY_ID_REQUEST,
    FETCH_SUPPLIER_BY_ID_FAILURE,
    ADD_SUPPLIER_SUCCESS,
    ADD_SUPPLIER_FAILURE,
    ADD_SUPPLIER_REQUEST,
    SET_SUPPLIER_DETAILS
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

function* fetchSupplierByIdGenerator(action) {
    try {
        let res = yield call(api.fetchSupplierById,get(action,"payload.id"));
        formatResponse(res);
        yield put({ type: SET_SUPPLIER_DETAILS, payload: { data: res.data, initial: res.data }});
        action.payload.success && action.payload.success(res.data);
    } catch (e) {
        yield put({ type: FETCH_SUPPLIER_BY_ID_FAILURE });
    }
}

function* addSupplierGenerator(action) {
    try {
        const res = yield call(api.addSupplier, get(action, "payload.supplierId"), get(action, "payload.form"));
        formatResponse(res);
        debugger;
        yield put({ type: ADD_SUPPLIER_SUCCESS, payload: { data: res.data, initial: res.data }});
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: ADD_SUPPLIER_FAILURE });
        yield put(snackFailure());
    }
}

function* editSupplierGenerator(action) {
    try {
        let res = yield call(api.updateSupplier, get(action, "payload.id"), get(action, "payload.companyId"), get(action, "payload.form"));
        formatResponse(res);
        yield put({ type: EDIT_SUPPLIER_SUCCESS, payload: { data: res.data, initial: res.data }});
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_SUPPLIER_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteSupplierGenerator(action) {
    try {
        yield call(api.deleteSupplier, get(action, "payload.id"));
        if (action.payload.success) {
            yield call(action.payload.success);
        }
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_SUPPLIER_FAILURE });
        yield put(snackFailure());
    }
}

function* Supplier() {
    yield takeEvery(
        FETCH_SUPPLIER_BY_ID_REQUEST,
        fetchSupplierByIdGenerator
      );
      yield takeEvery(
        EDIT_SUPPLIER_REQUEST,
        editSupplierGenerator
      );
      yield takeEvery(
        DELETE_SUPPLIER_REQUEST,
        deleteSupplierGenerator
      );

      yield takeEvery(ADD_SUPPLIER_REQUEST, addSupplierGenerator);
}

export default Supplier;