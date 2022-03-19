import {
    FETCH_BREW_MIXTURE_RECORDINGS_REQUEST,
    FETCH_BREW_MIXTURE_RECORDINGS_SUCCESS,
    FETCH_BREW_MIXTURE_RECORDINGS_FAILURE,
    EDIT_BREW_MIXTURE_RECORDINGS_REQUEST,
    DELETE_BREW_MIXTURE_RECORDINGS_REQUEST,
    DELETE_BREW_MIXTURE_RECORDINGS_FAILURE,
    DELETE_BREW_MIXTURE_RECORDINGS_SUCCESS,
    EDIT_BREW_MIXTURE_RECORDINGS_FAILURE,
    EDIT_BREW_MIXTURE_RECORDINGS_SUCCESS,
} from "./actionTypes";
import { call, put, race, select, take, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";

function* fetchMixtureRecordingsGenerator(action) {
    try {
        const res = yield call(
            api.fetchMixtureRecordings,
            get(action, "payload")
        );
        yield put({
            type: FETCH_BREW_MIXTURE_RECORDINGS_SUCCESS,
            payload: {
                content: [...res.data.content],
                initial: [...res.data.content],
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_BREW_MIXTURE_RECORDINGS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* editBrewMixtureRecordingsGenerator(action) {
    try {
        const batch = yield select((state) => state.Batch.Batch.data);
        yield call(
            api.updateMixtureRecordings,
            get(action, "payload.mixtureRecordings")
        );
        yield put({
            type: FETCH_BREW_MIXTURE_RECORDINGS_REQUEST,
            payload: {
                id: batch.id,
            },
        });
        const [success, failed] = yield race([
            take(FETCH_BREW_MIXTURE_RECORDINGS_SUCCESS),
            take(FETCH_BREW_MIXTURE_RECORDINGS_FAILURE),
        ]);
        if (success) {
            yield put({
                type: EDIT_BREW_MIXTURE_RECORDINGS_SUCCESS,
            });
        } else {
            yield put({
                type: EDIT_BREW_MIXTURE_RECORDINGS_FAILURE,
                payload: get(failed, "payload.error"),
            });
        }
    } catch (e) {
        yield put({
            type: EDIT_BREW_MIXTURE_RECORDINGS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* deleteMixtureRecordingsGenerator(action) {
    try {
        const batch = yield select((state) => state.Batch.Batch.data);
        yield call(api.deleteMixtureRecording, get(action, "payload.form"));
        yield put({
            type: FETCH_BREW_MIXTURE_RECORDINGS_REQUEST,
            payload: {
                id: batch.id,
            },
        });
        const [success, failed] = yield race([
            take(FETCH_BREW_MIXTURE_RECORDINGS_SUCCESS),
            take(FETCH_BREW_MIXTURE_RECORDINGS_FAILURE),
        ]);
        if (success) {
            yield put({
                type: DELETE_BREW_MIXTURE_RECORDINGS_SUCCESS,
            });
        } else {
            yield put({
                type: DELETE_BREW_MIXTURE_RECORDINGS_FAILURE,
                payload: get(failed, "payload.error"),
            });
        }
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
        FETCH_BREW_MIXTURE_RECORDINGS_REQUEST,
        fetchMixtureRecordingsGenerator
    );
    yield takeEvery(
        EDIT_BREW_MIXTURE_RECORDINGS_REQUEST,
        editBrewMixtureRecordingsGenerator
    );
    yield takeEvery(
        DELETE_BREW_MIXTURE_RECORDINGS_REQUEST,
        deleteMixtureRecordingsGenerator
    );
}

export default MixtureRecording;
