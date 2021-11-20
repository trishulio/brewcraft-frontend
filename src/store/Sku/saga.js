import {
    SET_SKU_DETAILS,
    FETCH_SKU,
    CREATE_SKU,
    UPDATE_SKU,
    DELETE_SKU
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../Brewery/actions";

function* fetchSkuByIdGenerator(action) {
    try {
        const res = yield call(api.fetchSkuById, get(action, "payload.id"));
        yield put({ type: SET_SKU_DETAILS, payload: { data: res.data, initial: res.data }});
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* createSkuGenerator(action) {
    try {
        const res = yield call(api.postSku, get(action, "payload.form"));
        yield put({ type: SET_SKU_DETAILS, payload: { data: res.data, initial: res.data } });
        yield put(setGlobalRedirect({ pathname: "/sku/" + res.data.id, search: "" }));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* udpateSkuGenerator(action) {
    try {
        const res = yield call(api.patchSku, get(action, "payload.id"), get(action, "payload.form"));
        yield put({ type: SET_SKU_DETAILS, payload: { data: res.data, initial: res.data } });
        yield put(setGlobalRedirect({ pathname: "/sku/" + res.data.id, search: "" }));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* deleteSkuGenerator(action) {
    try {
        yield call(api.deleteSku, get(action, "payload.id"));
        yield put(setGlobalRedirect({ pathname: "/sku" }));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* Sku() {
    yield takeEvery(CREATE_SKU, createSkuGenerator);
    yield takeEvery(FETCH_SKU, fetchSkuByIdGenerator);
    yield takeEvery(UPDATE_SKU, udpateSkuGenerator);
    yield takeEvery(DELETE_SKU, deleteSkuGenerator);
}

export default Sku;
