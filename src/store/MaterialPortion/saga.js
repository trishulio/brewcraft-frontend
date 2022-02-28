import {
    FETCH_MATERIAL_PORTION_BY_ID_REQUEST,
    FETCH_MATERIAL_PORTIONS_BY_MIXTURE_ID_REQUEST,
    FETCH_MATERIAL_PORTION_BY_BREW_ID_REQUEST,
    SET_MATERIAL_PORTION_DETAILS,
    ADD_MASH_MATERIAL_PORTION_SUCCESS,
    ADD_MASH_MATERIAL_PORTION_FAILURE,
    ADD_FERMENT_MATERIAL_PORTION_REQUEST,
    ADD_FERMENT_MATERIAL_PORTION_SUCCESS,
    ADD_FERMENT_MATERIAL_PORTION_FAILURE,
    EDIT_FERMENT_MATERIAL_PORTION_REQUEST,
    DELETE_FERMENT_MATERIAL_PORTION_REQUEST,
    EDIT_FERMENT_MATERIAL_PORTION_SUCCESS,
    DELETE_FERMENT_MATERIAL_PORTION_SUCCESS,
    EDIT_FERMENT_MATERIAL_PORTION_FAILURE,
    DELETE_FERMENT_MATERIAL_PORTION_FAILURE,
    FETCH_MATERIAL_PORTION_BY_BREW_ID_FAILURE,
    FETCH_MATERIAL_PORTIONS_BY_BREW_ID_SUCCESS,
    DELETE_MATERIAL_PORTIONS_REQUEST,
    EDIT_MATERIAL_PORTIONS_REQUEST,
    ADD_MATERIAL_PORTIONS_REQUEST,
    EDIT_MATERIAL_PORTIONS_SUCCESS,
    EDIT_MATERIAL_PORTIONS_FAILURE,
    DELETE_MATERIAL_PORTIONS_SUCCESS,
    DELETE_MATERIAL_PORTIONS_FAILURE,
} from "./actionTypes";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";
import { fetchMaterialPortionsByBrewId } from "./actions";
import React from "react";

function* fetchMaterialPortionByIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchMaterialPortionById,
            get(action, "payload.id")
        );
        yield put({
            type: SET_MATERIAL_PORTION_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchMaterialPortionsByMixtureIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchMaterialPortionsByMixtureId,
            get(action, "payload.id")
        );
        yield put({
            type: SET_MATERIAL_PORTION_DETAILS,
            payload: { content: res.data.content },
        });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchMaterialPortionByBrewIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchMaterialPortionsByBrewId,
            get(action, "payload.id")
        );
        yield put({
            type: FETCH_MATERIAL_PORTIONS_BY_BREW_ID_SUCCESS,
            payload: {
                content: JSON.parse(JSON.stringify(res.data.content)),
                initial: JSON.parse(JSON.stringify(res.data.content)),
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_MATERIAL_PORTION_BY_BREW_ID_FAILURE,
            error: "<strong>Oh snap!</strong> Change a few things up and try submitting again.",
        });
    }
}

function* addMaterialPortionsGenerator(action) {
    try {
        yield call(api.addMixtureMaterialPortion, get(action, "payload.form"));
        const id = yield select((state) => state.Batch.Batch.data.id);
        yield put(fetchMaterialPortionsByBrewId(id));
        yield put({
            type: ADD_MASH_MATERIAL_PORTION_SUCCESS,
            payload: {},
        });
    } catch (e) {
        yield put({
            type: ADD_MASH_MATERIAL_PORTION_FAILURE,
            error: "<strong>Oh snap!</strong> Change a few things up and try submitting again.",
        });
    }
}

function* editMaterialPortionsGenerator(action) {
    try {
        yield call(api.updateMaterialPortion, get(action, "payload.form"));
        const id = yield select((state) => state.Batch.Batch.data.id);
        yield put(fetchMaterialPortionsByBrewId(id));
        yield put({
            type: EDIT_MATERIAL_PORTIONS_SUCCESS,
            payload: {},
        });
    } catch (e) {
        yield put({
            type: EDIT_MATERIAL_PORTIONS_FAILURE,
            payload: {
                error: (
                    <React.Fragment>
                        <strong>
                            {e.response.data.error + "!" || "Oh snap!"}
                        </strong>{" "}
                        {e.response.data.message ||
                            "Change a few things up and try submitting again."}
                    </React.Fragment>
                ),
            },
        });
    }
}

function* deleteMaterialPortionsGenerator(action) {
    try {
        yield call(api.deleteMaterialPortion, get(action, "payload.form"));
        yield put({
            type: DELETE_MATERIAL_PORTIONS_SUCCESS,
            payload: get(action, "payload"),
        });
    } catch (e) {
        yield put({
            type: DELETE_MATERIAL_PORTIONS_FAILURE,
            error: "<strong>Oh snap!</strong> Change a few things up and try submitting again.",
        });
    }
}

function* addFermentMaterialPortionGenerator(action) {
    try {
        const res = yield call(
            api.addMixtureMaterialPortion,
            get(action, "payload.form")
        );
        yield put({
            type: ADD_FERMENT_MATERIAL_PORTION_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
        yield put(fetchMaterialPortionsByBrewId(get(action, "payload.brewId")));
    } catch (e) {
        yield put({ type: ADD_FERMENT_MATERIAL_PORTION_FAILURE });
    }
}

function* editFermentMaterialPortionGenerator(action) {
    try {
        const res = yield call(
            api.updateMaterialPortion,
            get(action, "payload.form")
        );
        yield put({
            type: EDIT_FERMENT_MATERIAL_PORTION_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put({ type: EDIT_FERMENT_MATERIAL_PORTION_FAILURE });
    }
}

function* deleteFermentMaterialPortionGenerator(action) {
    try {
        yield call(api.deleteMaterialPortion, get(action, "payload.form"));
        yield put({
            type: DELETE_FERMENT_MATERIAL_PORTION_SUCCESS,
            payload: get(action, "payload"),
        });
    } catch (e) {
        yield put({ type: DELETE_FERMENT_MATERIAL_PORTION_FAILURE });
    }
}

function* MaterialPortion() {
    yield takeEvery(
        FETCH_MATERIAL_PORTION_BY_ID_REQUEST,
        fetchMaterialPortionByIdGenerator
    );
    yield takeEvery(
        FETCH_MATERIAL_PORTION_BY_BREW_ID_REQUEST,
        fetchMaterialPortionByBrewIdGenerator
    );
    yield takeEvery(
        FETCH_MATERIAL_PORTIONS_BY_MIXTURE_ID_REQUEST,
        fetchMaterialPortionsByMixtureIdGenerator
    );
    yield takeEvery(
        ADD_MATERIAL_PORTIONS_REQUEST,
        addMaterialPortionsGenerator
    );
    yield takeEvery(
        EDIT_MATERIAL_PORTIONS_REQUEST,
        editMaterialPortionsGenerator
    );
    yield takeEvery(
        DELETE_MATERIAL_PORTIONS_REQUEST,
        deleteMaterialPortionsGenerator
    );
    yield takeEvery(
        ADD_FERMENT_MATERIAL_PORTION_REQUEST,
        addFermentMaterialPortionGenerator
    );
    yield takeEvery(
        EDIT_FERMENT_MATERIAL_PORTION_REQUEST,
        editFermentMaterialPortionGenerator
    );
    yield takeEvery(
        DELETE_FERMENT_MATERIAL_PORTION_REQUEST,
        deleteFermentMaterialPortionGenerator
    );
}

export default MaterialPortion;
