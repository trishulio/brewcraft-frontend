import {
    FETCH_FINISHED_GOODS_INVENTORY_REQUEST,
    FETCH_FINISHED_GOODS_INVENTORY_SUCCESS,
    FETCH_FINISHED_GOODS_INVENTORY_ERROR,
    FETCH_ALL_FINISHED_GOODS_INVENTORY_REQUEST,
    FETCH_ALL_FINISHED_GOODS_INVENTORY_SUCCESS,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";

function* fetchAllFinishedGoodsInventoryGenerator() {
    try {
        let res = yield call(api.fetchFinishedGoodsInventory);
        yield put({
            type: FETCH_ALL_FINISHED_GOODS_INVENTORY_SUCCESS,
            data: { data: res.data },
        });
    } catch (e) {
        yield put({ type: FETCH_FINISHED_GOODS_INVENTORY_ERROR });
    }
}

function* fetchFinishedGoodsInventoryGenerator(action) {
    try {
        const res = yield call(
            api.fetchFinishedGoodsInventory,
            get(action, "payload.params")
        );
        yield put({
            type: FETCH_FINISHED_GOODS_INVENTORY_SUCCESS,
            data: { data: res.data },
        });
    } catch (e) {
        yield put({ type: FETCH_FINISHED_GOODS_INVENTORY_ERROR });
    }
}

function* FinishedGoodsInventory() {
    yield takeEvery(
        FETCH_FINISHED_GOODS_INVENTORY_REQUEST,
        fetchFinishedGoodsInventoryGenerator
    );
    yield takeEvery(
        FETCH_ALL_FINISHED_GOODS_INVENTORY_REQUEST,
        fetchAllFinishedGoodsInventoryGenerator
    );
}

export default FinishedGoodsInventory;
