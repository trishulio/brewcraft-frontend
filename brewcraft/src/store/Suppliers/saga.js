import {
    FETCH_SUPPLIERS_REQUEST,
    FETCH_SUPPLIERS_SUCCESS,
    FETCH_SUPPLIERS_FAILURE,
    FETCH_ALL_SUPPLIERS_REQUEST,
    FETCH_ALL_SUPPLIERS_SUCCESS,
    FETCH_ALL_SUPPLIERS_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchAllSuppliersGenerator() {
    try {
        const res = yield call(api.fetchSuppliers);
        yield put({ type: FETCH_ALL_SUPPLIERS_SUCCESS, data: res.data.suppliers });
    } catch (e) {
        yield put({ type: FETCH_ALL_SUPPLIERS_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchSuppliersGenerator(action) {
    try {
      const res = yield call(api.fetchSuppliers,get(action, "payload.params"));
      delete Object.assign(res.data, {"content": res.data["suppliers"] })["suppliers"];
      yield put({ type: FETCH_SUPPLIERS_SUCCESS, data: { data: res.data }});
    } catch (e) {
      yield put({ type: FETCH_SUPPLIERS_FAILURE });
      yield put(snackFailure("Something went wrong please try again."));
    }
  }

function* Suppliers() {
    yield takeEvery(FETCH_SUPPLIERS_REQUEST, fetchSuppliersGenerator);
    yield takeEvery(FETCH_ALL_SUPPLIERS_REQUEST, fetchAllSuppliersGenerator);
}

export default Suppliers;