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
import { ALL } from "../../helpers/constants";
import { snackFailure, snackSuccess } from "../Snackbar/actions";

function* fetchAllSuppliersGenerator() {
    try {
        let res = yield call(api.fetchSuppliers, ALL);
        delete Object.assign(res.data, {["all"]: res.data["supplierContacts"] })["supplierContacts"];
        yield put({ type: FETCH_ALL_SUPPLIERS_SUCCESS, data: { data: res.data }});
    } catch (e) {
        yield put({ type: FETCH_ALL_SUPPLIERS_FAILURE });
    }
}

function* fetchSuppliersGenerator(action) {
    try {
      const res = yield call(api.fetchSuppliers, get(action, "payload.params"));
      delete Object.assign(res.data, {["content"]: res.data["supplierContacts"] })["supplierContacts"];
      yield put({ type: FETCH_SUPPLIERS_SUCCESS, data: { data: res.data }});
    } catch (e) {
      yield put({ type: FETCH_SUPPLIERS_FAILURE });
    }
  }

function* Suppliers() {
    yield takeEvery(
        FETCH_SUPPLIERS_REQUEST,
        fetchSuppliersGenerator
    );
    yield takeEvery(FETCH_ALL_SUPPLIERS_REQUEST, fetchAllSuppliersGenerator);
}

export default Suppliers;