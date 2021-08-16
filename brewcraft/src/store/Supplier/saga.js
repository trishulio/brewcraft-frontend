import {
    FETCH_SUPPLIER_BY_ID_REQUEST,
    SET_SUPPLIER_DETAILS,
    ADD_SUPPLIER_REQUEST,
    ADD_SUPPLIER_SUCCESS,
    ADD_SUPPLIER_FAILURE,
    EDIT_SUPPLIER_REQUEST,
    DELETE_SUPPLIER_REQUEST,
    EDIT_SUPPLIER_SUCCESS,
    EDIT_SUPPLIER_FAILURE,
    DELETE_SUPPLIER_FAILURE
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";

function formatAddress(data) {
    data.addressId = data.address?.id || "";
    data.addressLine1 = data.address?.addressLine1 || "";
    data.addressLine2 = data.address?.addressLine2 || "";
    data.city = data.address?.city || "";
    data.province = data.address?.province || "";
    data.postalCode = data.address?.postalCode || "";
    data.country = data.address?.country || "";
    delete data.address;
}

function* fetchSupplierByIdGenerator(action) {
    try {
        const res = yield call(api.fetchSupplierById,get(action, "payload.id"));
        formatAddress(res.data);
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_SUPPLIER_DETAILS, payload: { data: res.data, initial: res.data }});
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* addSupplierGenerator(action) {
    try {
        const res = yield call(api.addSupplier, get(action, "payload.form"));
        formatAddress(res.data);
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: ADD_SUPPLIER_SUCCESS, payload: { data: res.data, initial: res.data }});
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: ADD_SUPPLIER_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editSupplierGenerator(action) {
    try {
        const res = yield call(api.updateSupplier, get(action, "payload.id"), get(action, "payload.form"));
        formatAddress(res.data);
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: EDIT_SUPPLIER_SUCCESS, payload: { data: res.data, initial: res.data }});
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_SUPPLIER_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
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
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* Supplier() {
    yield takeEvery(FETCH_SUPPLIER_BY_ID_REQUEST, fetchSupplierByIdGenerator);
    yield takeEvery(ADD_SUPPLIER_REQUEST, addSupplierGenerator);
    yield takeEvery(EDIT_SUPPLIER_REQUEST, editSupplierGenerator);
    yield takeEvery(DELETE_SUPPLIER_REQUEST, deleteSupplierGenerator);
}

export default Supplier;