import { get } from "lodash";
import { call, put, select, takeEvery } from "redux-saga/effects";
import {
    FETCH_BREW_FINISHED_GOODS_REQUEST,
    FETCH_BREW_FINISHED_GOODS_SUCCESS,
    FETCH_BREW_FINISHED_GOODS_FAILURE,
    EDIT_BREW_FINISHED_GOODS_REQUEST,
    DELETE_BREW_FINISHED_GOODS_REQUEST,
    EDIT_BREW_FINISHED_GOODS_SUCCESS,
    EDIT_BREW_FINISHED_GOODS_FAILURE,
    DELETE_BREW_FINISHED_GOODS_SUCCESS,
    DELETE_BREW_FINISHED_GOODS_FAILURE,
} from "./actionTypes";
import { api } from "./api";

function* fetchBrewFinishedGoodsGenerator(action) {
    try {
        const res = yield call(
            api.fetchBrewFinishedGoods,
            get(action, "payload")
        );
        yield put({
            type: FETCH_BREW_FINISHED_GOODS_SUCCESS,
            payload: {
                content: [...res.data.content],
                initial: [...res.data.content],
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_BREW_FINISHED_GOODS_FAILURE,
            payload: {},
        });
    }
}

function* editBrewFinishedGoodGenerator(action) {
    try {
        const finishedGoods = yield select(
            (state) => state.Batch.BrewFinishedGoods.content
        );
        const res = yield call(
            api.updateFinishedGood,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        // insert stage from response
        const data = [...finishedGoods];
        const index = finishedGoods.findIndex((s) => s.id === res.data.id);
        data.splice(index, 1);
        data.splice(index, 0, res.data);
        yield put({
            type: EDIT_BREW_FINISHED_GOODS_SUCCESS,
            payload: { content: data, initial: data },
        });
    } catch (e) {
        yield put({ type: EDIT_BREW_FINISHED_GOODS_FAILURE });
    }
}

function* deleteBrewFinishedGoodGenerator(action) {
    try {
        yield call(
            api.deleteFinishedGood,
            get(action, "payload.finishedGoods")
        );
        yield put({
            type: DELETE_BREW_FINISHED_GOODS_SUCCESS,
            payload: get(action, "payload"),
        });
    } catch (e) {
        yield put({ type: DELETE_BREW_FINISHED_GOODS_FAILURE });
    }
}

function* FinishedGood() {
    yield takeEvery(
        FETCH_BREW_FINISHED_GOODS_REQUEST,
        fetchBrewFinishedGoodsGenerator
    );
    yield takeEvery(
        EDIT_BREW_FINISHED_GOODS_REQUEST,
        editBrewFinishedGoodGenerator
    );
    yield takeEvery(
        DELETE_BREW_FINISHED_GOODS_REQUEST,
        deleteBrewFinishedGoodGenerator
    );
}

export default FinishedGood;
