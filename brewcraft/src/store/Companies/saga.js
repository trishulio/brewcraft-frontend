import {
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANIES_SUCCESS,
    FETCH_COMPANIES_FAILURE,
    FETCH_ALL_COMPANIES_REQUEST,
    FETCH_ALL_COMPANIES_SUCCESS,
    FETCH_ALL_COMPANIES_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { ALL } from "../../helpers/constants";
import { snackFailure } from "../Snackbar/actions";

function* fetchAllCompaniesGenerator() {
    try {
        const res = yield call(api.fetchCompanies, ALL);
        yield put({ type: FETCH_ALL_COMPANIES_SUCCESS, data: res.data.suppliers });
    } catch (e) {
        yield put({ type: FETCH_ALL_COMPANIES_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchCompaniesGenerator(action) {
    try {
      const res = yield call(api.fetchCompanies,get(action, "payload.params"));
      delete Object.assign(res.data, {["content"]: res.data["suppliers"] })["suppliers"];
      yield put({ type: FETCH_COMPANIES_SUCCESS, data: { data: res.data }});
    } catch (e) {
      yield put({ type: FETCH_COMPANIES_FAILURE });
      yield put(snackFailure("Something went wrong please try again."));
    }
  }

function* Companies() {
    yield takeEvery(FETCH_COMPANIES_REQUEST, fetchCompaniesGenerator);
    yield takeEvery(FETCH_ALL_COMPANIES_REQUEST, fetchAllCompaniesGenerator);
}

export default Companies;