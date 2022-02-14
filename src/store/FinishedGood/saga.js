import {
    SET_FINISHED_GOOD_DETAILS,
    SET_FINISHED_GOOD_DETAILS_ERROR,
    FETCH_FINISHED_GOOD,
    CREATE_FINISHED_GOOD,
    UPDATE_FINISHED_GOOD,
    DELETE_FINISHED_GOOD,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { setGlobalRedirect } from "../../store/actions";

function* fetchFinishedGoodByIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchFinishedGoodById,
            get(action, "payload.id")
        );
        yield put({
            type: SET_FINISHED_GOOD_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put({
            type: SET_FINISHED_GOOD_DETAILS_ERROR,
            payload: { error: true },
        });
    }
}

function* createFinishedGoodGenerator(action) {
    try {
        const res = yield call(
            api.createFinishedGood,
            get(action, "payload.form")
        );
        yield put(
            setGlobalRedirect({
                pathname: "/inventory/finished-goods/" + res.data[0].id,
            })
        );
    } catch (e) {
        yield put({
            type: SET_FINISHED_GOOD_DETAILS_ERROR,
            payload: { error: true },
        });
    }
}

function* udpateFinishedGoodGenerator(action) {
    try {
        const res = yield call(
            api.updateFinishedGood,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: SET_FINISHED_GOOD_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
        yield put(
            setGlobalRedirect({
                pathname: "/inventory/finished-goods/" + res.data[0].id,
                search: "",
            })
        );
    } catch (e) {
        yield put({
            type: SET_FINISHED_GOOD_DETAILS_ERROR,
            payload: { error: true },
        });
    }
}

function* deleteFinishedGoodGenerator(action) {
    try {
        yield call(api.deleteFinishedGood, get(action, "payload.id"));
        yield put(setGlobalRedirect({ pathname: "/inventory/finished-goods" }));
    } catch (e) {
        yield put({
            type: SET_FINISHED_GOOD_DETAILS_ERROR,
            payload: { error: true },
        });
    }
}

function* FinishedGood() {
    yield takeEvery(CREATE_FINISHED_GOOD, createFinishedGoodGenerator);
    yield takeEvery(FETCH_FINISHED_GOOD, fetchFinishedGoodByIdGenerator);
    yield takeEvery(UPDATE_FINISHED_GOOD, udpateFinishedGoodGenerator);
    yield takeEvery(DELETE_FINISHED_GOOD, deleteFinishedGoodGenerator);
}

export default FinishedGood;
