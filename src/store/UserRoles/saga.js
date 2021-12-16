import {
    SET_USER_ROLES,
    SET_USER_ROLES_ERROR,
    SET_ALL_USER_ROLES,
    FETCH_USER_ROLES,
    FETCH_ALL_USER_ROLES
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";

function* fetchAllUserRoles(action) {
    try {
        const res = yield call(api.fetchUserRoles, {});
        yield put({ type: SET_ALL_USER_ROLES, payload: { data: res.data.content }});
        if (action.payload?.success) {
            yield call(action.payload.success);
        }
    } catch (e) {
        yield put({ type: SET_USER_ROLES_ERROR, payload: { error: true }});
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
        yield put({ type: SET_USER_ROLES_ERROR, payload: { error: true }});
    }
}

function* UserRoles() {
    yield takeEvery(FETCH_ALL_USER_ROLES, fetchAllUserRoles);
    yield takeEvery(FETCH_USER_ROLES, fetchUserRoles);
}

export default UserRoles;
