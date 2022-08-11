import {
    FETCH_QUANTITY_UNITS_REQUEST,
    FETCH_QUANTITY_UNITS_SUCCESS,
    FETCH_QUANTITY_UNITS_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";

function* fetchAllQuantityUnits() {
    try {
        const res = yield call(api.fetchQuantityUnits, {});
        yield put({
            type: FETCH_QUANTITY_UNITS_SUCCESS,
            payload: { data: res.data.content },
        });
    } catch (e) {
        yield put({
            type: FETCH_QUANTITY_UNITS_FAILURE,
            payload: { error: true },
        });
    }
}

function* QuantityUnits() {
    yield takeEvery(FETCH_QUANTITY_UNITS_REQUEST, fetchAllQuantityUnits);
}

export default QuantityUnits;
