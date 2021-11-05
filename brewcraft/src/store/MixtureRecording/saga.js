import {
    FETCH_MIXTURE_RECORDING_BY_ID_REQUEST,
    FETCH_MIXTURE_RECORDING_BY_BREW_ID_REQUEST,
    FETCH_MIXTURE_RECORDING_BY_MIXTURE_ID_REQUEST,
    SET_MIXTURE_RECORDING_DETAILS,
    ADD_MIXTURE_RECORDING_REQUEST,
    ADD_MIXTURE_RECORDING_SUCCESS,
    ADD_MIXTURE_RECORDING_FAILURE,
    EDIT_MIXTURE_RECORDING_REQUEST,
    DELETE_MIXTURE_RECORDING_REQUEST,
    EDIT_MIXTURE_RECORDING_SUCCESS,
    DELETE_MIXTURE_RECORDING_SUCCESS,
    EDIT_MIXTURE_RECORDING_FAILURE,
    DELETE_MIXTURE_RECORDING_FAILURE
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { fetchMixturesByBrewId } from "../actions";

function* fetchMixtureRecordingByBrewIdGenerator(action) {
    try {
        const res = yield call(api.fetchMixtureRecordingByBrewId, get(action, "payload.id"));
        yield put({ type: SET_MIXTURE_RECORDING_DETAILS, payload: { ...res.data, initial: res.data.content }});
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchMixtureRecordingByIdGenerator(action) {
    try {
        const res = yield call(api.fetchMixtureRecordingById, get(action, "payload.id"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_MIXTURE_RECORDING_DETAILS, payload: { data: res.data, initial: res.initial }});
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchMixtureRecordingsByMixtureIdGenerator(action) {
    try {
        const res = yield call(api.fetchMixtureRecordingsByMixtureId, get(action, "payload.id"));
        yield put({ type: SET_MIXTURE_RECORDING_DETAILS, payload: { content: res.data.content }});
    } catch (e) {
        console.log(e);
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* addMixtureRecordingGenerator(action) {
    try {
        const res = yield call(api.addMixtureRecording, get(action, "payload.form"));
        yield put({ type: SET_MIXTURE_RECORDING_DETAILS, payload: { ...res.data, initial: res.data.content }});
    } catch (e) {
        console.log(e);
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editMixtureRecordingGenerator(action) {
    try {
        const res = yield call(api.updateMixtureRecording, get(action, "payload.id"), get(action, "payload.form"));
        yield put({ type: SET_MIXTURE_RECORDING_DETAILS, payload: { ...res.data, initial: res.data.content }});
    } catch (e) {
        yield put({ type: EDIT_MIXTURE_RECORDING_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteMixtureRecordingGenerator(action) {
    try {
        yield call(api.deleteMixtureRecording, get(action, "payload.id"));
        yield put(fetchMixturesByBrewId(get(action, "payload.batchId")));
    } catch (e) {
        console.log(e);
        yield put(snackFailure());
    }
}

function* MixtureRecording() {
    yield takeEvery(FETCH_MIXTURE_RECORDING_BY_BREW_ID_REQUEST, fetchMixtureRecordingByBrewIdGenerator)
    yield takeEvery(FETCH_MIXTURE_RECORDING_BY_ID_REQUEST, fetchMixtureRecordingByIdGenerator);
    yield takeEvery(ADD_MIXTURE_RECORDING_REQUEST, addMixtureRecordingGenerator);
    yield takeEvery(EDIT_MIXTURE_RECORDING_REQUEST, editMixtureRecordingGenerator);
    yield takeEvery(DELETE_MIXTURE_RECORDING_REQUEST, deleteMixtureRecordingGenerator);
    yield takeEvery(FETCH_MIXTURE_RECORDING_BY_MIXTURE_ID_REQUEST, fetchMixtureRecordingsByMixtureIdGenerator);
}

export default MixtureRecording;