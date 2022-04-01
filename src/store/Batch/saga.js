import {
    all,
    call,
    put,
    race,
    select,
    take,
    takeEvery,
} from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { setGlobalRedirect } from "../Brewery/actions";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import {
    FETCH_BATCH_BY_ID_REQUEST,
    SET_BATCH_DETAILS,
    ADD_BATCH_REQUEST,
    EDIT_BATCH,
    DELETE_BATCH_REQUEST,
    EDIT_BATCH_FAILURE,
    EDIT_BATCH_SUCCESS,
    ADD_BATCH_SUCCESS,
    FETCH_BATCH_BY_ID_SUCCESS,
    FETCH_BATCH_BY_ID_FAILURE,
    RESET_BATCH_DETAILS,
    ADD_BATCH_FAILURE,
    VALIDATE_BREW_FIELDS,
    VALIDATE_BREW_FIELDS_SUCCESS,
    FETCH_BATCH_REQUEST,
    FETCH_BATCH_SUCCESS,
    FETCH_BATCH_FAILURE,
    CREATE_BATCH_REQUEST,
    CREATE_BATCH_SUCCESS,
    CREATE_BATCH_FAILURE,
    ADD_BATCH_STAGE,
    ADD_BATCH_STAGE_SUCCESS,
    ADD_BATCH_STAGE_FAILURE,
    EDIT_BATCH_DETAILS,
    EDIT_BATCH_DETAILS_SUCCESS,
    EDIT_BATCH_DETAILS_FAILURE,
    UPDATE_BATCH_SUCCESS,
    UPDATE_BATCH_FAILURE,
    UPDATE_BATCH_REQUEST,
} from "./actionTypes";
import { isValidName, validDate, validId } from "../../helpers/utils";
import {
    CREATE_BATCH_MIXTURE_FAILURE,
    CREATE_BATCH_MIXTURE_REQUEST,
    CREATE_BATCH_MIXTURE_SUCCESS,
    EDIT_BATCH_MIXTURES,
    EDIT_BATCH_MIXTURES_FAILURE,
    EDIT_BATCH_MIXTURES_SUCCESS,
    FETCH_BATCH_MIXTURES_FAILURE,
    FETCH_BATCH_MIXTURES_REQUEST,
    FETCH_BATCH_MIXTURES_SUCCESS,
    RESET_BATCH_MIXTURES,
    SET_BATCH_MIXTURES,
} from "../BrewMixtures/actionTypes";
import {
    EDIT_BATCH_MATERIAL_PORTIONS,
    EDIT_BATCH_MATERIAL_PORTIONS_FAILURE,
    EDIT_BATCH_MATERIAL_PORTIONS_SUCCESS,
    FETCH_BATCH_MATERIAL_PORTIONS_FAILURE,
    FETCH_BATCH_MATERIAL_PORTIONS_REQUEST,
    FETCH_BATCH_MATERIAL_PORTIONS_SUCCESS,
    RESET_BATCH_MATERIAL_PORTIONS,
} from "../MaterialPortion/actionTypes";
import {
    FETCH_BATCH_STAGES_REQUEST,
    FETCH_BATCH_STAGES_SUCCESS,
    RESET_BATCH_STAGES,
    FETCH_BATCH_STAGES_FAILURE,
    CREATE_BATCH_STAGES_REQUEST,
    CREATE_BATCH_STAGES_SUCCESS,
    CREATE_BATCH_STAGES_FAILURE,
    SET_BATCH_STAGES,
    EDIT_BATCH_STAGES,
    EDIT_BATCH_STAGES_SUCCESS,
    EDIT_BATCH_STAGES_FAILURE,
} from "../BrewStages/actionTypes";
import {
    EDIT_BATCH_MIXTURE_RECORDINGS,
    EDIT_BATCH_MIXTURE_RECORDINGS_FAILURE,
    EDIT_BATCH_MIXTURE_RECORDINGS_SUCCESS,
    FETCH_BATCH_MIXTURE_RECORDINGS_FAILURE,
    FETCH_BATCH_MIXTURE_RECORDINGS_REQUEST,
    FETCH_BATCH_MIXTURE_RECORDINGS_SUCCESS,
} from "../MixtureRecording/actionTypes";
import {
    EDIT_BATCH_FINISHED_GOODS,
    EDIT_BATCH_FINISHED_GOODS_FAILURE,
    EDIT_BATCH_FINISHED_GOODS_SUCCESS,
    FETCH_BATCH_FINISHED_GOODS_FAILURE,
    FETCH_BATCH_FINISHED_GOODS_REQUEST,
    FETCH_BATCH_FINISHED_GOODS_SUCCESS,
} from "../BatchFinishedGoods/actionTypes";

