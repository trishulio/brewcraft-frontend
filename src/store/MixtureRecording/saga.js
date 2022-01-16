import {
    FETCH_MIXTURE_RECORDING_BY_BREW_ID_REQUEST,
    FETCH_MIXTURE_RECORDING_BY_BREW_ID_SUCCESS,
    FETCH_MIXTURE_RECORDING_BY_BREW_ID_FAILURE,
    SET_TRANSFER_MIXTURE_RECORDING_DETAILS,
    ADD_TRANSFER_MIXTURE_RECORDING_REQUEST,
    ADD_TRANSFER_MIXTURE_RECORDING_SUCCESS,
    ADD_TRANSFER_MIXTURE_RECORDING_FAILURE,
    EDIT_TRANSFER_MIXTURE_RECORDING_REQUEST,
    EDIT_TRANSFER_MIXTURE_RECORDING_FAILURE,
    SET_FERMENT_MIXTURE_RECORDING_DETAILS,
    EDIT_FERMENT_MIXTURE_RECORDING_FAILURE,
    ADD_FERMENT_MIXTURE_RECORDING_REQUEST,
    EDIT_FERMENT_MIXTURE_RECORDING_REQUEST,
    DELETE_MIXTURE_RECORDING_REQUEST,
    ADD_FERMENT_MIXTURE_RECORDING_FAILURE,
    EDIT_TRANSFER_MIXTURE_RECORDING_SUCCESS,
    ADD_FERMENT_MIXTURE_RECORDING_SUCCESS,
    EDIT_FERMENT_MIXTURE_RECORDING_SUCCESS,
    DELETE_FERMENT_MIXTURE_RECORDING_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { ErrorMessage } from "../../helpers/textUtils";

function* fetchMixtureRecordingByBrewIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchMixtureRecordingByBrewId,
            get(action, "payload.id")
        );
        let content;
        content = res.data.content.filter(
            (c) => c.mixture.brewStage.task.name === "TRANSFER"
        );
        yield put({
            type: SET_TRANSFER_MIXTURE_RECORDING_DETAILS,
            payload: {
                content: JSON.parse(JSON.stringify(content)),
                initial: JSON.parse(JSON.stringify(content)),
            },
        });
        content = res.data.content.filter(
            (c) => c.mixture.brewStage.task.name === "FERMENT"
        );
        yield put({
            type: SET_FERMENT_MIXTURE_RECORDING_DETAILS,
            payload: {
                content: JSON.parse(JSON.stringify(content)),
                initial: JSON.parse(JSON.stringify(content)),
            },
        });
        yield put({ type: FETCH_MIXTURE_RECORDING_BY_BREW_ID_SUCCESS });
    } catch (e) {
        yield put({
            type: FETCH_MIXTURE_RECORDING_BY_BREW_ID_FAILURE,
            payload: {
                error: ErrorMessage({ ...e.response.data }),
            },
        });
    }
}

function* addTransferMixtureRecordingGenerator(action) {
    try {
        const res = yield call(
            api.addMixtureRecording,
            get(action, "payload.form")
        );
        yield put({
            type: ADD_TRANSFER_MIXTURE_RECORDING_SUCCESS,
            payload: { ...res.data, initial: res.data.content },
        });
    } catch (e) {
        yield put({
            type: ADD_TRANSFER_MIXTURE_RECORDING_FAILURE,
            payload: {
                error: ErrorMessage({ ...e.response.data }),
            },
        });
    }
}

function* editTransferMixtureRecordingGenerator(action) {
    try {
        const res = yield call(
            api.updateMixtureRecording,
            get(action, "payload.form")
        );
        yield put({
            type: EDIT_TRANSFER_MIXTURE_RECORDING_SUCCESS,
            payload: { ...res.data, initial: res.data.content },
        });
    } catch (e) {
        yield put({
            type: EDIT_TRANSFER_MIXTURE_RECORDING_FAILURE,
            payload: {
                error: ErrorMessage({ ...e.response.data }),
            },
        });
    }
}

function* addFermentMixtureRecordingGenerator(action) {
    try {
        const res = yield call(
            api.addMixtureRecording,
            get(action, "payload.form")
        );
        yield put({
            type: ADD_FERMENT_MIXTURE_RECORDING_SUCCESS,
            payload: { ...res.data, initial: res.data.content },
        });
    } catch (e) {
        yield put({
            type: ADD_FERMENT_MIXTURE_RECORDING_FAILURE,
            payload: {
                error: ErrorMessage({ ...e.response.data }),
            },
        });
    }
}

function* editFermentMixtureRecordingGenerator(action) {
    try {
        const res = yield call(
            api.updateMixtureRecording,
            get(action, "payload.form")
        );
        yield put({
            type: EDIT_FERMENT_MIXTURE_RECORDING_SUCCESS,
            payload: {
                content: JSON.parse(JSON.stringify(res.data)),
                initial: JSON.parse(JSON.stringify(res.data)),
            },
        });
    } catch (e) {
        yield put({
            type: EDIT_FERMENT_MIXTURE_RECORDING_FAILURE,
            payload: {
                error: ErrorMessage({ ...e.response.data }),
            },
        });
    }
}

function* deleteMixtureRecordingGenerator(action) {
    try {
        yield call(api.deleteMixtureRecording, get(action, "payload.form"));
        yield put({
            type: FETCH_MIXTURE_RECORDING_BY_BREW_ID_REQUEST,
            payload: { id: get(action, "payload.batchId") },
        });
    } catch (e) {
        yield put({
            type: DELETE_FERMENT_MIXTURE_RECORDING_FAILURE,
            payload: {
                error: ErrorMessage({ ...e.response.data }),
            },
        });
    }
}

function* MixtureRecording() {
    yield takeEvery(
        FETCH_MIXTURE_RECORDING_BY_BREW_ID_REQUEST,
        fetchMixtureRecordingByBrewIdGenerator
    );
    yield takeEvery(
        ADD_TRANSFER_MIXTURE_RECORDING_REQUEST,
        addTransferMixtureRecordingGenerator
    );
    yield takeEvery(
        EDIT_TRANSFER_MIXTURE_RECORDING_REQUEST,
        editTransferMixtureRecordingGenerator
    );
    yield takeEvery(
        ADD_FERMENT_MIXTURE_RECORDING_REQUEST,
        addFermentMixtureRecordingGenerator
    );
    yield takeEvery(
        EDIT_FERMENT_MIXTURE_RECORDING_REQUEST,
        editFermentMixtureRecordingGenerator
    );
    yield takeEvery(
        DELETE_MIXTURE_RECORDING_REQUEST,
        deleteMixtureRecordingGenerator
    );
}

export default MixtureRecording;
