import {
    FETCH_PACKAGING_REQUEST,
    FETCH_PACKAGING_SUCCESS,
    FETCH_PACKAGING_FAILURE,
    FETCH_ALL_PACKAGING_REQUEST,
    FETCH_ALL_PACKAGING_SUCCESS,
    FETCH_ALL_PACKAGING_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { ALL } from "../../helpers/constants";
import { snackFailure, snackSuccess } from "../Snackbar/actions";

function* fetchAllPackagingGenerator() {
    try {
        let res = yield call(api.fetchPackaging, ALL);
        yield put({ type: FETCH_ALL_PACKAGING_SUCCESS, data: { data: res.data }});
    } catch (e) {
        yield put({ type: FETCH_ALL_PACKAGING_FAILURE });
    }
}

function* fetchPackagingGenerator(action) {
    try {
      const res = yield call(api.fetchPackaging,get(action, "payload.params"));
      yield put({ type: FETCH_PACKAGING_SUCCESS, data: { data: res.data }});
    } catch (e) {
      yield put({ type: FETCH_PACKAGING_FAILURE });
    }
  }

function* Packaging() {
    yield takeEvery(FETCH_PACKAGING_REQUEST, fetchPackagingGenerator);
    yield takeEvery(FETCH_ALL_PACKAGING_REQUEST, fetchAllPackagingGenerator);
}

export default Packaging;