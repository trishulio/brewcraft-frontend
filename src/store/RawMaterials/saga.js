import {
    FETCH_RAW_MATERIALS_REQUEST,
    FETCH_RAW_MATERIALS_SUCCESS,
    FETCH_RAW_MATERIALS_FAILURE,
    FETCH_ALL_RAW_MATERIALS_REQUEST,
    FETCH_ALL_RAW_MATERIALS_SUCCESS,
    FETCH_ALL_RAW_MATERIALS_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchAllRawMaterialsGenerator() {
    try {
        const res = yield call(api.fetchRawMaterials);
        yield put({
            type: FETCH_ALL_RAW_MATERIALS_SUCCESS,
            data: { data: res.data },
        });
    } catch (e) {
        yield put(snackFailure("Failed to fetch raw materials."));
        yield put({ type: FETCH_ALL_RAW_MATERIALS_FAILURE });
    }
}

function* fetchRawMaterialsGenerator(action) {
    try {
        const res = yield call(
            api.fetchRawMaterials,
            get(action, "payload.params")
        );
        yield put({
            type: FETCH_RAW_MATERIALS_SUCCESS,
            data: { data: res.data },
        });
    } catch (e) {
        yield put(snackFailure("Failed to fetch raw materials."));
        yield put({ type: FETCH_RAW_MATERIALS_FAILURE });
    }
}

function* RawMaterials() {
    yield takeEvery(FETCH_RAW_MATERIALS_REQUEST, fetchRawMaterialsGenerator);
    yield takeEvery(
        FETCH_ALL_RAW_MATERIALS_REQUEST,
        fetchAllRawMaterialsGenerator
    );
}

export default RawMaterials;
