import {
    FETCH_SUPPLIER_BY_ID_REQUEST,
    SET_SUPPLIER_DETAILS,
    ADD_SUPPLIER_REQUEST,
    ADD_SUPPLIER_SUCCESS,
    EDIT_SUPPLIER_REQUEST,
    DELETE_SUPPLIER_REQUEST,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { setGlobalRedirect } from "../Brewery/actions";
import { snackSuccess } from "../Snackbar/actions";

function* fetchSupplierByIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchSupplierById,
            get(action, "payload.id")
        );
        yield put({
            type: SET_SUPPLIER_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
        yield put({ type: SET_SUPPLIER_DETAILS, payload: { error: true } });
    } catch (e) {
        yield put({ type: SET_SUPPLIER_DETAILS, payload: { error: true } });
    }
}

function* addSupplierGenerator(action) {
    try {
        const res = yield call(api.addSupplier, get(action, "payload.form"));
        yield put({
            type: ADD_SUPPLIER_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
        yield put(setGlobalRedirect({ pathname: "/suppliers/" + res.data.id }));
        yield put(snackSuccess("Supplier saved!"));
    } catch (e) {
        yield put({ type: SET_SUPPLIER_DETAILS, payload: { error: true } });
    }
}

function* editSupplierGenerator(action) {
    try {
        const res = yield call(
            api.updateSupplier,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: SET_SUPPLIER_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
        yield put(snackSuccess("Supplier saved!"));
    } catch (e) {
        yield put({ type: SET_SUPPLIER_DETAILS, payload: { error: true } });
    }
}

function* deleteSupplierGenerator(action) {
    try {
        yield call(api.deleteSupplier, get(action, "payload.id"));
        yield put(setGlobalRedirect({ pathname: "/suppliers" }));
    } catch (e) {
        yield put({ type: SET_SUPPLIER_DETAILS, payload: { error: true } });
    }
}

function* Supplier() {
    yield takeEvery(FETCH_SUPPLIER_BY_ID_REQUEST, fetchSupplierByIdGenerator);
    yield takeEvery(ADD_SUPPLIER_REQUEST, addSupplierGenerator);
    yield takeEvery(EDIT_SUPPLIER_REQUEST, editSupplierGenerator);
    yield takeEvery(DELETE_SUPPLIER_REQUEST, deleteSupplierGenerator);
}

export default Supplier;
