import {
    FETCH_MIXTURES_REQUEST,
    FETCH_MIXTURES_SUCCESS,
    FETCH_MIXTURES_ERROR,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";

function* fetchMixturesGenerator(action) {
    try {
        const res = yield call(
            api.fetchMixtures,
            get(action, "payload.params")
        );
        yield put({ type: FETCH_MIXTURES_SUCCESS, data: { data: res.data } });
    } catch (e) {
        yield put({ type: FETCH_MIXTURES_ERROR });
    }
}

function* Mixtures() {
    yield takeEvery(FETCH_MIXTURES_REQUEST, fetchMixturesGenerator);
}

export default Mixtures;
