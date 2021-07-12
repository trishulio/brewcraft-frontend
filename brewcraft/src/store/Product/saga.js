import {
    SET_PRODUCT_DETAILS,
    FETCH_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";

function* fetchProductByIdGenerator(action) {
    try {
        const res = yield call(api.fetchProductById, get(action, "payload.id"));
        res.initialProduct = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_PRODUCT_DETAILS, payload: { ...res } });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* createProductGenerator(action) {
    try {
        const res = yield call(api.postProduct, get(action, "payload.form"));
        res.initialProduct = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_PRODUCT_DETAILS, payload: { ...res } });
        if (action.payload.success) {
            action.payload.success(res.data.id);
        }
        yield put(snackSuccess(`Created product ${get(action, "payload.form.name")}.`));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* udpateProductGenerator(action) {
    try {
        const res = yield call(api.patchProduct, get(action, "payload.id"), get(action, "payload.form"));
        res.initialProduct = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_PRODUCT_DETAILS, payload: { ...res } });
        if (action.payload.success) {
            action.payload.success(res.data.id);
        }
        yield put(snackSuccess(`Updated product ${get(action, "payload.form.name")}.`));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* deleteProductGenerator(action) {
    try {
        yield call(api.deleteProduct, get(action, "payload.id"));
        if (action.payload.success) {
            action.payload.success();
        }
        yield put(snackSuccess("Deleted product."));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* Product() {
    yield takeEvery(CREATE_PRODUCT, createProductGenerator);
    yield takeEvery(FETCH_PRODUCT, fetchProductByIdGenerator);
    yield takeEvery(UPDATE_PRODUCT, udpateProductGenerator);
    yield takeEvery(DELETE_PRODUCT, deleteProductGenerator);
}

export default Product;
