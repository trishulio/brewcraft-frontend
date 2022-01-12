import {
    FETCH_MEASURES_REQUEST,
    FETCH_MEASURES_SUCCESS,
    FETCH_MEASURES_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { snackFailure } from "../Snackbar/actions";

function* fetchMeasures(action) {
    try {
        const res = yield call(api.fetchMeasures, {});
        yield put({
            type: FETCH_MEASURES_SUCCESS,
            payload: { data: res.data.content },
        });
        if (action?.payload?.success) {
            yield call(action.payload.success);
        }
    } catch (e) {
        yield put({ type: FETCH_MEASURES_FAILURE });
        yield put(snackFailure(e.message));
    }
}

function* Measures() {
    yield takeEvery(FETCH_MEASURES_REQUEST, fetchMeasures);
}

export default Measures;
