import { get } from "lodash";
import { call, put, select, takeEvery } from "redux-saga/effects";
import {
    FETCH_BATCH_MIXTURES_REQUEST,
    FETCH_BATCH_MIXTURES_SUCCESS,
    FETCH_BATCH_MIXTURES_FAILURE,
    EDIT_BREW_MIXTURES_REQUEST,
    DELETE_BREW_MIXTURES_REQUEST,
    EDIT_BREW_MIXTURE_SUCCESS,
    EDIT_BREW_MIXTURE_FAILURE,
    DELETE_BREW_MIXTURE_SUCCESS,
    DELETE_BREW_MIXTURE_FAILURE,
    CREATE_BATCH_MIXTURE_REQUEST,
    CREATE_BATCH_MIXTURE_SUCCESS,
    CREATE_BATCH_MIXTURE_FAILURE,
} from "./actionTypes";
import { api } from "./api";

function* fetchBatchMixturesGenerator(action) {
    try {
        const res = yield call(api.fetchMixtures, get(action, "payload"));
        yield put({
            type: FETCH_BATCH_MIXTURES_SUCCESS,
            payload: {
                content: [...res.data.content],
                initial: [...res.data.content],
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_BATCH_MIXTURES_FAILURE,
            payload: {},
        });
    }
}

function* createBatchMixtureGenerator(action) {
    try {
        const res = yield call(api.createMixture, get(action, "payload"));
        yield put({
            type: CREATE_BATCH_MIXTURE_SUCCESS,
            payload: { ...res.data },
        });
    } catch (e) {
        yield put({
            type: CREATE_BATCH_MIXTURE_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* editBatchMixtureGenerator(action) {
    try {
        const mixtures = yield select(
            (state) => state.Batch.BatchMixtures.content
        );
        const res = yield call(
            api.updateMixture,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        // insert mixture from response
        const data = [...mixtures];
        const index = mixtures.findIndex((s) => s.id === res.data.id);
        data.splice(index, 1);
        data.splice(index, 0, res.data);
        yield put({
            type: EDIT_BREW_MIXTURE_SUCCESS,
            payload: { content: data, initial: data },
        });
    } catch (e) {
        yield put({
            type: EDIT_BREW_MIXTURE_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* deleteBatchMixtureGenerator(action) {
    try {
        yield call(api.deleteMixture, get(action, "payload.mixtures"));
        yield put({
            type: DELETE_BREW_MIXTURE_SUCCESS,
            payload: get(action, "payload"),
        });
    } catch (e) {
        yield put({ type: DELETE_BREW_MIXTURE_FAILURE });
    }
}

function* Mixture() {
    yield takeEvery(FETCH_BATCH_MIXTURES_REQUEST, fetchBatchMixturesGenerator);
    yield takeEvery(CREATE_BATCH_MIXTURE_REQUEST, createBatchMixtureGenerator);
    yield takeEvery(EDIT_BREW_MIXTURES_REQUEST, editBatchMixtureGenerator);
    yield takeEvery(DELETE_BREW_MIXTURES_REQUEST, deleteBatchMixtureGenerator);
}

export default Mixture;
