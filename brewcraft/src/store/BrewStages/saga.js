import {
    FETCH_BREW_STAGE_BY_ID_REQUEST,
    SET_BREW_STAGE_DETAILS,
    ADD_BREW_STAGE_REQUEST,
    ADD_BREW_STAGE_SUCCESS,
    ADD_BREW_STAGE_FAILURE,
    EDIT_BREW_STAGE_REQUEST,
    DELETE_BREW_STAGE_REQUEST,
    EDIT_BREW_STAGE_SUCCESS,
    DELETE_BREW_STAGE_SUCCESS,
    EDIT_BREW_STAGE_FAILURE,
    DELETE_BREW_STAGE_FAILURE,
    FETCH_ALL_BREW_STAGE_REQUEST
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";

function* fetchAllBrewStages(action) {
    try {
        let res = yield call(api.fetchBrewStages, get(action, "payload.id"));
        yield put({ type: SET_BREW_STAGE_DETAILS, payload: { content: res.data.content }});
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
 }

function* fetchBrewStageByIdGenerator(action) {
    try {
        const res = yield call(api.fetchBrewStageById, get(action, "payload.id"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_BREW_STAGE_DETAILS, payload: { data: res.data, initial: res.data }});
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* addBrewStageGenerator(action) {
    try {
        const res = yield call(api.addBrewStage, get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: ADD_BREW_STAGE_SUCCESS, payload: { data: res.data, initial: res.data }});
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: ADD_BREW_STAGE_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editBrewStageGenerator(action) {
    try {
        const res = yield call(api.updateBrewStage, get(action, "payload.id"), get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: EDIT_BREW_STAGE_SUCCESS, payload: { data: res.data, initial: res.data }});
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_BREW_STAGE_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteBrewStageGenerator(action) {
    try {
        yield call(api.deleteBrewStage, get(action, "payload.id"));
        yield put({ type: DELETE_BREW_STAGE_SUCCESS , payload : get(action, "payload") });
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_BREW_STAGE_FAILURE });
        yield put(snackFailure());
    }
}

function* BrewStage() {
    yield takeEvery(FETCH_BREW_STAGE_BY_ID_REQUEST, fetchBrewStageByIdGenerator);
    yield takeEvery(ADD_BREW_STAGE_REQUEST, addBrewStageGenerator);
    yield takeEvery(EDIT_BREW_STAGE_REQUEST, editBrewStageGenerator);
    yield takeEvery(DELETE_BREW_STAGE_REQUEST, deleteBrewStageGenerator);
    yield takeEvery(FETCH_ALL_BREW_STAGE_REQUEST, fetchAllBrewStages);
}

export default BrewStage;