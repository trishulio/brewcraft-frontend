import {
    FETCH_BATCHES_REQUEST,
    FETCH_BATCHES_SUCCESS,
    FETCH_BATCHES_FAILURE,
    FETCH_ALL_BATCHES_REQUEST,
    FETCH_ALL_BATCHES_SUCCESS,
    FETCH_ALL_BATCHES_FAILURE
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchAllCategoriesGenerator() {
    try {
        let res = yield call(api.fetchBatches);
        yield put({ type: FETCH_ALL_BATCHES_SUCCESS, data: { data: res.data }});
    } catch (e) {
        yield put({ type: FETCH_ALL_BATCHES_FAILURE });
        yield put(snackFailure(e.message));
    }
}

function* fetchBatchesGenerator(action) {
    try {
        const res = yield call(api.fetchBatches, get(action, "payload.params"));
        yield put({ type: FETCH_BATCHES_SUCCESS, data: { data: res.data }});
    } catch (e) {
        yield put({ type: FETCH_BATCHES_FAILURE });
        yield put(snackFailure(e.message));
    }
}

function* Batches() {
    yield takeEvery(FETCH_BATCHES_REQUEST, fetchBatchesGenerator);
    yield takeEvery(FETCH_ALL_BATCHES_REQUEST, fetchAllCategoriesGenerator);
}

export default Batches;