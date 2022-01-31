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
    TRANSFER_TO_FERMENT_STAGE_REQUEST,
    TRANSFER_TO_FERMENT_STAGE_SUCCESS,
    TRANSFER_TO_FERMENT_STAGE_FAILURE,
} from "./actionTypes";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { fetchAllBrewStages } from "./actions";
import { fetchMixturesByBrewId, setGlobalRedirect } from "../actions";
import {
    EDIT_BREW_MIXTURES_REQUEST,
    FETCH_MIXTURE_BY_BREW_ID_REQUEST,
} from "../Mixture/actionTypes";

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
    } catch (e) {
        yield put({
            type: FETCH_BREW_STAGES_BY_BREW_ID_FAILURE,
        });
    }
}

function* addBrewStageGenerator(action) {
    try {
        debugger;
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
    }
}

function* transferToFermentStageGenerator(action) {
    try {
        const batch = yield select((state) => {
            return state.Batch.Batch.data;
        });
        let res;
        if (get(action, "payload.fermentMixtureId")) {
            res = yield call(api.addBrewStage, [
                {
                    brewId: batch.id,
                    taskId: 6, // transfer
                    statusId: 2,
                    startedAt: new Date().toISOString(),
                },
            ]);
        } else {
            res = yield call(api.addBrewStage, [
                {
                    brewId: batch.id,
                    taskId: 6, // transfer
                    statusId: 2,
                    startedAt: new Date().toISOString(),
                },
                {
                    brewId: batch.id,
                    taskId: 7, // ferment
                    statusId: 1,
                    startedAt: new Date().toISOString(),
                },
            ]);
        }
        const [transferStage, fermentStage] = res.data;
        res = yield call(api.addMixture, {
            parentMixtureIds: get(action, "payload.parentMixtureIds"),
            brewStageId: transferStage.id,
            quantity: {
                symbol: "hl",
                value: 0,
            },
        });
        if (fermentStage) {
            yield call(api.addMixture, {
                parentMixtureIds: [res.data.id],
                brewStageId: fermentStage.id,
                quantity: {
                    symbol: "hl",
                    value: 0,
                },
            });
        } else {
            // update existing ferment mixture
            const mixture = yield select((state) => {
                return state.Batch.Mixtures.content.find(
                    (m) => m.id === get(action, "payload.fermentMixtureId")
                );
            });
            mixture.parentMixtureIds = [
                ...mixture.parentMixtureIds,
                res.data.id,
            ];
            yield put({
                type: EDIT_BREW_MIXTURES_REQUEST,
                payload: { ...mixture },
            });
        }
        yield put({
            type: FETCH_ALL_BREW_STAGE_REQUEST,
            payload: {
                id: batch.id,
            },
        });
        yield put({
            type: FETCH_MIXTURE_BY_BREW_ID_REQUEST,
            payload: {
                id: batch.id,
            },
        });
        yield put({
            type: TRANSFER_TO_FERMENT_STAGE_SUCCESS,
        });
    } catch (e) {
        yield put({
            type: TRANSFER_TO_FERMENT_STAGE_FAILURE,
        });
    }
}

function* BrewStage() {
    yield takeEvery(FETCH_ALL_BREW_STAGE_REQUEST, fetchAllBrewStagesGenerator);
    yield takeEvery(ADD_BREW_STAGE_REQUEST, addBrewStageGenerator);
    yield takeEvery(EDIT_BREW_STAGES_REQUEST, editBrewStagesGenerator);
    yield takeEvery(DELETE_BREW_STAGE_REQUEST, deleteBrewStageGenerator);
    yield takeEvery(
        TRANSFER_TO_FERMENT_STAGE_REQUEST,
        transferToFermentStageGenerator
    );
}

export default BrewStage;
