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
    DELETE_KETTLE_MATERIAL_PORTION_SUCCESS,
    DELETE_KETTLE_MATERIAL_PORTION_FAILURE,
    ADD_KETTLE_MATERIAL_PORTION_SUCCESS,
    ADD_KETTLE_MATERIAL_PORTION_FAILURE,
    EDIT_KETTLE_MATERIAL_PORTION_SUCCESS,
    EDIT_KETTLE_MATERIAL_PORTION_FAILURE,
    ADD_KETTLE_MATERIAL_PORTION_REQUEST,
    EDIT_KETTLE_MATERIAL_PORTION_REQUEST,
    DELETE_KETTLE_MATERIAL_PORTION_REQUEST,
    SET_KETTLE_MATERIAL_PORTION_DETAILS,
    ADD_FERMENT_MATERIAL_PORTION_REQUEST,
    ADD_FERMENT_MATERIAL_PORTION_SUCCESS,
    ADD_FERMENT_MATERIAL_PORTION_FAILURE,
    EDIT_FERMENT_MATERIAL_PORTION_REQUEST,
    DELETE_FERMENT_MATERIAL_PORTION_REQUEST,
    EDIT_FERMENT_MATERIAL_PORTION_SUCCESS,
    DELETE_FERMENT_MATERIAL_PORTION_SUCCESS,
    EDIT_FERMENT_MATERIAL_PORTION_FAILURE,
    DELETE_FERMENT_MATERIAL_PORTION_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";
import { fetchMaterialPortionsByBrewId } from "./actions";
import { SET_BATCH_DETAILS } from "../Brew/actionTypes";

function* fetchMaterialPortionByIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchMaterialPortionById,
            get(action, "payload.id")
        );
        res.initial = JSON.parse(JSON.stringify(res.data));
        // yield put({ type: SET_MATERIAL_PORTION_DETAILS, payload: { data: res.data, initial: res.data }});
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchMaterialPortionsByMixtureIdGenerator(action) {
    try {
        yield call(
            api.fetchMaterialPortionsByMixtureId,
            get(action, "payload.id")
        );
        // yield put({ type: SET_MATERIAL_PORTION_DETAILS, payload: { content: res.data.content }});
    } catch (e) {
        console.log(e);
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchMaterialPortionByBrewIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchMaterialPortionsByBrewId,
            get(action, "payload.id")
        );
        let content;
        content = res.data.content.filter(
            (mp) => mp.mixture.brewStage.task.name === "MASH"
        );
        yield put({
            type: SET_MASH_MATERIAL_PORTION_DETAILS,
            payload: { content: content, initial: content },
        });
        content = res.data.content.filter(
            (mp) => mp.mixture.brewStage.task.name === "BOIL"
        );
        yield put({
            type: SET_KETTLE_MATERIAL_PORTION_DETAILS,
            payload: { content: content, initial: content },
        });
    } catch (e) {
        console.log(e);
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* addMashMaterialPortionGenerator(action) {
    try {
        const res = yield call(
            api.addMaterialPortion,
            get(action, "payload.form")
        );
        yield put({
            type: ADD_MASH_MATERIAL_PORTION_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
        yield put({ type: SET_BATCH_DETAILS, payload: { save: false } });
        yield put(fetchMaterialPortionsByBrewId(get(action, "payload.brewId")));
    } catch (e) {
        yield put({ type: ADD_MASH_MATERIAL_PORTION_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editMashMaterialPortionGenerator(action) {
    try {
        const res = yield call(
            api.updateMaterialPortion,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: EDIT_MASH_MATERIAL_PORTION_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
        yield put({ type: SET_BATCH_DETAILS, payload: { save: false } });
    } catch (e) {
        yield put({ type: EDIT_MASH_MATERIAL_PORTION_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteMashMaterialPortionGenerator(action) {
    try {
        yield call(api.deleteMaterialPortion, get(action, "payload.id"));
        yield put({
            type: DELETE_MASH_MATERIAL_PORTION_SUCCESS,
            payload: get(action, "payload"),
        });
    } catch (e) {
        yield put({ type: DELETE_MASH_MATERIAL_PORTION_FAILURE });
        yield put(snackFailure());
    }
}

function* addKettleMaterialPortionGenerator(action) {
    try {
        const res = yield call(
            api.addMaterialPortion,
            get(action, "payload.form")
        );
        yield put({
            type: ADD_KETTLE_MATERIAL_PORTION_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
        yield put({ type: SET_BATCH_DETAILS, payload: { save: false } });
        yield put(fetchMaterialPortionsByBrewId(get(action, "payload.brewId")));
    } catch (e) {
        yield put({ type: ADD_KETTLE_MATERIAL_PORTION_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editKettleMaterialPortionGenerator(action) {
    try {
        const res = yield call(
            api.updateMaterialPortion,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: EDIT_KETTLE_MATERIAL_PORTION_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
        yield put({ type: SET_BATCH_DETAILS, payload: { save: false } });
    } catch (e) {
        yield put({ type: EDIT_KETTLE_MATERIAL_PORTION_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteKettleMaterialPortionGenerator(action) {
    try {
        yield call(api.deleteMaterialPortion, get(action, "payload.id"));
        yield put({
            type: DELETE_KETTLE_MATERIAL_PORTION_SUCCESS,
            payload: get(action, "payload"),
        });
    } catch (e) {
        yield put({ type: DELETE_KETTLE_MATERIAL_PORTION_FAILURE });
        yield put(snackFailure());
    }
}

function* addFermentMaterialPortionGenerator(action) {
    try {
        const res = yield call(
            api.addMaterialPortion,
            get(action, "payload.form")
        );
        yield put({
            type: ADD_FERMENT_MATERIAL_PORTION_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
        yield put({ type: SET_BATCH_DETAILS, payload: { save: false } });
        yield put(fetchMaterialPortionsByBrewId(get(action, "payload.brewId")));
    } catch (e) {
        yield put({ type: ADD_FERMENT_MATERIAL_PORTION_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editFermentMaterialPortionGenerator(action) {
    try {
        const res = yield call(
            api.updateMaterialPortion,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: EDIT_FERMENT_MATERIAL_PORTION_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
        yield put({ type: SET_BATCH_DETAILS, payload: { save: false } });
    } catch (e) {
        yield put({ type: EDIT_FERMENT_MATERIAL_PORTION_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteFermentMaterialPortionGenerator(action) {
    try {
        yield call(api.deleteMaterialPortion, get(action, "payload.id"));
        yield put({
            type: DELETE_FERMENT_MATERIAL_PORTION_SUCCESS,
            payload: get(action, "payload"),
        });
    } catch (e) {
        yield put({ type: DELETE_FERMENT_MATERIAL_PORTION_FAILURE });
        yield put(snackFailure());
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
        ADD_MASH_MATERIAL_PORTION_REQUEST,
        addMashMaterialPortionGenerator
    );
    yield takeEvery(
        EDIT_MASH_MATERIAL_PORTION_REQUEST,
        editMashMaterialPortionGenerator
    );
    yield takeEvery(
        DELETE_MASH_MATERIAL_PORTION_REQUEST,
        deleteMashMaterialPortionGenerator
    );
    yield takeEvery(
        ADD_KETTLE_MATERIAL_PORTION_REQUEST,
        addKettleMaterialPortionGenerator
    );
    yield takeEvery(
        EDIT_KETTLE_MATERIAL_PORTION_REQUEST,
        editKettleMaterialPortionGenerator
    );
    yield takeEvery(
        DELETE_KETTLE_MATERIAL_PORTION_REQUEST,
        deleteKettleMaterialPortionGenerator
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
