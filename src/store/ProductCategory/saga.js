import {
    SET_PRODUCT_CATEGORY_DETAILS,
    FETCH_PRODUCT_CATEGORY,
    CREATE_PRODUCT_CATEGORY,
    UPDATE_PRODUCT_CATEGORY,
    DELETE_PRODUCT_CATEGORY,
    SET_PRODUCT_CATEGORY_DETAILS_FAILED,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../Brewery/actions";

function* fetchProductCategoryByIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchProductCategoryById,
            get(action, "payload.id")
        );
        res.data.parentCategoryId = res.data.parentCategory?.id || null;
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_PRODUCT_CATEGORY_DETAILS, payload: { ...res } });
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* createProductCategoryGenerator(action) {
    try {
        const res = yield call(
            api.postProductCategory,
            get(action, "payload.form")
        );
        res.data.parentCategoryId = res.data.parentCategory?.id || null;
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_PRODUCT_CATEGORY_DETAILS, payload: { ...res } });
        yield put(
            snackSuccess(
                `Created product category ${get(action, "payload.form.name")}.`
            )
        );
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
    } catch (e) {
        yield put({ type: SET_PRODUCT_CATEGORY_DETAILS_FAILED });
    }
}

function* udpateProductCategoryGenerator(action) {
    try {
        const res = yield call(
            api.patchProductCategory,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        res.data.parentCategoryId = res.data.parentCategory?.id || null;
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_PRODUCT_CATEGORY_DETAILS, payload: { ...res } });
        yield put(
            snackSuccess(
                `Updated product category ${get(action, "payload.form.name")}.`
            )
        );
        if (action.payload.success) {
            yield call(action.payload.success);
        }
    } catch (e) {
        yield put({ type: SET_PRODUCT_CATEGORY_DETAILS_FAILED });
    }
}

function* deleteProductCategoryGenerator(action) {
    try {
        yield call(api.deleteProductCategory, get(action, "payload.id"));
        yield put(setGlobalRedirect({ pathname: "/products/categories" }));
        yield put(snackSuccess("Deleted product category."));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* ProductCategory() {
    yield takeEvery(CREATE_PRODUCT_CATEGORY, createProductCategoryGenerator);
    yield takeEvery(FETCH_PRODUCT_CATEGORY, fetchProductCategoryByIdGenerator);
    yield takeEvery(UPDATE_PRODUCT_CATEGORY, udpateProductCategoryGenerator);
    yield takeEvery(DELETE_PRODUCT_CATEGORY, deleteProductCategoryGenerator);
}

export default ProductCategory;
