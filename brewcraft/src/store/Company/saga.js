import {
    FETCH_COMPANY_BY_ID_REQUEST,
    SET_COMPANY_DETAILS,
    ADD_COMPANY_REQUEST,
    ADD_COMPANY_SUCCESS,
    ADD_COMPANY_FAILURE,
    EDIT_COMPANY_REQUEST,
    DELETE_COMPANY_REQUEST,
    EDIT_COMPANY_SUCCESS,
    DELETE_COMPANY_SUCCESS,
    EDIT_COMPANY_FAILURE,
    DELETE_COMPANY_FAILURE
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

function* fetchCompanyByIdGenerator(action) {
    try {
        const res = yield call(api.fetchCompanyById,get(action, "payload.id"));
        formatAddress(res.data);
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_COMPANY_DETAILS, payload: { data: res.data, initial: res.data }});
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* addCompanyGenerator(action) {
    try {
        const res = yield call(api.addCompany, get(action, "payload.form"));
        formatAddress(res.data);
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: ADD_COMPANY_SUCCESS, payload: { data: res.data, initial: res.data }});
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: ADD_COMPANY_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editCompanyGenerator(action) {
    try {
        const res = yield call(api.updateCompany, get(action, "payload.id"), get(action, "payload.form"));
        formatAddress(res.data);
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: EDIT_COMPANY_SUCCESS, payload: { data: res.data, initial: res.data }});
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_COMPANY_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* deleteCompanyGenerator(action) {
    try {
        yield call(api.deleteCompany, get(action, "payload.id"));
        if (action.payload.success) {
            yield call(action.payload.success);
        }
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_COMPANY_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* Company() {
    yield takeEvery(FETCH_COMPANY_BY_ID_REQUEST, fetchCompanyByIdGenerator);
    yield takeEvery(ADD_COMPANY_REQUEST, addCompanyGenerator);
    yield takeEvery(EDIT_COMPANY_REQUEST, editCompanyGenerator);
    yield takeEvery(DELETE_COMPANY_REQUEST, deleteCompanyGenerator);
}

export default Company;