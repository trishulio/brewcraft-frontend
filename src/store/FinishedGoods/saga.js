import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "lodash";
import {
    SET_FINISHED_GOODS,
    SET_FERMENT_FINISHED_GOODS,
    SET_CONDITION_FINISHED_GOODS,
    SET_BRITE_TANK_FINISHED_GOODS,
    FETCH_FINISHED_GOODS,
    SAVE_FERMENT_FINISHED_GOODS,
    FETCH_FERMENT_FINISHED_GOODS,
    DELETE_FERMENT_FINISHED_GOODS,
    FETCH_FINISHED_GOODS_BY_BREW_ID,
    SAVE_FERMENT_FINISHED_GOODS_ERROR,
    DELETE_FERMENT_FINISHED_GOODS_ERROR,
} from "./actionTypes";
import { api } from "./api";
import { snackFailure } from "../Snackbar/actions";
import { fetchFinishedGoodsByBrewId } from "./actions";

function* fetchFinishedGoodsGenerator(action) {
    try {
        const res = yield call(
            api.fetchFinishedGoods,
            get(action, "payload.params")
        );
        yield put({
            type: SET_FINISHED_GOODS,
            payload: { ...res.data },
        });
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

function* fetchFinishedGoodsByBrewIdGenerator(action) {
    try {
        const res = yield call(api.fetchFinishedGoods, get(action, "payload"));
        let content = res.data.content.filter((fg) => {
            return (
                fg.mixturePortions[0].mixture.brewStage.task.name === "FERMENT"
            );
        });
        yield put({
            type: SET_FERMENT_FINISHED_GOODS,
            payload: {
                content: JSON.parse(JSON.stringify(content)),
                initial: JSON.parse(JSON.stringify(content)),
            },
        });
        content = res.data.content.filter((fg) => {
            return (
                fg.mixturePortions[0].mixture.brewStage.task.name ===
                "CONDITION"
            );
        });
        yield put({
            type: SET_CONDITION_FINISHED_GOODS,
            payload: {
                content: JSON.parse(JSON.stringify(content)),
                initial: JSON.parse(JSON.stringify(content)),
            },
        });
        content = res.data.content.filter((fg) => {
            return (
                fg.mixturePortions[0].mixture.brewStage.task.name === "STORAGE"
            );
        });
        yield put({
            type: SET_BRITE_TANK_FINISHED_GOODS,
            payload: {
                content: JSON.parse(JSON.stringify(content)),
                initial: JSON.parse(JSON.stringify(content)),
            },
        });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchFermentFinishedGoodsGenerator(action) {
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

function* saveFermentFinishedGoodsGenerator(action) {
    try {
        yield call(api.updateFinishedGoods, get(action, "payload.form"));
        yield put(
            fetchFinishedGoodsByBrewId({
                brewId: get(action, "payload.batchId"),
            })
        );
    } catch (e) {
        yield put({
            type: SAVE_FERMENT_FINISHED_GOODS_ERROR,
            payload: { error: true },
        });
    }
}

function* deleteFermentFinishedGoodsGenerator(action) {
    try {
        yield call(api.deleteFinishedGoods, get(action, "payload.form"));
        yield put(
            fetchFinishedGoodsByBrewId({
                brewId: get(action, "payload.batchId"),
            })
        );
    } catch (e) {
        yield put({
            type: DELETE_FERMENT_FINISHED_GOODS_ERROR,
            payload: { error: true },
        });
    }
}

function* FinishedGoods() {
    yield takeEvery(FETCH_FINISHED_GOODS, fetchFinishedGoodsGenerator);
    yield takeEvery(
        FETCH_FINISHED_GOODS_BY_BREW_ID,
        fetchFinishedGoodsByBrewIdGenerator
    );
    yield takeEvery(
        FETCH_FERMENT_FINISHED_GOODS,
        fetchFermentFinishedGoodsGenerator
    );
    yield takeEvery(
        SAVE_FERMENT_FINISHED_GOODS,
        saveFermentFinishedGoodsGenerator
    );
    yield takeEvery(
        DELETE_FERMENT_FINISHED_GOODS,
        deleteFermentFinishedGoodsGenerator
    );
}

export default FinishedGoods;
