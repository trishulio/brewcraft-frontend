import {
    all,
    call,
    put,
    race,
    select,
    take,
    takeEvery,
} from "redux-saga/effects";
import { get } from "lodash";
import { fetchBrewMixtures } from "../actions";
import {
    FETCH_BREW_MIXTURES_FAILURE,
    FETCH_BREW_MIXTURES_SUCCESS,
} from "../BrewMixtures/actionTypes";
import {
    ADD_BREW_STAGE_SUCCESS,
    ADD_BREW_STAGE_FAILURE,
    FETCH_BREW_STAGES_REQUEST,
    FETCH_BREW_STAGES_SUCCESS,
    FETCH_BREW_STAGES_FAILURE,
    EDIT_BREW_STAGES_REQUEST,
    EDIT_BREW_STAGES_SUCCESS,
    EDIT_BREW_STAGES_FAILURE,
    ADD_BREW_STAGE_REQUEST,
    DELETE_BREW_STAGE_REQUEST,
    DELETE_BREW_STAGE_SUCCESS,
    DELETE_BREW_STAGE_FAILURE,
} from "./actionTypes";
import { fetchBrewStages } from "./actions";
import { api } from "./api";

function* fetchBrewStagesGenerator(action) {
    try {
        const res = yield call(api.fetchBrewStages, get(action, "payload"));
        yield put({
            type: FETCH_BREW_STAGES_SUCCESS,
            payload: {
                content: [...res.data.content],
                initial: [...res.data.content],
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_BREW_STAGES_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
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
        yield put(fetchBrewStages(batch.id));
        yield put(
            fetchBrewMixtures({
                brewId: batch.id,
            })
        );
        const [success, stageFailed, mixtureFailed] = yield race([
            all([
                take(FETCH_BREW_STAGES_SUCCESS),
                take(FETCH_BREW_MIXTURES_SUCCESS),
            ]),
            take(FETCH_BREW_STAGES_FAILURE),
            take(FETCH_BREW_MIXTURES_FAILURE),
        ]);
        if (success) {
            yield put({ type: ADD_BREW_STAGE_SUCCESS });
        } else {
            yield put({
                type: DELETE_BREW_STAGE_FAILURE,
                payload: {
                    error: stageFailed
                        ? get(stageFailed, "payload.error")
                        : get(mixtureFailed, "payload.error"),
                },
            });
        }
    } catch (e) {
        yield put({
            type: ADD_BREW_STAGE_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* editBrewStagesGenerator(action) {
    try {
        const stages = yield select((state) => {
            return state.Batch.Stages.content;
        });
        const res = yield call(
            api.updateBrewStage,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        // insert stage from response
        const data = [...stages];
        const index = stages.findIndex((s) => s.id === res.data.id);
        data.splice(index, 1);
        data.splice(index, 0, res.data);
        yield put({
            type: EDIT_BREW_STAGES_SUCCESS,
            payload: { content: data, initial: data },
        });
    } catch (e) {
        yield put({
            type: EDIT_BREW_STAGES_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* deleteBrewStageGenerator(action) {
    try {
        const batch = yield select((state) => state.Batch.Batch.data);
        yield call(api.deleteBrewStage, get(action, "payload.stage.id"));
        yield put(fetchBrewStages(batch.id));
        yield put(
            fetchBrewMixtures({
                brewId: batch.id,
            })
        );
        const [success, stageFailed, mixtureFailed] = yield race([
            all([
                take(FETCH_BREW_STAGES_SUCCESS),
                take(FETCH_BREW_MIXTURES_SUCCESS),
            ]),
            take(FETCH_BREW_STAGES_FAILURE),
            take(FETCH_BREW_MIXTURES_FAILURE),
        ]);
        if (success) {
            yield put({ type: DELETE_BREW_STAGE_SUCCESS });
        } else {
            yield put({
                type: DELETE_BREW_STAGE_FAILURE,
                payload: {
                    error: stageFailed
                        ? get(stageFailed, "payload.error")
                        : get(mixtureFailed, "payload.error"),
                },
            });
        }
    } catch (e) {
        yield put({
            type: DELETE_BREW_STAGE_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* BrewStage() {
    yield takeEvery(FETCH_BREW_STAGES_REQUEST, fetchBrewStagesGenerator);
    yield takeEvery(ADD_BREW_STAGE_REQUEST, addBrewStageGenerator);
    yield takeEvery(EDIT_BREW_STAGES_REQUEST, editBrewStagesGenerator);
    yield takeEvery(DELETE_BREW_STAGE_REQUEST, deleteBrewStageGenerator);
}

export default BrewStage;
