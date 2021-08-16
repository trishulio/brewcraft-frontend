import {
    SET_FINISHED_GOODS,
    SET_ALL_FINISHED_GOODS,
    FETCH_FINISHED_GOODS,
    FETCH_ALL_FINISHED_GOODS
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchAllFinishedGoods(action) {
    try {
        const res = yield call(api.fetchFinishedGoods, {});
        yield put({ type: SET_ALL_FINISHED_GOODS, payload: { data: res.data.content }});
        if (action.payload?.success) {
            yield call(action.payload.success);
        }
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchFinishedGoods(action) {
    try {
        const res = yield call(api.fetchFinishedGoods, get(action, "payload"));
        yield put({ type: SET_FINISHED_GOODS, payload: { ...res.data }});
        if (action.payload?.success) {
            yield call(action.payload.success);
        }
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* FinishedGoods() {
    yield takeEvery(FETCH_ALL_FINISHED_GOODS, fetchAllFinishedGoods);
    yield takeEvery(FETCH_FINISHED_GOODS, fetchFinishedGoods);
}

export default FinishedGoods;
