import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "lodash";
import {
    SET_FINISHED_GOODS,
    SET_FERMENT_FINISHED_GOODS,
    SET_CONDITION_FINISHED_GOODS,
    SET_BRITE_TANK_FINISHED_GOODS,
    FETCH_FINISHED_GOODS,

} from "./actionTypes";
import { api } from "./api";
import { snackFailure } from "../Snackbar/actions";

function* fetchFinishedGoods(action) {
    try {
        const res = yield call(api.fetchFinishedGoods, get(action, "payload.params"));
        yield put({ type: SET_FINISHED_GOODS, payload: { ...res.data }});
        yield put({ type: SET_FERMENT_FINISHED_GOODS, payload: { content: res.data.content, initial: res.data.content }});
        yield put({ type: SET_CONDITION_FINISHED_GOODS, payload: { content: res.data.content, initial: res.data.content }});
        yield put({ type: SET_BRITE_TANK_FINISHED_GOODS, payload: { content: res.data.content, initial: res.data.content }});
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* FinishedGoods() {
    yield takeEvery(FETCH_FINISHED_GOODS, fetchFinishedGoods);
}

export default FinishedGoods;
