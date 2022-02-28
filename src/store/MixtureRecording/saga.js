import {
    FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_REQUEST,
    FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_SUCCESS,
    FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_FAILURE,
    ADD_TRANSFER_MIXTURE_RECORDING_SUCCESS,
    ADD_TRANSFER_MIXTURE_RECORDING_FAILURE,
    DELETE_MIXTURE_RECORDING_REQUEST,
    EDIT_BREW_MIXTURE_RECORDINGS_REQUEST,
    DELETE_BREW_MIXTURE_RECORDINGS_FAILURE,
} from "./actionTypes";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";

function* fetchMixtureRecordingByBrewIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchMixtureRecordingByBrewId,
            get(action, "payload.id")
        );
        yield put({
            type: FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_SUCCESS,
            payload: {
                content: [...res.data.content],
                initial: [...res.data.content],
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* editBrewMixtureRecordingGenerator(action) {
    try {
        const res = yield call(
            api.updateMixtureRecordings,
            get(action, "payload.mixtureRecordings")
        );
        yield put({
            type: ADD_TRANSFER_MIXTURE_RECORDING_SUCCESS,
            payload: { ...res.data, initial: res.data.content },
        });
    } catch (e) {
        yield put({
            type: ADD_TRANSFER_MIXTURE_RECORDING_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* deleteMixtureRecordingGenerator(action) {
    try {
        const batch = yield select((state) => state.Batch.Batch.data);
        yield call(api.deleteMixtureRecording, get(action, "payload.form"));
        yield put({
            type: FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_REQUEST,
            payload: { id: batch.id },
        });
        yield put({
            type: FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_SUCCESS,
            payload: { id: batch.id },
        });
    } catch (e) {
        yield put({
            type: DELETE_BREW_MIXTURE_RECORDINGS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* MixtureRecording() {
    yield takeEvery(
        FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_REQUEST,
        fetchMixtureRecordingByBrewIdGenerator
    );
    yield takeEvery(
        EDIT_BREW_MIXTURE_RECORDINGS_REQUEST,
        editBrewMixtureRecordingGenerator
    );
    yield takeEvery(
        DELETE_MIXTURE_RECORDING_REQUEST,
        deleteMixtureRecordingGenerator
    );
}

export default MixtureRecording;
