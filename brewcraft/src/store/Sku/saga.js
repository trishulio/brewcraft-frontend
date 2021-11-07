import {
    SET_SKU_DETAILS,
    FETCH_SKU,
    CREATE_SKU,
    UPDATE_SKU,
    DELETE_SKU
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../Brewery/actions";

function* fetchSkuByIdGenerator(action) {
    try {
        const res = yield call(api.fetchSkuById, get(action, "payload.id"));
        res.data.parentCategoryId = res.data.parentCategory?.id || null;
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_SKU_DETAILS, payload: { ...res } });
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* createSkuGenerator(action) {
    try {
        const res = yield call(api.postSku, get(action, "payload.form"));
        res.data.parentCategoryId = res.data.parentCategory?.id || null;
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_SKU_DETAILS, payload: { ...res } });
        yield put(snackSuccess(`Created product category ${get(action, "payload.form.name")}.`));
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* udpateSkuGenerator(action) {
    try {
        const res = yield call(api.patchSku, get(action, "payload.id"), get(action, "payload.form"));
        res.data.parentCategoryId = res.data.parentCategory?.id || null;
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_SKU_DETAILS, payload: { ...res } });
        yield put(snackSuccess(`Updated product category ${get(action, "payload.form.name")}.`));
        if (action.payload.success) {
            yield call(action.payload.success);
        }
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* deleteSkuGenerator(action) {
    try {
        yield call(api.deleteSku, get(action, "payload.id"));
        yield put(setGlobalRedirect({ pathname: "/skus" }));
        yield put(snackSuccess("Deleted product category."));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* Sku() {
    yield takeEvery(CREATE_SKU, createSkuGenerator);
    yield takeEvery(FETCH_SKU, fetchSkuByIdGenerator);
    yield takeEvery(UPDATE_SKU, udpateSkuGenerator);
    yield takeEvery(DELETE_SKU, deleteSkuGenerator);
}

export default Sku;
