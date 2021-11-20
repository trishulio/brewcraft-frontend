import {
    FETCH_MATERIALS_REQUEST,
    FETCH_MATERIALS_SUCCESS,
    FETCH_MATERIALS_FAILURE,
    FETCH_ALL_MATERIALS_REQUEST,
    FETCH_ALL_MATERIALS_SUCCESS,
    FETCH_ALL_MATERIALS_FAILURE
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchAllMaterialsGenerator() {
    try {
        let res = yield call(api.fetchMaterials);
        yield put({ type: FETCH_ALL_MATERIALS_SUCCESS, data: { data: res.data }});
    } catch (e) {
        yield put({ type: FETCH_ALL_MATERIALS_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchMaterialsGenerator(action) {
    try {
      const res = yield call(api.fetchMaterials, get(action, "payload.params"));
      yield put({ type: FETCH_MATERIALS_SUCCESS, data: { data: res.data }});
    } catch (e) {
      yield put({ type: FETCH_MATERIALS_FAILURE });
      yield put(snackFailure("Something went wrong please try again."));
    }
  }

function* Materials() {
    yield takeEvery(FETCH_MATERIALS_REQUEST, fetchMaterialsGenerator);
    yield takeEvery(FETCH_ALL_MATERIALS_REQUEST, fetchAllMaterialsGenerator);
}

export default Materials;