import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    FETCH_ALL_USERS_REQUEST,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_FAILURE
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchAllUsersGenerator() {
    try {
        let res = yield call(api.fetchUsers);
        yield put({ type: FETCH_ALL_USERS_SUCCESS, data: { data: res.data }});
    } catch (e) {
        yield put({ type: FETCH_ALL_USERS_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchUsersGenerator(action) {
    try {
      const res = yield call(api.fetchUsers, get(action, "payload.params"));
      yield put({ type: FETCH_USERS_SUCCESS, data: { data: res.data }});
    } catch (e) {
      yield put({ type: FETCH_USERS_FAILURE });
      yield put(snackFailure("Something went wrong please try again."));
    }
  }

function* Users() {
    yield takeEvery(FETCH_USERS_REQUEST, fetchUsersGenerator);
    yield takeEvery(FETCH_ALL_USERS_REQUEST, fetchAllUsersGenerator);
}

export default Users;