import {
    FETCH_FINISHED_GOODS_INVENTORY_AGGREGATION_REQUEST,
    FETCH_FINISHED_GOODS_INVENTORY_AGGREGATION_SUCCESS,
    FETCH_FINISHED_GOODS_INVENTORY_AGGREGATION_ERROR,
    FETCH_FINISHED_GOODS_INVENTORY_REQUEST,
    FETCH_FINISHED_GOODS_INVENTORY_SUCCESS,
    FETCH_FINISHED_GOODS_INVENTORY_ERROR,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";

function* fetchFinishedGoodsInventoryAggregationGenerator(action) {
    try {
        const res = yield call(
            api.fetchFinishedGoodsInventoryAggregation,
            get(action, "payload.params")
        );
        yield put({
            type: FETCH_FINISHED_GOODS_INVENTORY_AGGREGATION_SUCCESS,
            data: { data: res.data },
        });
    } catch (e) {
        yield put({ type: FETCH_FINISHED_GOODS_INVENTORY_AGGREGATION_ERROR });
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
        FETCH_FINISHED_GOODS_INVENTORY_AGGREGATION_REQUEST,
        fetchFinishedGoodsInventoryAggregationGenerator
    );
    yield takeEvery(
        FETCH_FINISHED_GOODS_INVENTORY_REQUEST,
        fetchFinishedGoodsInventoryGenerator
    );
}

export default FinishedGoodsInventory;
