import {
    SET_FINISHED_GOOD_DETAILS,
    FETCH_FINISHED_GOOD,
    CREATE_FINISHED_GOOD,
    UPDATE_FINISHED_GOOD,
    DELETE_FINISHED_GOOD,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../Brewery/actions";

function* fetchFinishedGoodByIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchFinishedGoodById,
            get(action, "payload.id")
        );
        res.initialFinishedGood = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_FINISHED_GOOD_DETAILS, payload: { ...res } });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* createFinishedGoodGenerator(action) {
    try {
        yield call(api.addFinishedGood, get(action, "payload.form"));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* udpateFinishedGoodGenerator(action) {
    try {
        const res = yield call(
            api.updateFinishedGood,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        res.initialFinishedGood = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_FINISHED_GOOD_DETAILS, payload: { ...res } });
        if (action.payload.success) {
            action.payload.success(res.data.id);
        }
        yield put(
            snackSuccess(
                `Updated finished good ${get(action, "payload.form.name")}.`
            )
        );
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* deleteFinishedGoodGenerator(action) {
    try {
        yield call(api.deleteFinishedGood, get(action, "payload.id"));
        yield put(setGlobalRedirect({ pathname: "/finished-goods" }));
        yield put(snackSuccess("Deleted finished good."));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* FinishedGood() {
    yield takeEvery(CREATE_FINISHED_GOOD, createFinishedGoodGenerator);
    yield takeEvery(FETCH_FINISHED_GOOD, fetchFinishedGoodByIdGenerator);
    yield takeEvery(UPDATE_FINISHED_GOOD, udpateFinishedGoodGenerator);
    yield takeEvery(DELETE_FINISHED_GOOD, deleteFinishedGoodGenerator);
}

export default FinishedGood;
