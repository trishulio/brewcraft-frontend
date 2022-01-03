import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "lodash";
import {
    SET_FERMENT_FINISHED_GOODS,
    SET_CONDITION_FINISHED_GOODS,
    SET_BRITE_TANK_FINISHED_GOODS,
    FETCH_FINISHED_GOODS,
    SAVE_FERMENT_FINISHED_GOODS,
    FETCH_FERMENT_FINISHED_GOODS,
} from "./actionTypes";
import { api } from "./api";
import { snackFailure } from "../Snackbar/actions";

function* fetchFinishedGoods(action) {
    try {
        const res = yield call(
            api.fetchFinishedGoods,
            get(action, "payload.params")
        );
        yield put({
            type: SET_FERMENT_FINISHED_GOODS,
            payload: { content: res.data.content, initial: res.data.content },
        });
        yield put({
            type: SET_CONDITION_FINISHED_GOODS,
            payload: { content: res.data.content, initial: res.data.content },
        });
        yield put({
            type: SET_BRITE_TANK_FINISHED_GOODS,
            payload: { content: res.data.content, initial: res.data.content },
        });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchFermentFinishedGoods(action) {
    try {
        const res = yield call(api.fetchFinishedGoods, get(action, "payload"));
        yield put({
            type: SET_FERMENT_FINISHED_GOODS,
            payload: { content: res.data.content, initial: res.data.content },
        });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* saveFermentFinishedGoods(action) {
    try {
        yield call(api.postFinishedGoods, get(action, "payload.form"));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* FinishedGoods() {
    yield takeEvery(FETCH_FINISHED_GOODS, fetchFinishedGoods);
    yield takeEvery(FETCH_FERMENT_FINISHED_GOODS, fetchFermentFinishedGoods);
    yield takeEvery(SAVE_FERMENT_FINISHED_GOODS, saveFermentFinishedGoods);
}

export default FinishedGoods;
