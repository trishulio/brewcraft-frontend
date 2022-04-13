import {
    SET_PRODUCT_DETAILS,
    SET_INITIAL_PRODUCT_DETAILS,
    FETCH_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    SET_PRODUCT_DETAILS_ERROR,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../../store/actions";

function* fetchProductByIdGenerator(action) {
    try {
        const res = yield call(api.fetchProductById, get(action, "payload.id"));
        yield put({ type: SET_INITIAL_PRODUCT_DETAILS, payload: { ...res } });
        yield put({ type: SET_PRODUCT_DETAILS, payload: { ...res } });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* createProductGenerator(action) {
    try {
        const res = yield call(api.postProduct, get(action, "payload.form"));
        yield put({ type: SET_PRODUCT_DETAILS, payload: { ...res } });
        yield put({ type: SET_INITIAL_PRODUCT_DETAILS, payload: { ...res } });
        yield put(setGlobalRedirect({ pathname: "/products/" + res.data.id }));
        yield put(
            snackSuccess(`Created product ${get(action, "payload.form.name")}.`)
        );
    } catch (e) {
        yield put({ type: SET_PRODUCT_DETAILS_ERROR });
    }
}

function* udpateProductGenerator(action) {
    try {
        const res = yield call(
            api.putProduct,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({ type: SET_PRODUCT_DETAILS, payload: { ...res } });
        yield put({ type: SET_INITIAL_PRODUCT_DETAILS, payload: { ...res } });
        yield put(setGlobalRedirect({ pathname: "/products/" + res.data.id }));
        yield put(
            snackSuccess(`Updated product ${get(action, "payload.form.name")}.`)
        );
    } catch (e) {
        yield put({ type: SET_PRODUCT_DETAILS_ERROR });
    }
}

function* deleteProductGenerator(action) {
    try {
        yield call(api.deleteProduct, get(action, "payload.id"));
        yield put(snackSuccess("Deleted product."));
        yield put(setGlobalRedirect({ pathname: "/products" }));
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
