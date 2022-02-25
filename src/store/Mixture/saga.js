import {
    FETCH_MIXTURE_BY_BREW_ID_REQUEST,
    SET_FERMENT_MIXTURE_DETAILS,
    FETCH_FERMENT_MIXTURE_BY_ID_REQUEST,
    ADD_FERMENT_MIXTURE_REQUEST,
    EDIT_FERMENT_MIXTURE_REQUEST,
    DELETE_FERMENT_MIXTURE_REQUEST,
    EDIT_FERMENT_MIXTURE_SUCCESS,
    DELETE_FERMENT_MIXTURE_SUCCESS,
    EDIT_FERMENT_MIXTURE_FAILURE,
    DELETE_FERMENT_MIXTURE_FAILURE,
    FETCH_FERMENT_MIXTURE_BY_ID_FAILURE,
    ADD_FERMENT_MIXTURE_FAILURE,
    FETCH_MIXTURE_BY_BREW_ID_SUCCESS,
    FETCH_MIXTURE_BY_BREW_ID_FAILURE,
    ADD_BREW_MIXTURES_REQUEST,
    EDIT_BREW_MIXTURES_REQUEST,
    DELETE_BREW_MIXTURES_REQUEST,
    EDIT_BREW_MIXTURE_SUCCESS,
    EDIT_BREW_MIXTURE_FAILURE,
    DELETE_BREW_MIXTURE_SUCCESS,
    DELETE_BREW_MIXTURE_FAILURE,
    ADD_BREW_MIXTURE_FAILURE,
} from "./actionTypes";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackSuccess } from "../Snackbar/actions";

function* fetchMixturesByBrewIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchMixturesByBrewId,
            get(action, "payload.id")
        );
        yield put({
            type: FETCH_MIXTURE_BY_BREW_ID_SUCCESS,
            payload: {
                content: [...res.data.content],
                initial: [...res.data.content],
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_MIXTURE_BY_BREW_ID_FAILURE,
            payload: {},
        });
    }
}

function* addBrewMixtureGenerator(action) {
    try {
        yield call(api.addMixture, get(action, "payload.params"));
    } catch (e) {
        yield put({ type: ADD_BREW_MIXTURE_FAILURE });
    }
}

function* editBrewMixtureGenerator(action) {
    try {
        const mixtures = yield select((state) => state.Batch.Mixtures.content);
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
        yield put({ type: EDIT_BREW_MIXTURE_FAILURE });
    }
}

function* deleteBrewMixtureGenerator(action) {
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

function* fetchFermentMixtureByIdGenerator(action) {
    try {
        const res = yield call(api.fetchMixtureById, get(action, "payload.id"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({
            type: SET_FERMENT_MIXTURE_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put({ type: FETCH_FERMENT_MIXTURE_BY_ID_FAILURE });
    }
}

function* addFermentMixtureGenerator(action) {
    try {
        yield call(api.addMixture, get(action, "payload.params"));
    } catch (e) {
        yield put({ type: ADD_FERMENT_MIXTURE_FAILURE });
    }
}

function* editFermentMixtureGenerator(action) {
    try {
        const res = yield call(
            api.updateMixture,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: EDIT_FERMENT_MIXTURE_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put({ type: EDIT_FERMENT_MIXTURE_FAILURE });
    }
}

function* deleteFermentMixtureGenerator(action) {
    try {
        yield call(api.deleteMixture, get(action, "payload.id"));
        yield put({
            type: DELETE_FERMENT_MIXTURE_SUCCESS,
            payload: get(action, "payload"),
        });
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_FERMENT_MIXTURE_FAILURE });
    }
}

function* Mixture() {
    yield takeEvery(
        FETCH_MIXTURE_BY_BREW_ID_REQUEST,
        fetchMixturesByBrewIdGenerator
    );
    yield takeEvery(ADD_BREW_MIXTURES_REQUEST, addBrewMixtureGenerator);
    yield takeEvery(EDIT_BREW_MIXTURES_REQUEST, editBrewMixtureGenerator);
    yield takeEvery(DELETE_BREW_MIXTURES_REQUEST, deleteBrewMixtureGenerator);
    yield takeEvery(
        FETCH_FERMENT_MIXTURE_BY_ID_REQUEST,
        fetchFermentMixtureByIdGenerator
    );
    yield takeEvery(ADD_FERMENT_MIXTURE_REQUEST, addFermentMixtureGenerator);
    yield takeEvery(EDIT_FERMENT_MIXTURE_REQUEST, editFermentMixtureGenerator);
    yield takeEvery(
        DELETE_FERMENT_MIXTURE_REQUEST,
        deleteFermentMixtureGenerator
    );
}

export default Mixture;