function* fetchBatchGenerator(action) {
    try {
        const batchId = get(action, "payload.batchId");
        yield put({ type: FETCH_BATCH_BY_ID_REQUEST, payload: { batchId } });
        yield put({ type: FETCH_BATCH_MIXTURES_REQUEST, payload: { batchId } });
        yield put({ type: FETCH_BATCH_STAGES_REQUEST, payload: { batchId } });
        yield put({
            type: FETCH_BATCH_MATERIAL_PORTIONS_REQUEST,
            payload: { batchId },
        });
        yield put({
            type: FETCH_BATCH_MIXTURE_RECORDINGS_REQUEST,
            payload: { batchId },
        });
        yield put({
            type: FETCH_BATCH_FINISHED_GOODS_REQUEST,
            payload: {
                id: batchId,
            },
        });
        const [success] = yield race([
            all([
                take(FETCH_BATCH_BY_ID_SUCCESS),
                take(FETCH_BATCH_MIXTURES_SUCCESS),
                take(FETCH_BATCH_STAGES_SUCCESS),
                take(FETCH_BATCH_MATERIAL_PORTIONS_SUCCESS),
                take(FETCH_BATCH_MIXTURE_RECORDINGS_SUCCESS),
                take(FETCH_BATCH_FINISHED_GOODS_SUCCESS),
            ]),
            take(FETCH_BATCH_BY_ID_FAILURE),
            take(FETCH_BATCH_MIXTURES_FAILURE),
            take(FETCH_BATCH_STAGES_FAILURE),
            take(FETCH_BATCH_MATERIAL_PORTIONS_FAILURE),
            take(FETCH_BATCH_MIXTURE_RECORDINGS_FAILURE),
            take(FETCH_BATCH_FINISHED_GOODS_FAILURE),
        ]);
        if (success) {
            yield put({ type: FETCH_BATCH_SUCCESS });
        } else {
            yield put({
                type: FETCH_BATCH_FAILURE,
                payload: {
                    message: "Failed to fetch batch details",
                    color: "warning",
                },
            });
        }
    } catch (e) {
        yield put({
            type: FETCH_BATCH_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* fetchBatchByIdGenerator(action) {
    try {
        const res = yield call(api.fetchBatch, get(action, "payload"));
        yield put({
            type: FETCH_BATCH_BY_ID_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put({
            type: FETCH_BATCH_BY_ID_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* addBatchGenerator() {
    try {
        const batch = yield select((state) => {
            return state.Batch.Batch.data;
        });
        yield put({ type: CREATE_BATCH_REQUEST, payload: { batch } });
        const [success] = yield race([
            take(CREATE_BATCH_SUCCESS),
            take(CREATE_BATCH_FAILURE),
        ]);
        if (success) {
            yield put(snackSuccess("New Batch created!"));
            yield put({ type: ADD_BATCH_SUCCESS });
            yield put(
                setGlobalRedirect({
                    pathname: "/brews/" + get(success, "payload.data.id"),
                    search: "?edit=true",
                })
            );
        }
    } catch (e) {
        yield put({
            type: ADD_BATCH_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* addBatchStage(action) {
    try {
        const batch = yield select((state) => {
            return state.Batch.Batch.data;
        });
        const { content: stages, initial: initialStages } = yield select(
            (state) => {
                return state.Batch.Stages;
            }
        );
        const { content: mixtures, initial: initialMixtures } = yield select(
            (state) => {
                return state.Batch.BrewMixtures;
            }
        );
        yield put({
            type: CREATE_BATCH_STAGES_REQUEST,
            payload: [
                {
                    brewId: batch.id,
                    taskId: get(action, "payload.taskId"),
                    statusId: get(action, "payload.statusId"),
                    startedAt: get(action, "payload.startedAt"),
                },
            ],
        });
        const [stageSuccess] = yield race([
            take(CREATE_BATCH_STAGES_SUCCESS),
            take(CREATE_BATCH_STAGES_FAILURE),
        ]);
        if (!stageSuccess) {
            yield put({
                type: ADD_BATCH_STAGE_FAILURE,
                payload: {
                    message: "Failed to create brew stage!",
                    color: "danger",
                },
            });
            return;
        }
        const stage = get(stageSuccess, "payload[0]");
        yield put({
            type: SET_BATCH_STAGES,
            payload: {
                content: JSON.parse(JSON.stringify([...stages, stage])),
                initial: JSON.parse(JSON.stringify([...initialStages, stage])),
            },
        });
        yield put({
            type: CREATE_BATCH_MIXTURE_REQUEST,
            payload: {
                parentMixtureIds: get(action, "payload.parentMixtureIds"),
                brewStageId: stage.id,
                quantity: {
                    symbol: "hl",
                    value: 0,
                },
            },
        });
        const [mixtureSuccess] = yield race([
            take(CREATE_BATCH_MIXTURE_SUCCESS),
            take(CREATE_BATCH_MIXTURE_FAILURE),
        ]);
        if (!mixtureSuccess) {
            yield put({
                type: ADD_BATCH_STAGE_FAILURE,
                payload: {
                    message: "Failed to create brew stage!",
                    color: "danger",
                },
            });
            return;
        }
        const mixture = get(mixtureSuccess, "payload");
        yield put({
            type: SET_BATCH_MIXTURES,
            payload: {
                content: JSON.parse(JSON.stringify([...mixtures, mixture])),
                initial: JSON.parse(
                    JSON.stringify([...initialMixtures, mixture])
                ),
            },
        });
        yield put({ type: ADD_BATCH_STAGE_SUCCESS });
        yield put(snackSuccess("New brew stage created!"));
    } catch (e) {
        yield put({
            type: ADD_BATCH_STAGE_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "danger",
            },
        });
    }
}

function* createBatchGenerator(action) {
    try {
        const batch = get(action, "payload.batch");
        const res = yield call(api.createBatch, {
            batchId: "dummy",
            name: "",
            description: "",
            productId: parseInt(batch.product.id),
            parentBrewId: batch.parentBrewId,
            startedAt: batch.startedAt,
            endedAt: batch.endedAt,
        });
        yield put({
            type: CREATE_BATCH_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put({
            type: CREATE_BATCH_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "danger",
            },
        });
    }
}

function* editBatchGenerator() {
    try {
        yield all([
            put({ type: EDIT_BATCH_DETAILS }),
            put({ type: EDIT_BATCH_MIXTURES }),
            put({ type: EDIT_BATCH_STAGES }),
            put({ type: EDIT_BATCH_MATERIAL_PORTIONS }),
            put({ type: EDIT_BATCH_MIXTURE_RECORDINGS }),
            put({ type: EDIT_BATCH_FINISHED_GOODS }),
        ]);
        const [success] = yield race([
            all([
                take(EDIT_BATCH_DETAILS_SUCCESS),
                take(EDIT_BATCH_MIXTURES_SUCCESS),
                take(EDIT_BATCH_STAGES_SUCCESS),
                take(EDIT_BATCH_MATERIAL_PORTIONS_SUCCESS),
                take(EDIT_BATCH_MIXTURE_RECORDINGS_SUCCESS),
                take(EDIT_BATCH_FINISHED_GOODS_SUCCESS),
            ]),
            take(EDIT_BATCH_DETAILS_FAILURE),
            take(EDIT_BATCH_MIXTURES_FAILURE),
            take(EDIT_BATCH_STAGES_FAILURE),
            take(EDIT_BATCH_MATERIAL_PORTIONS_FAILURE),
            take(EDIT_BATCH_MIXTURE_RECORDINGS_FAILURE),
            take(EDIT_BATCH_FINISHED_GOODS_FAILURE),
        ]);
        if (success) {
            yield put({ type: EDIT_BATCH_SUCCESS });
            yield put(snackSuccess("Brew updated!"));
        } else {
            yield put({
                type: EDIT_BATCH_FAILURE,
                payload: {
                    message: "Failed to update brew.",
                    color: "danger",
                },
            });
        }
    } catch (e) {
        yield put({
            type: EDIT_BATCH_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "danger",
            },
        });
    }
}

function* editBatchDetailsGenerator() {
    try {
        const batch = yield select((state) => {
            return state.Batch.Batch.data;
        });
        const initial = yield select((state) => {
            return state.Batch.Batch.initial;
        });
        if (JSON.stringify(batch) === JSON.stringify(initial)) {
            yield put({ type: EDIT_BATCH_DETAILS_SUCCESS });
        } else {
            yield put({ type: UPDATE_BATCH_REQUEST, payload: batch });
            const [success, failed] = yield race([
                take(UPDATE_BATCH_SUCCESS),
                take(UPDATE_BATCH_FAILURE),
            ]);
            if (success) {
                const data = get(success, "payload");
                yield put({
                    type: SET_BATCH_DETAILS,
                    payload: { data, initial: data },
                });
                yield put({ type: EDIT_BATCH_DETAILS_SUCCESS });
            } else {
                yield put({
                    type: EDIT_BATCH_DETAILS_FAILURE,
                    payload: get(failed, "payload"),
                });
            }
        }
    } catch (e) {
        yield put({
            type: EDIT_BATCH_DETAILS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "danger",
            },
        });
    }
}

function* updateBatchGenerator(action) {
    try {
        const res = yield call(api.updateBatch, get(action, "payload.id"), {
            name: get(action, "payload.name"),
            description: get(action, "payload.description"),
            batchId: get(action, "payload.batchId"),
            productId: parseInt(get(action, "payload.product.id")),
            parentBrewId: get(action, "payload.parentBrewId"),
            startedAt: get(action, "payload.startedAt"),
            endedAt: get(action, "payload.endedAt"),
            version: get(action, "payload.version"),
        });
        yield put({
            type: UPDATE_BATCH_SUCCESS,
            payload: { ...res.data },
        });
    } catch (e) {
        yield put({
            type: UPDATE_BATCH_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "danger",
            },
        });
    }
}

function* validateBrewGenerator(action) {
    const batch = get(action, "payload.batch");
    yield put({
        type: VALIDATE_BREW_FIELDS_SUCCESS,
        payload: {
            invalidBatchId: batch.batchId && !isValidName(batch.batchId),
            invalidProduct: !validId(batch.productId),
            invalidBatchStartedAt: !validDate(batch.startedAt),
            invalidBatchEndedAt: !!batch.endedAt && !validDate(batch.endedAt),
        },
    });
}

function* deleteBatchGenerator(action) {
    try {
        yield call(api.deleteBatch, get(action, "payload.id"));
        yield put(setGlobalRedirect({ pathname: "/brews" }));
        yield put(snackSuccess());
    } catch (e) {
        yield put(snackFailure(e.message));
    }
}

function* resetBatchDetailsGenerator() {
    yield put({ type: RESET_BATCH_STAGES });
    yield put({ type: RESET_BATCH_MIXTURES });
    yield put({ type: RESET_BATCH_MATERIAL_PORTIONS });
}

function* Batch() {
    yield takeEvery(FETCH_BATCH_REQUEST, fetchBatchGenerator);
    yield takeEvery(FETCH_BATCH_BY_ID_REQUEST, fetchBatchByIdGenerator);
    yield takeEvery(ADD_BATCH_REQUEST, addBatchGenerator);
    yield takeEvery(CREATE_BATCH_REQUEST, createBatchGenerator);
    yield takeEvery(ADD_BATCH_STAGE, addBatchStage);
    yield takeEvery(EDIT_BATCH, editBatchGenerator);
    yield takeEvery(EDIT_BATCH_DETAILS, editBatchDetailsGenerator);
    yield takeEvery(UPDATE_BATCH_REQUEST, updateBatchGenerator);

    yield takeEvery(DELETE_BATCH_REQUEST, deleteBatchGenerator);
    yield takeEvery(RESET_BATCH_DETAILS, resetBatchDetailsGenerator);
    yield takeEvery(VALIDATE_BREW_FIELDS, validateBrewGenerator);
}

export default Batch;
