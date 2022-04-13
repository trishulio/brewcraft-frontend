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
import {
    FETCH_BATCH_STAGES_REQUEST,
    FETCH_BATCH_STAGES_SUCCESS,
    FETCH_BATCH_STAGES_FAILURE,
    EDIT_BATCH_STAGES,
    EDIT_BATCH_STAGES_SUCCESS,
    EDIT_BATCH_STAGES_FAILURE,
    CREATE_BATCH_STAGES_REQUEST,
    CREATE_BATCH_STAGES_SUCCESS,
    CREATE_BATCH_STAGES_FAILURE,
    UPDATE_BATCH_STAGES_REQUEST,
    UPDATE_BATCH_STAGES_SUCCESS,
    UPDATE_BATCH_STAGES_FAILURE,
    SET_BATCH_STAGES,
    DELETE_BATCH_STAGE_REQUEST,
    DELETE_BATCH_STAGE_SUCCESS,
    DELETE_BATCH_STAGE_FAILURE,
} from "./actionTypes";
import { api } from "./api";

function* fetchBatchStagesGenerator(action) {
    try {
        const res = yield call(api.fetchBrewStages, get(action, "payload"));
        yield put({
            type: FETCH_BATCH_STAGES_SUCCESS,
            payload: {
                content: [...res.data.content],
                initial: [...res.data.content],
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_BATCH_STAGES_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* createBatchStagesGenerator(action) {
    try {
        const res = yield call(api.createBatchStages, get(action, "payload"));
        yield put({
            type: CREATE_BATCH_STAGES_SUCCESS,
            payload: { ...res.data },
        });
    } catch (e) {
        yield put({
            type: CREATE_BATCH_STAGES_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "danger",
            },
        });
    }
}

function* editBatchStagesGenerator() {
    try {
        const stages = yield select((state) => {
            return state.Batch.Stages.content;
        });
        const initial = yield select((state) => {
            return state.Batch.Stages.initial;
        });
        if (JSON.stringify(stages) === JSON.stringify(initial)) {
            yield put({ type: EDIT_BATCH_STAGES_SUCCESS });
        } else {
            // todo: be smart and only update stages that changed.
            yield put({ type: UPDATE_BATCH_STAGES_REQUEST, payload: stages });
            const [success, failed] = yield race([
                take(UPDATE_BATCH_STAGES_SUCCESS),
                take(UPDATE_BATCH_STAGES_FAILURE),
            ]);
            if (success) {
                const data = get(success, "payload");
                yield put({
                    type: SET_BATCH_STAGES,
                    payload: {
                        content: JSON.parse(JSON.stringify(data)),
                        initial: JSON.parse(JSON.stringify(data)),
                    },
                });
                yield put({ type: EDIT_BATCH_STAGES_SUCCESS });
            } else {
                yield put({
                    type: EDIT_BATCH_STAGES_FAILURE,
                    payload: get(failed, "payload"),
                });
            }
        }
    } catch (e) {
        yield put({
            type: EDIT_BATCH_STAGES_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* updateBatchStagesGenerator(action) {
    try {
        const stages = get(action, "payload");
        const res = yield all(
            stages.map((stage) => {
                return call(api.updateBatchStage, { ...stage });
            })
        );
        yield put({
            type: UPDATE_BATCH_STAGES_SUCCESS,
            payload: res.map((r) => r.data),
        });
    } catch (e) {
        yield put({
            type: UPDATE_BATCH_STAGES_FAILURE,
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
        yield call(api.deleteBrewStage, get(action, "payload.id"));
        yield put({ type: DELETE_BATCH_STAGE_SUCCESS });
    } catch (e) {
        yield put({
            type: DELETE_BATCH_STAGE_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* BrewStage() {
    yield takeEvery(FETCH_BATCH_STAGES_REQUEST, fetchBatchStagesGenerator);
    yield takeEvery(CREATE_BATCH_STAGES_REQUEST, createBatchStagesGenerator);
    yield takeEvery(EDIT_BATCH_STAGES, editBatchStagesGenerator);
    yield takeEvery(UPDATE_BATCH_STAGES_REQUEST, updateBatchStagesGenerator);
    yield takeEvery(DELETE_BATCH_STAGE_REQUEST, deleteBrewStageGenerator);
}

export default BrewStage;
