import { get } from "lodash";
import { call, put, select, takeEvery } from "redux-saga/effects";
import {
    FETCH_BREW_MIXTURES_REQUEST,
    FETCH_BREW_MIXTURES_SUCCESS,
    FETCH_BREW_MIXTURES_FAILURE,
    ADD_BREW_MIXTURES_REQUEST,
    EDIT_BREW_MIXTURES_REQUEST,
    DELETE_BREW_MIXTURES_REQUEST,
    EDIT_BREW_MIXTURE_SUCCESS,
    EDIT_BREW_MIXTURE_FAILURE,
    DELETE_BREW_MIXTURE_SUCCESS,
    DELETE_BREW_MIXTURE_FAILURE,
    ADD_BREW_MIXTURE_FAILURE,
} from "./actionTypes";
import { api } from "./api";

function* fetchBatchMixturesGenerator(action) {
    try {
        const res = yield call(api.fetchMixtures, get(action, "payload"));
        yield put({
            type: FETCH_BREW_MIXTURES_SUCCESS,
            payload: {
                content: [...res.data.content],
                initial: [...res.data.content],
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_BREW_MIXTURES_FAILURE,
            payload: {},
        });
    }
}

function* addBatchMixtureGenerator(action) {
    try {
        yield call(api.addMixture, get(action, "payload.params"));
    } catch (e) {
        yield put({ type: ADD_BREW_MIXTURE_FAILURE });
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
        // insert stage from response
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
    yield takeEvery(FETCH_BREW_MIXTURES_REQUEST, fetchBatchMixturesGenerator);
    yield takeEvery(ADD_BREW_MIXTURES_REQUEST, addBatchMixtureGenerator);
    yield takeEvery(EDIT_BREW_MIXTURES_REQUEST, editBatchMixtureGenerator);
    yield takeEvery(DELETE_BREW_MIXTURES_REQUEST, deleteBatchMixtureGenerator);
}

export default Mixture;
