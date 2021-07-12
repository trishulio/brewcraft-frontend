import {
    SET_BATCH_DETAILS,
    FETCH_BATCH,
    CREATE_BATCH,
    UPDATE_BATCH,
    DELETE_BATCH
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";

function* fetchBatchByIdGenerator(action) {
    try {
        const res = yield call(api.fetchBatchById, get(action, "payload.id"));
        yield put({ type: SET_BATCH_DETAILS, payload: res });
        yield call(action.payload.success);
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}
function* createBatchGenerator(action) {
    try {
        const res = yield call(api.postBatch, get(action, "payload.form"));
        yield put(snackSuccess(`Created batch ${res.data.title}.`));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* udpateBatchGenerator(action) {
    try {
        const res = yield call(api.patchBatch, get(action, "payload.id"), get(action, "payload.form"));
        yield put(snackSuccess(`Updated batch ${res.data.title}.`));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* deleteBatchGenerator(action) {
    try {
        const res = yield call(api.deleteBatch, get(action, "payload.form"));
        yield put(snackSuccess(`Deleted batch ${res.data.title}.`));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* Batch() {
    yield takeEvery(CREATE_BATCH, createBatchGenerator);
    yield takeEvery(FETCH_BATCH, fetchBatchByIdGenerator);
    yield takeEvery(UPDATE_BATCH, udpateBatchGenerator);
    yield takeEvery(DELETE_BATCH, deleteBatchGenerator);
}

export default Batch;
