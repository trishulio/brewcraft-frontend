import { FETCH_MEASURES, SET_MEASURES } from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { snackFailure } from "../Snackbar/actions";

function* fetchMeasures(action) {
    try {
        const res = yield call(api.fetchMeasures, {});
        yield put({
            type: SET_MEASURES,
            payload: { data: res.data.content },
        });
        if (action?.payload?.success) {
            yield call(action.payload.success);
        }
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* Measures() {
    yield takeEvery(FETCH_MEASURES, fetchMeasures);
}

export default Measures;
