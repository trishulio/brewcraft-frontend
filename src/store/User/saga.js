import {
    SET_USER_DETAILS,
    SET_USER_DETAILS_ERROR,
    FETCH_USER,
    CREATE_USER,
    UPDATE_USER,
    DELETE_USER,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { setGlobalRedirect } from "../Brewery/actions";

function* fetchUserByIdGenerator(action) {
    try {
        const res = yield call(api.fetchUserById, get(action, "payload.id"));
        yield put({
            type: SET_USER_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put({ type: SET_USER_DETAILS_ERROR, payload: { error: true } });
    }
}

function* createUserGenerator(action) {
    try {
        const res = yield call(api.postUser, get(action, "payload.form"));
        yield put({
            type: SET_USER_DETAILS,
            payload: { data: res.data[0], initial: res.data[0] },
        });
        yield put(
            setGlobalRedirect({
                pathname: "/users/" + res.data[0].id,
                search: "",
            })
        );
    } catch (e) {
        yield put({ type: SET_USER_DETAILS_ERROR, payload: { error: true } });
    }
}

function* udpateUserGenerator(action) {
    try {
        const res = yield call(api.putUser, get(action, "payload.form"));
        yield put({
            type: SET_USER_DETAILS,
            payload: { data: res.data[0], initial: res.data[0] },
        });
        yield put(
            setGlobalRedirect({
                pathname: "/users/" + res.data[0].id,
                search: "",
            })
        );
    } catch (e) {
        yield put({ type: SET_USER_DETAILS_ERROR, payload: { error: true } });
    }
}

function* deleteUserGenerator(action) {
    try {
        yield call(api.deleteUser, get(action, "payload.id"));
        yield put(setGlobalRedirect({ pathname: "/users" }));
    } catch (e) {
        yield put({ type: SET_USER_DETAILS_ERROR, payload: { error: true } });
    }
}

function* User() {
    yield takeEvery(CREATE_USER, createUserGenerator);
    yield takeEvery(FETCH_USER, fetchUserByIdGenerator);
    yield takeEvery(UPDATE_USER, udpateUserGenerator);
    yield takeEvery(DELETE_USER, deleteUserGenerator);
}

export default User;
