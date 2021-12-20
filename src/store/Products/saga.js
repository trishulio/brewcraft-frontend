import {
    FETCH_PRODUCTS,
    FETCH_ALL_PRODUCTS,
    SET_PRODUCTS,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchProductsGenerator(action) {
    try {
        const res = yield call(api.fetchProducts, get(action, "payload"));
        yield put({ type: SET_PRODUCTS, payload: { ...res.data } });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchAllProductsGenerator() {
    try {
        const res = yield call(api.fetchProducts, {});
        yield put({
            type: SET_PRODUCTS,
            payload: { all: [...res.data.content] },
        });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* Products() {
    yield takeEvery(FETCH_PRODUCTS, fetchProductsGenerator);
    yield takeEvery(FETCH_ALL_PRODUCTS, fetchAllProductsGenerator);
}

export default Products;
