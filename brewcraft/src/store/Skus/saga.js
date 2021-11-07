import {
    FETCH_SKUS,
    FETCH_ALL_SKUS,
    SET_SKUS
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchSkusGenerator(action) {
    try {
        const res = yield call(api.fetchSkus, get(action, "payload"));
        yield put({ type: SET_SKUS, payload: { ...res.data } });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchAllSkusGenerator() {
    try {
        const res = yield call(api.fetchSkus, {});
        yield put({ type: SET_SKUS, payload: { all: [ ...res.data.content ] }});
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* Skus() {
    yield takeEvery(FETCH_SKUS, fetchSkusGenerator);
    yield takeEvery(FETCH_ALL_SKUS, fetchAllSkusGenerator);
}

export default Skus;