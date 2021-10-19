import {
    FETCH_INVENTORY_PROCUREMENTS_QUANTITY_REQUEST,
    FETCH_INVENTORY_STOCK_QUANTITY_REQUEST,
    SET_INVENTORY_PROCUREMENTS_QUANTITY_DETAILS,
    SET_INVENTORY_STOCK_QUANTITY_DETAILS
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";
import { api } from "./api";

function* fetchProcurementsQuantity(action) {
    try {
        const res = yield call(api.fetchProcurementsQuantity, get(action, "payload.params"));
        yield put({ type: SET_INVENTORY_PROCUREMENTS_QUANTITY_DETAILS, payload: res.data.content });
    } catch (e) {
        console.log(e);
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchStockQuantity(action) {
    try {
        const res = yield call(api.fetchStockQuantity, get(action, "payload.params"));
        yield put({ type: SET_INVENTORY_STOCK_QUANTITY_DETAILS, payload: res.data.content });
    } catch (e) {
        console.log(e);
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* MaterialLots() {
    yield takeEvery(FETCH_INVENTORY_PROCUREMENTS_QUANTITY_REQUEST, fetchProcurementsQuantity);
    yield takeEvery(FETCH_INVENTORY_STOCK_QUANTITY_REQUEST, fetchStockQuantity);
}

export default MaterialLots;
