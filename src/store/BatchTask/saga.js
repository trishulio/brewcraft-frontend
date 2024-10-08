import {
    FETCH_BATCH_TASK_REQUEST,
    FETCH_BATCH_TASK_SUCCESS,
    FETCH_BATCH_TASK_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchStatusesGenerator(action) {
    try {
        const res = yield call(
            api.fetchBatchTasks,
            get(action, "payload.params")
        );
        yield put({ type: FETCH_BATCH_TASK_SUCCESS, data: { data: res.data } });
    } catch (e) {
        yield put({ type: FETCH_BATCH_TASK_FAILURE });
        yield put(snackFailure(e.message));
    }
}

function* BatchTasks() {
    yield takeEvery(FETCH_BATCH_TASK_REQUEST, fetchStatusesGenerator);
}

export default BatchTasks;
