import {
    SET_USER_DETAILS,
    FETCH_USER,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../Brewery/actions";

function* fetchUserByIdGenerator(action) {
    try {
        const res = yield call(api.fetchUserById, get(action, "payload.id"));
        yield put({ type: SET_USER_DETAILS, payload: { data: res.data, initial: res.data }});
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* createUserGenerator(action) {
    try {
        const res = yield call(api.postUser, get(action, "payload.form"));
        yield put({ type: SET_USER_DETAILS, payload: { data: res.data, initial: res.data } });
        yield put(setGlobalRedirect({ pathname: "/users/" + res.data.id, search: "" }));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* udpateUserGenerator(action) {
    try {
        const res = yield call(api.patchUser, get(action, "payload.id"), get(action, "payload.form"));
        yield put({ type: SET_USER_DETAILS, payload: { data: res.data, initial: res.data } });
        yield put(setGlobalRedirect({ pathname: "/users/" + res.data.id, search: "" }));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* deleteUserGenerator(action) {
    try {
        yield call(api.deleteUser, get(action, "payload.id"));
        yield put(setGlobalRedirect({ pathname: "/users" }));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* User() {
    yield takeEvery(CREATE_USER, createUserGenerator);
    yield takeEvery(FETCH_USER, fetchUserByIdGenerator);
    yield takeEvery(UPDATE_USER, udpateUserGenerator);
    yield takeEvery(DELETE_USER, deleteUserGenerator);
}

export default User;
