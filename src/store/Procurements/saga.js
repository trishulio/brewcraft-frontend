import {
    FETCH_PROCUREMENTS_REQUEST,
    FETCH_PROCUREMENTS_SUCCESS,
    FETCH_PROCUREMENTS_FAILURE
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchProcurementsGenerator(action) {
    try {
      const res = yield call(api.fetchProcurements, get(action, "payload.params"));
      yield put({ type: FETCH_PROCUREMENTS_SUCCESS, data: { data: res.data }});
    } catch (e) {
      yield put({ type: FETCH_PROCUREMENTS_FAILURE });
      yield put(snackFailure("Something went wrong please try again."));
    }
  }

function* Procurements() {
    yield takeEvery(FETCH_PROCUREMENTS_REQUEST, fetchProcurementsGenerator);
}

export default Procurements;