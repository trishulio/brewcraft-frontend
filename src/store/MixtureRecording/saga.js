import {
    FETCH_MIXTURE_RECORDING_BY_BREW_ID_REQUEST,
    SET_TRANSFER_MIXTURE_RECORDING_DETAILS,
    ADD_TRANSFER_MIXTURE_RECORDING_REQUEST,
    EDIT_TRANSFER_MIXTURE_RECORDING_REQUEST,
    DELETE_TRANSFER_MIXTURE_RECORDING_REQUEST,
    EDIT_TRANSFER_MIXTURE_RECORDING_FAILURE,
    SET_FERMENT_MIXTURE_RECORDING_DETAILS,
    EDIT_FERMENT_MIXTURE_RECORDING_FAILURE,
    ADD_FERMENT_MIXTURE_RECORDING_REQUEST,
    EDIT_FERMENT_MIXTURE_RECORDING_REQUEST,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";
import { fetchMixturesByBrewId } from "../actions";
import { SET_BATCH_DETAILS } from "../Brew/actionTypes";

function* fetchMixtureRecordingByBrewIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchMixtureRecordingByBrewId,
            get(action, "payload.id")
        );
        yield put({
            type: SET_TRANSFER_MIXTURE_RECORDING_DETAILS,
            payload: { ...res.data, initial: res.data.content },
        });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

// function* fetchMixtureRecordingByIdGenerator(action) {
//     try {
//         const res = yield call(api.fetchMixtureRecordingById, get(action, "payload.id"));
//         res.initial = JSON.parse(JSON.stringify(res.data));
//         yield put({ type: SET_TRANSFER_MIXTURE_RECORDING_DETAILS, payload: { data: res.data, initial: res.initial }});
//     } catch (e) {
//         yield put(snackFailure("Something went wrong please try again."));
//     }
// }

// function* fetchTransferMixtureRecordingsByMixtureIdGenerator(action) {
//     try {
//         const res = yield call(api.fetchMixtureRecordingsByMixtureId, get(action, "payload.id"));
//         yield put({ type: SET_TRANSFER_MIXTURE_RECORDING_DETAILS, payload: { content: res.data.content }});
//     } catch (e) {
//         console.log(e);
//         yield put(snackFailure("Something went wrong please try again."));
//     }
// }

function* addTransferMixtureRecordingGenerator(action) {
    try {
        const res = yield call(
            api.addMixtureRecording,
            get(action, "payload.form")
        );
        yield put({
            type: SET_TRANSFER_MIXTURE_RECORDING_DETAILS,
            payload: { ...res.data, initial: res.data.content },
        });
        yield put({ type: SET_BATCH_DETAILS, payload: { save: false } });
    } catch (e) {
        console.log(e);
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editTransferMixtureRecordingGenerator(action) {
    try {
        const res = yield call(
            api.updateMixtureRecording,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: SET_TRANSFER_MIXTURE_RECORDING_DETAILS,
            payload: { ...res.data, initial: res.data.content },
        });
        yield put({ type: SET_BATCH_DETAILS, payload: { save: false } });
    } catch (e) {
        yield put({ type: EDIT_TRANSFER_MIXTURE_RECORDING_FAILURE });
        yield put(snackFailure());
    }
}

function* addFermentMixtureRecordingGenerator(action) {
    try {
        const res = yield call(
            api.addMixtureRecording,
            get(action, "payload.form")
        );
        yield put({
            type: SET_FERMENT_MIXTURE_RECORDING_DETAILS,
            payload: { ...res.data, initial: res.data.content },
        });
        yield put({ type: SET_BATCH_DETAILS, payload: { save: false } });
    } catch (e) {
        console.log(e);
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editFermentMixtureRecordingGenerator(action) {
    try {
        const res = yield call(
            api.updateMixtureRecording,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: SET_FERMENT_MIXTURE_RECORDING_DETAILS,
            payload: { ...res.data, initial: res.data.content },
        });
        yield put({ type: SET_BATCH_DETAILS, payload: { save: false } });
    } catch (e) {
        yield put({ type: EDIT_FERMENT_MIXTURE_RECORDING_FAILURE });
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
    yield takeEvery(
        FETCH_MIXTURE_RECORDING_BY_BREW_ID_REQUEST,
        fetchMixtureRecordingByBrewIdGenerator
    );
    // yield takeEvery(FETCH_MIXTURE_RECORDING_BY_ID_REQUEST, fetchMixtureRecordingByIdGenerator);
    // yield takeEvery(FETCH_TRANSFER_MIXTURE_RECORDING_BY_MIXTURE_ID_REQUEST, fetchFermentMixtureRecordingsByMixtureIdGenerator);
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
        DELETE_TRANSFER_MIXTURE_RECORDING_REQUEST,
        deleteMixtureRecordingGenerator
    );
}

export default MixtureRecording;
