import {
    FETCH_ALL_BREW_STAGE_REQUEST,
    ADD_BREW_STAGE_SUCCESS,
    ADD_BREW_STAGE_FAILURE,
    FETCH_BREW_STAGES_BY_BREW_ID_SUCCESS,
    FETCH_BREW_STAGES_BY_BREW_ID_FAILURE,
    EDIT_BREW_STAGES_REQUEST,
    EDIT_BREW_STAGES_SUCCESS,
    EDIT_BREW_STAGES_FAILURE,
    ADD_BREW_STAGE_REQUEST,
    DELETE_BREW_STAGE_REQUEST,
    DELETE_BREW_STAGE_SUCCESS,
    DELETE_BREW_STAGE_FAILURE,
    FETCH_FERMENT_STAGE_BY_ID_REQUEST,
    SET_FERMENT_STAGE_DETAILS,
    ADD_FERMENT_STAGE_REQUEST,
    ADD_FERMENT_STAGE_SUCCESS,
    ADD_FERMENT_STAGE_FAILURE,
    EDIT_FERMENT_STAGE_REQUEST,
    DELETE_FERMENT_STAGE_REQUEST,
    EDIT_FERMENT_STAGE_SUCCESS,
    DELETE_FERMENT_STAGE_SUCCESS,
    EDIT_FERMENT_STAGE_FAILURE,
    DELETE_FERMENT_STAGE_FAILURE,
} from "./actionTypes";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { fetchAllBrewStages } from "./actions";
import { fetchMixturesByBrewId, setGlobalRedirect } from "../actions";

function* fetchAllBrewStagesGenerator(action) {
    try {
        const res = yield call(api.fetchBrewStages, get(action, "payload.id"));
        yield put({
            type: FETCH_BREW_STAGES_BY_BREW_ID_SUCCESS,
            payload: {
                content: [...res.data.content],
                initial: [...res.data.content],
            },
        });

        let data;
        data = res.data.content.find((s) => s.task.name === "FERMENT");
        if (data) {
            yield put({
                type: SET_FERMENT_STAGE_DETAILS,
                payload: { data, initial: data },
            });
        }
    } catch (e) {
        yield put({
            type: FETCH_BREW_STAGES_BY_BREW_ID_FAILURE,
        });
    }
}

function* addBrewStageGenerator(action) {
    try {
        const batch = yield select((state) => {
            return state.Batch.Batch.data;
        });
        const res = yield call(api.addBrewStage, get(action, "payload.form"));
        yield call(api.addMixture, {
            parentMixtureIds: get(action, "payload.parentMixtureIds"),
            brewStageId: res.data[0].id,
            quantity: {
                symbol: "hl",
                value: 0,
            },
        });
        yield put({
            type: ADD_BREW_STAGE_SUCCESS,
            payload: {},
        });
        yield put(fetchAllBrewStages(batch.id));
        yield put(fetchMixturesByBrewId(batch.id));
    } catch (e) {
        yield put({ type: ADD_BREW_STAGE_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editBrewStagesGenerator(action) {
    try {
        const res = yield call(
            api.updateBrewStage,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        const stages = yield select((state) => {
            return state.Batch.Stages.content;
        });
        // insert stage from response
        const data = [...stages];
        const index = stages.findIndex((s) => s.id === res.data.id);
        data.splice(index, 1);
        data.splice(index, 0, res.data);
        yield put({
            type: EDIT_BREW_STAGES_SUCCESS,
            payload: { data: data, initial: data },
        });
    } catch (e) {
        yield put({ type: EDIT_BREW_STAGES_FAILURE });
    }
}

function* deleteBrewStageGenerator(action) {
    try {
        yield call(api.deleteBrewStage, get(action, "payload.id"));
        const id = yield select((state) => state.Batch.Batch.data.id);
        yield put(setGlobalRedirect({ pathname: "/brews/" + id }));
        yield put({ type: DELETE_BREW_STAGE_SUCCESS });
    } catch (e) {
        yield put({ type: DELETE_BREW_STAGE_FAILURE });
        yield put(snackFailure());
    }
}

function* fetchFermentStageByIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchBrewStageById,
            get(action, "payload.id")
        );
        yield put({
            type: SET_FERMENT_STAGE_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* addFermentStageGenerator(action) {
    try {
        const transferMixture = yield select((state) => {
            return state.Batch.TransferMixture.data;
        });
        const batch = yield select((state) => {
            return state.Batch.Batch.data;
        });
        const res = yield call(api.addBrewStage, get(action, "payload.form"));
        yield call(api.addMixture, {
            parentMixtureIds: [transferMixture.id],
            quantity: {
                symbol: "hl",
                value: 0,
            },
            brewStageId: res.data[0].id,
        });
        yield put({
            type: ADD_FERMENT_STAGE_SUCCESS,
            payload: {},
        });
        yield put(fetchAllBrewStages(batch.id));
        yield put(fetchMixturesByBrewId(batch.id));
    } catch (e) {
        yield put({ type: ADD_FERMENT_STAGE_FAILURE });
    }
}

function* editFermentStageGenerator(action) {
    try {
        const res = yield call(
            api.updateBrewStage,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: EDIT_FERMENT_STAGE_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put({ type: EDIT_FERMENT_STAGE_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteFermentStageGenerator(action) {
    try {
        yield call(api.deleteBrewStage, get(action, "payload.id"));
        yield put({
            type: DELETE_FERMENT_STAGE_SUCCESS,
            payload: get(action, "payload"),
        });
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_FERMENT_STAGE_FAILURE });
        yield put(snackFailure());
    }
}

function* BrewStage() {
    yield takeEvery(FETCH_ALL_BREW_STAGE_REQUEST, fetchAllBrewStagesGenerator);
    yield takeEvery(ADD_BREW_STAGE_REQUEST, addBrewStageGenerator);
    yield takeEvery(EDIT_BREW_STAGES_REQUEST, editBrewStagesGenerator);
    yield takeEvery(DELETE_BREW_STAGE_REQUEST, deleteBrewStageGenerator);
    yield takeEvery(
        FETCH_FERMENT_STAGE_BY_ID_REQUEST,
        fetchFermentStageByIdGenerator
    );
    yield takeEvery(ADD_FERMENT_STAGE_REQUEST, addFermentStageGenerator);
    yield takeEvery(EDIT_FERMENT_STAGE_REQUEST, editFermentStageGenerator);
    yield takeEvery(DELETE_FERMENT_STAGE_REQUEST, deleteFermentStageGenerator);
}

export default BrewStage;
