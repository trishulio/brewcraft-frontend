import {
    SET_PRODUCT_CATEGORIES,
    SET_ALL_PRODUCT_CATEGORIES,
    FETCH_PRODUCT_CATEGORIES,
    FETCH_ALL_PRODUCT_CATEGORIES
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchAllProductCategories(action) {
    try {
        const res = yield call(api.fetchProductCategories, {});
        yield put({ type: SET_ALL_PRODUCT_CATEGORIES, payload: { data: res.data.content }});
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchProductCategories(action) {
    try {
        const res = yield call(api.fetchProductCategories, get(action, "payload"));
        yield put({ type: SET_PRODUCT_CATEGORIES, payload: { ...res.data }});
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* ProductCategories() {
    yield takeEvery(FETCH_ALL_PRODUCT_CATEGORIES, fetchAllProductCategories);
    yield takeEvery(FETCH_PRODUCT_CATEGORIES, fetchProductCategories);
}

export default ProductCategories;
