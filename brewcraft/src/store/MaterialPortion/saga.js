import {
    FETCH_MATERIAL_PORTION_BY_ID_REQUEST,
    SET_MATERIAL_PORTION_DETAILS,
    ADD_MATERIAL_PORTION_REQUEST,
    ADD_MATERIAL_PORTION_SUCCESS,
    ADD_MATERIAL_PORTION_FAILURE,
    EDIT_MATERIAL_PORTION_REQUEST,
    DELETE_MATERIAL_PORTION_REQUEST,
    EDIT_MATERIAL_PORTION_SUCCESS,
    DELETE_MATERIAL_PORTION_SUCCESS,
    EDIT_MATERIAL_PORTION_FAILURE,
    DELETE_MATERIAL_PORTION_FAILURE
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../Brewery/actions";

function* fetchMaterialPortionByIdGenerator(action) {
    try {
        const res = yield call(api.fetchMaterialPortionById,get(action, "payload.id"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_MATERIAL_PORTION_DETAILS, payload: { data: res.data, initial: res.data }});
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* addMaterialPortionGenerator(action) {
    try {
        const res = yield call(api.addMaterialPortion, get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: ADD_MATERIAL_PORTION_SUCCESS, payload: { data: res.data, initial: res.data }});
        yield put(setGlobalRedirect({ pathname: "/materials/brews/mixtures/portionsss/" + res.data.id }));
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: ADD_MATERIAL_PORTION_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editMaterialPortionGenerator(action) {
    try {
        const res = yield call(api.updateMaterialPortion, get(action, "payload.id"), get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: EDIT_MATERIAL_PORTION_SUCCESS, payload: { data: res.data, initial: res.data }});
        yield put(setGlobalRedirect({ pathname: "/materials/brews/mixtures/portionsss/" + res.data.id }));
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_MATERIAL_PORTION_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteMaterialPortionGenerator(action) {
    try {
        yield call(api.deleteMaterialPortion, get(action, "payload.id"));
        yield put({ type: DELETE_MATERIAL_PORTION_SUCCESS , payload : get(action, "payload") });
        yield put(setGlobalRedirect({ pathname: "/materials/brews/mixtures/portionsss" }));
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_MATERIAL_PORTION_FAILURE });
        yield put(snackFailure());
    }
}

function* MaterialPortion() {
    yield takeEvery(FETCH_MATERIAL_PORTION_BY_ID_REQUEST, fetchMaterialPortionByIdGenerator);
    yield takeEvery(ADD_MATERIAL_PORTION_REQUEST, addMaterialPortionGenerator);
    yield takeEvery(EDIT_MATERIAL_PORTION_REQUEST, editMaterialPortionGenerator);
    yield takeEvery(DELETE_MATERIAL_PORTION_REQUEST, deleteMaterialPortionGenerator);
}

export default MaterialPortion;