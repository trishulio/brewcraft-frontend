import { call, put, takeEvery, select, race, take } from "redux-saga/effects";
import { get } from "lodash";
import {
    FETCH_FINISHED_GOODS,
    DELETE_FINISHED_GOODS,
    FETCH_FINISHED_GOODS_BY_BREW_ID_SUCCESS,
    FETCH_FINISHED_GOODS_BY_BREW_ID_FAILURE,
    FETCH_FINISHED_GOODS_SUCCESS,
    FETCH_FINISHED_GOODS_FAILURE,
    FETCH_FINISHED_GOODS_REQUEST,
    FETCH_FINISHED_GOODS_BY_BREW_ID_REQUEST,
    SAVE_FINISHED_GOODS_SUCCESS,
    SAVE_FINISHED_GOODS_FAILURE,
    DELETE_FINISHED_GOODS_SUCCESS,
    DELETE_FINISHED_GOODS_FAILURE,
    DELETE_FINISHED_GOODS_REQUEST,
    SAVE_FINISHED_GOODS_REQUEST,
} from "./actionTypes";
import { api } from "./api";
import { fetchFinishedGoodsByBrewId } from "./actions";

function* fetchFinishedGoodsByBrewIdGenerator(action) {
    try {
        const res = yield call(api.fetchFinishedGoods, get(action, "payload"));
        yield put({
            type: FETCH_FINISHED_GOODS_BY_BREW_ID_SUCCESS,
            payload: {
                content: JSON.parse(JSON.stringify(res.data.content)),
                initial: JSON.parse(JSON.stringify(res.data.content)),
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_FINISHED_GOODS_BY_BREW_ID_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* fetchFinishedGoodsGenerator(action) {
    try {
        const res = yield call(api.fetchFinishedGoods, get(action, "payload"));
        yield put({
            type: FETCH_FINISHED_GOODS_SUCCESS,
            payload: {
                content: JSON.parse(JSON.stringify(res.data.content)),
                initial: JSON.parse(JSON.stringify(res.data.content)),
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_FINISHED_GOODS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* saveFinishedGoodsGenerator(action) {
    try {
        const batch = yield select((state) => state.Batch.Batch.data);
        yield call(api.updateFinishedGoods, get(action, "payload.form"));
        yield put(
            fetchFinishedGoodsByBrewId({
                brewId: batch.id,
            })
        );
        const [success, failed] = yield race([
            take(FETCH_FINISHED_GOODS_BY_BREW_ID_SUCCESS),
            take(FETCH_FINISHED_GOODS_BY_BREW_ID_FAILURE),
        ]);
        if (success) {
            yield put({
                type: SAVE_FINISHED_GOODS_SUCCESS,
            });
        } else {
            yield put({
                type: SAVE_FINISHED_GOODS_FAILURE,
                payload: get(failed, "payload.error"),
            });
        }
    } catch (e) {
        yield put({
            type: SAVE_FINISHED_GOODS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* deleteFinishedGoodsGenerator(action) {
    try {
        const batch = yield select((state) => state.Batch.Batch.data);
        yield call(api.deleteFinishedGoods, get(action, "payload.form"));
        yield put(
            fetchFinishedGoodsByBrewId({
                brewId: batch.id,
            })
        );
        const [success, failed] = yield race([
            take(FETCH_FINISHED_GOODS_BY_BREW_ID_SUCCESS),
            take(FETCH_FINISHED_GOODS_BY_BREW_ID_FAILURE),
        ]);
        if (success) {
            yield put({
                type: DELETE_FINISHED_GOODS_SUCCESS,
            });
        } else {
            yield put({
                type: DELETE_FINISHED_GOODS_FAILURE,
                payload: get(failed, "payload.error"),
            });
        }
    } catch (e) {
        yield put({
            type: DELETE_FINISHED_GOODS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* FinishedGoods() {
    yield takeEvery(FETCH_FINISHED_GOODS_REQUEST, fetchFinishedGoodsGenerator);
    yield takeEvery(
        FETCH_FINISHED_GOODS_BY_BREW_ID_REQUEST,
        fetchFinishedGoodsByBrewIdGenerator
    );
    yield takeEvery(FETCH_FINISHED_GOODS_REQUEST, fetchFinishedGoodsGenerator);
    yield takeEvery(SAVE_FINISHED_GOODS_REQUEST, saveFinishedGoodsGenerator);
    yield takeEvery(
        DELETE_FINISHED_GOODS_REQUEST,
        deleteFinishedGoodsGenerator
    );
}

export default FinishedGoods;
