import {
    FETCH_MEASURE_REQUEST,
    FETCH_MEASURE_SUCCESS,
    FETCH_MEASURE_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchStatusesGenerator(action) {
    try {
        const res = yield call(
            api.fetchMeasures,
            get(action, "payload.params")
        );
        yield put({ type: FETCH_MEASURE_SUCCESS, data: { data: res.data } });
    } catch (e) {
        yield put({ type: FETCH_MEASURE_FAILURE });
        yield put(snackFailure(e.message));
    }
}

function* Measures() {
    yield takeEvery(FETCH_MEASURE_REQUEST, fetchStatusesGenerator);
}

export default Measures;
