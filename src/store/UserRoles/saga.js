import {
    SET_USER_ROLES,
    SET_ALL_USER_ROLES,
    FETCH_USER_ROLES,
    FETCH_ALL_USER_ROLES
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchAllUserRoles(action) {
    try {
        const res = yield call(api.fetchUserRoles, {});
        yield put({ type: SET_ALL_USER_ROLES, payload: { data: res.data.content }});
        if (action.payload?.success) {
            yield call(action.payload.success);
        }
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchUserRoles(action) {
    try {
        const res = yield call(api.fetchUserRoles, get(action, "payload"));
        yield put({ type: SET_USER_ROLES, payload: { ...res.data }});
        if (action.payload?.success) {
            yield call(action.payload.success);
        }
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* UserRoles() {
    yield takeEvery(FETCH_ALL_USER_ROLES, fetchAllUserRoles);
    yield takeEvery(FETCH_USER_ROLES, fetchUserRoles);
}

export default UserRoles;
