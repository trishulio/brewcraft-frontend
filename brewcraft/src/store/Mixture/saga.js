import {
    FETCH_MIXTURE_BY_ID_REQUEST,
    FETCH_MIXTURE_BY_BREW_ID_REQUEST,
    SET_MIXTURE_DETAILS,
    ADD_MIXTURE_REQUEST,
    EDIT_MIXTURE_REQUEST,
    DELETE_MIXTURE_REQUEST,
    EDIT_MIXTURE_SUCCESS,
    DELETE_MIXTURE_SUCCESS,
    EDIT_MIXTURE_FAILURE,
    DELETE_MIXTURE_FAILURE
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../Brewery/actions";

function* fetchMixturesByBrewId(action) {
    try {
        const res = yield call(api.fetchMixturesByBrewId, get(action, "payload.id"));
        for (let i = 0; i < res.data.content.length; i++) {
            const mixture = res.data.content[i];
            let r;
            r = yield call(api.fetchMaterialPortionsByMixtureId, mixture.id);
            mixture.materialPortions = r.data.content;
            r = yield call(api.fetchMixtureRecordingsByMixtureId, mixture.id);
            mixture.mixtureRecordings = r.data.content;
        }
        yield put({ type: SET_MIXTURE_DETAILS, payload: { content: res.data.content }});
    } catch (e) {
        console.log(e);
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchMixtureByIdGenerator(action) {
    try {
        const res = yield call(api.fetchMixtureById,get(action, "payload.id"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_MIXTURE_DETAILS, payload: { data: res.data, initial: res.data }});
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* addMixtureGenerator(action) {
    try {
        yield call(api.addMixture, get(action, "payload.params"));
    } catch (e) {
        console.log(e);
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editMixtureGenerator(action) {
    try {
        const res = yield call(api.updateMixture, get(action, "payload.id"), get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: EDIT_MIXTURE_SUCCESS, payload: { data: res.data, initial: res.data }});
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_MIXTURE_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteMixtureGenerator(action) {
    try {
        yield call(api.deleteMixture, get(action, "payload.id"));
        yield put({ type: DELETE_MIXTURE_SUCCESS , payload : get(action, "payload") });
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_MIXTURE_FAILURE });
        yield put(snackFailure());
    }
}

function* Mixture() {
    yield takeEvery(FETCH_MIXTURE_BY_ID_REQUEST, fetchMixtureByIdGenerator);
    yield takeEvery(FETCH_MIXTURE_BY_BREW_ID_REQUEST, fetchMixturesByBrewId);
    yield takeEvery(ADD_MIXTURE_REQUEST, addMixtureGenerator);
    yield takeEvery(EDIT_MIXTURE_REQUEST, editMixtureGenerator);
    yield takeEvery(DELETE_MIXTURE_REQUEST, deleteMixtureGenerator);
}

export default Mixture;