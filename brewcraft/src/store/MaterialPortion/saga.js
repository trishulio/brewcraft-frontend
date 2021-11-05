import {
    FETCH_MATERIAL_PORTION_BY_ID_REQUEST,
    FETCH_MATERIAL_PORTIONS_BY_MIXTURE_ID_REQUEST,
    FETCH_MATERIAL_PORTION_BY_BREW_ID_REQUEST,
    SET_MASH_MATERIAL_PORTION_DETAILS,
    ADD_MASH_MATERIAL_PORTION_REQUEST,
    ADD_MASH_MATERIAL_PORTION_SUCCESS,
    ADD_MASH_MATERIAL_PORTION_FAILURE,
    EDIT_MASH_MATERIAL_PORTION_REQUEST,
    DELETE_MASH_MATERIAL_PORTION_REQUEST,
    EDIT_MASH_MATERIAL_PORTION_SUCCESS,
    DELETE_MASH_MATERIAL_PORTION_SUCCESS,
    EDIT_MASH_MATERIAL_PORTION_FAILURE,
    DELETE_MASH_MATERIAL_PORTION_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { fetchMaterialPortionsByBrewId } from "./actions";

function* fetchMaterialPortionByIdGenerator(action) {
    try {
        const res = yield call(api.fetchMaterialPortionById, get(action, "payload.id"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        // yield put({ type: SET_MATERIAL_PORTION_DETAILS, payload: { data: res.data, initial: res.data }});
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchMaterialPortionsByMixtureIdGenerator(action) {
    try {
        const res = yield call(api.fetchMaterialPortionsByMixtureId, get(action, "payload.id"));
        // yield put({ type: SET_MATERIAL_PORTION_DETAILS, payload: { content: res.data.content }});
    } catch (e) {
        console.log(e);
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchMaterialPortionByBrewIdGenerator(action) {
    try {
        const res = yield call(api.fetchMaterialPortionsByBrewId, get(action, "payload.id"));
        yield put({ type: SET_MASH_MATERIAL_PORTION_DETAILS, payload: { content: res.data.content, initial: res.data.content }});
    } catch (e) {
        console.log(e);
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* addMashMaterialPortionGenerator(action) {
    try {
        const res = yield call(api.addMaterialPortion, get(action, "payload.form"));
        yield put({ type: ADD_MASH_MATERIAL_PORTION_SUCCESS, payload: { data: res.data, initial: res.data }});
        yield put(fetchMaterialPortionsByBrewId(get(action, "payload.brewId")));
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: ADD_MASH_MATERIAL_PORTION_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editMashMaterialPortionGenerator(action) {
    try {
        const res = yield call(api.updateMaterialPortion, get(action, "payload.id"), get(action, "payload.form"));
        yield put({ type: EDIT_MASH_MATERIAL_PORTION_SUCCESS, payload: { data: res.data, initial: res.data }});
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_MASH_MATERIAL_PORTION_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteMashMaterialPortionGenerator(action) {
    try {
        yield call(api.deleteMaterialPortion, get(action, "payload.id"));
        yield put({ type: DELETE_MASH_MATERIAL_PORTION_SUCCESS , payload : get(action, "payload") });
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_MASH_MATERIAL_PORTION_FAILURE });
        yield put(snackFailure());
    }
}

function* MaterialPortion() {
    yield takeEvery(FETCH_MATERIAL_PORTION_BY_ID_REQUEST, fetchMaterialPortionByIdGenerator);
    yield takeEvery(FETCH_MATERIAL_PORTION_BY_BREW_ID_REQUEST, fetchMaterialPortionByBrewIdGenerator);
    yield takeEvery(FETCH_MATERIAL_PORTIONS_BY_MIXTURE_ID_REQUEST, fetchMaterialPortionsByMixtureIdGenerator);
    yield takeEvery(ADD_MASH_MATERIAL_PORTION_REQUEST, addMashMaterialPortionGenerator);
    yield takeEvery(EDIT_MASH_MATERIAL_PORTION_REQUEST, editMashMaterialPortionGenerator);
    yield takeEvery(DELETE_MASH_MATERIAL_PORTION_REQUEST, deleteMashMaterialPortionGenerator);
}

export default MaterialPortion;