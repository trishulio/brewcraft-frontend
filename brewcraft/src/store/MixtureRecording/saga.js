import {
    FETCH_MIXTURE_RECORDING_BY_ID_REQUEST,
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
import { setGlobalRedirect } from "../Brewery/actions";

function* fetchMixtureRecordingByIdGenerator(action) {
    try {
        const res = yield call(api.fetchMixtureRecordingById,get(action, "payload.id"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_MIXTURE_RECORDING_DETAILS, payload: { data: res.data, initial: res.data }});
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* addMixtureRecordingGenerator(action) {
    try {
        const res = yield call(api.addMixtureRecording, get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: ADD_MIXTURE_RECORDING_SUCCESS, payload: { data: res.data, initial: res.data }});
        yield put(setGlobalRedirect({ pathname: "/materials/mixtures/recordingsss/" + res.data.id }));
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: ADD_MIXTURE_RECORDING_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editMixtureRecordingGenerator(action) {
    try {
        const res = yield call(api.updateMixtureRecording, get(action, "payload.id"), get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: EDIT_MIXTURE_RECORDING_SUCCESS, payload: { data: res.data, initial: res.data }});
        yield put(setGlobalRedirect({ pathname: "/materials/mixtures/recordingsss/" + res.data.id }));
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_MIXTURE_RECORDING_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteMixtureRecordingGenerator(action) {
    try {
        yield call(api.deleteMixtureRecording, get(action, "payload.id"));
        yield put({ type: DELETE_MIXTURE_RECORDING_SUCCESS , payload : get(action, "payload") });
        yield put(setGlobalRedirect({ pathname: "/materials/mixtures/recordingsss" }));
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_MIXTURE_RECORDING_FAILURE });
        yield put(snackFailure());
    }
}

function* MixtureRecording() {
    yield takeEvery(FETCH_MIXTURE_RECORDING_BY_ID_REQUEST, fetchMixtureRecordingByIdGenerator);
    yield takeEvery(ADD_MIXTURE_RECORDING_REQUEST, addMixtureRecordingGenerator);
    yield takeEvery(EDIT_MIXTURE_RECORDING_REQUEST, editMixtureRecordingGenerator);
    yield takeEvery(DELETE_MIXTURE_RECORDING_REQUEST, deleteMixtureRecordingGenerator);
}

export default MixtureRecording;