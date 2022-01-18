import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "lodash";
import {
    FETCH_MINI_CARD_BREWS_MIXTURES_FAILURE,
    FETCH_MINI_CARD_BREWS_MIXTURES_REQUEST,
    FETCH_MINI_CARD_BREWS_MIXTURES_SUCCESS,
    FETCH_MINI_CARD_FINISHED_GOODS_FAILURE,
    FETCH_MINI_CARD_FINISHED_GOODS_SUCCESS,
    FETCH_MINI_CARD_FINISHED_GOODS_REQUEST,
} from "./actionTypes";
import { api } from "./api";

function* fetchMiniCardBrewsMixturesGenerator(action) {
    try {
        const res = yield call(
            api.fetchBrewsMixtures,
            get(action, "payload.params")
        );
        yield put({
            type: FETCH_MINI_CARD_BREWS_MIXTURES_SUCCESS,
            payload: {
                brewsMixtures: res.data.content,
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_MINI_CARD_BREWS_MIXTURES_FAILURE,
            payload: {
                brewsMixtures: [],
            },
        });
    }
}

function* fetchMiniCardFinishedGoodsGenerator(action) {
    try {
        const res = yield call(
            api.fetchFinishedGoods,
            get(action, "payload.params")
        );
        yield put({
            type: FETCH_MINI_CARD_FINISHED_GOODS_SUCCESS,
            payload: {
                finishedGoods: res.data.content,
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_MINI_CARD_FINISHED_GOODS_FAILURE,
            payload: {
                finishedGoods: [],
            },
        });
    }
}

function* MiniCards() {
    yield takeEvery(
        FETCH_MINI_CARD_BREWS_MIXTURES_REQUEST,
        fetchMiniCardBrewsMixturesGenerator
    );
    yield takeEvery(
        FETCH_MINI_CARD_FINISHED_GOODS_REQUEST,
        fetchMiniCardFinishedGoodsGenerator
    );
}

export default MiniCards;
