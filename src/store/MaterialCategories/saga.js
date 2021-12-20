import {
    FETCH_MATERIAL_CATEGORIES_REQUEST,
    FETCH_MATERIAL_CATEGORIES_SUCCESS,
    FETCH_MATERIAL_CATEGORIES_FAILURE,
    FETCH_ALL_MATERIAL_CATEGORIES_REQUEST,
    FETCH_ALL_MATERIAL_CATEGORIES_SUCCESS,
    FETCH_ALL_MATERIAL_CATEGORIES_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchAllCategoriesGenerator() {
    try {
        let res = yield call(api.fetchMaterialCategories);
        yield put({
            type: FETCH_ALL_MATERIAL_CATEGORIES_SUCCESS,
            data: { data: res.data },
        });
    } catch (e) {
        yield put({ type: FETCH_ALL_MATERIAL_CATEGORIES_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchMaterialCategoriesGenerator(action) {
    try {
        const res = yield call(
            api.fetchMaterialCategories,
            get(action, "payload.params")
        );
        yield put({
            type: FETCH_MATERIAL_CATEGORIES_SUCCESS,
            data: { data: res.data },
        });
    } catch (e) {
        yield put({ type: FETCH_MATERIAL_CATEGORIES_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* MaterialCategories() {
    yield takeEvery(
        FETCH_MATERIAL_CATEGORIES_REQUEST,
        fetchMaterialCategoriesGenerator
    );
    yield takeEvery(
        FETCH_ALL_MATERIAL_CATEGORIES_REQUEST,
        fetchAllCategoriesGenerator
    );
}

export default MaterialCategories;
