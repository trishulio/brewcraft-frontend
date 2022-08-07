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
    FETCH_BATCH_REQUEST,
    SET_BATCH_DETAILS,
    ADD_BATCH,
    EDIT_BATCH,
    DELETE_BATCH_REQUEST,
    EDIT_BATCH_FAILURE,
    EDIT_BATCH_SUCCESS,
    ADD_BATCH_SUCCESS,
    FETCH_BATCH_SUCCESS,
    FETCH_BATCH_FAILURE,
    RESET_BATCH_DETAILS,
    ADD_BATCH_FAILURE,
    VALIDATE_BREW_FIELDS,
    VALIDATE_BREW_FIELDS_SUCCESS,
    GET_BATCH,
    GET_BATCH_SUCCESS,
    GET_BATCH_FAILURE,
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
    DELETE_BATCH_MIXTURE_AND_STAGE,
    DELETE_BATCH_MIXTURE_AND_STAGE_SUCCESS,
    DELETE_BATCH_MIXTURE_AND_STAGE_FAILURE,
    UPDATE_BATCH_STAGE,
    UPDATE_BATCH_STAGE_SUCCESS,
    UPDATE_BATCH_STAGE_FAILURE,
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
    DELETE_BATCH_STAGE_REQUEST,
    DELETE_BATCH_STAGE_SUCCESS,
    DELETE_BATCH_STAGE_FAILURE,
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
        yield all([
            put({ type: FETCH_BATCH_REQUEST, payload: { batchId } }),
            put({ type: FETCH_BATCH_MIXTURES_REQUEST, payload: { batchId } }),
            put({ type: FETCH_BATCH_STAGES_REQUEST, payload: { batchId } }),
            put({
                type: FETCH_BATCH_MATERIAL_PORTIONS_REQUEST,
                payload: { batchId },
            }),
            put({
                type: FETCH_BATCH_MIXTURE_RECORDINGS_REQUEST,
                payload: { batchId },
            }),
            put({
                type: FETCH_BATCH_FINISHED_GOODS_REQUEST,
                payload: { brewIds: batchId },
            }),
        ]);
        const [success] = yield race([
            all([
                take(FETCH_BATCH_SUCCESS),
                take(FETCH_BATCH_MIXTURES_SUCCESS),
                take(FETCH_BATCH_STAGES_SUCCESS),
                take(FETCH_BATCH_MATERIAL_PORTIONS_SUCCESS),
                take(FETCH_BATCH_MIXTURE_RECORDINGS_SUCCESS),
                take(FETCH_BATCH_FINISHED_GOODS_SUCCESS),
            ]),
            take(FETCH_BATCH_FAILURE),
            take(FETCH_BATCH_MIXTURES_FAILURE),
            take(FETCH_BATCH_STAGES_FAILURE),
            take(FETCH_BATCH_MATERIAL_PORTIONS_FAILURE),
            take(FETCH_BATCH_MIXTURE_RECORDINGS_FAILURE),
            take(FETCH_BATCH_FINISHED_GOODS_FAILURE),
        ]);
        if (success) {
            yield put({ type: GET_BATCH_SUCCESS });
        } else {
            yield put({
                type: GET_BATCH_FAILURE,
                payload: {
                    message: "Failed to fetch batch details",
                    color: "danger",
                },
            });
        }
    } catch (e) {
        yield put({
            type: GET_BATCH_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "danger",
            },
        });
    }
}

function* fetchBatchByIdGenerator(action) {
    try {
        const res = yield call(api.fetchBatch, get(action, "payload"));
        yield all([
            put({
                type: SET_BATCH_DETAILS,
                payload: { data: res.data, initial: res.data },
            }),
            put({
                type: FETCH_BATCH_SUCCESS,
            }),
        ]);
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
            const data = get(success, "payload");
            yield all([
                put({
                    type: SET_BATCH_DETAILS,
                    payload: {
                        data: JSON.parse(JSON.stringify(data)),
                        initial: JSON.parse(JSON.stringify(data)),
                    },
                }),
                put(
                    setGlobalRedirect({
                        pathname: "/brews/" + data.id,
                        search: "?edit=true",
                    })
                ),
                put({ type: ADD_BATCH_SUCCESS }),
                put(snackSuccess("New Batch created!")),
            ]);
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
            assignedToUserId: batch.assignedTo?.id || null,
            ownedByUserId: batch.ownedBy?.id || null,
        });
        yield put({
            type: CREATE_BATCH_SUCCESS,
            payload: { ...res.data },
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
                brewStage: stage,
                quantity: {
                    symbol: "hl",
                    value: 0,
                },
                equipment: get(action, "payload.equipment"),
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
        yield all([
            put({
                type: SET_BATCH_MIXTURES,
                payload: {
                    content: JSON.parse(JSON.stringify([...mixtures, mixture])),
                    initial: JSON.parse(
                        JSON.stringify([...initialMixtures, mixture])
                    ),
                },
            }),
            put({ type: ADD_BATCH_STAGE_SUCCESS }),
            put(snackSuccess("New brew stage created!")),
        ]);
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
            yield all([
                yield put({ type: EDIT_BATCH_SUCCESS }),
                yield put(snackSuccess("Brew updated!")),
            ]);
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
            return;
        }
        yield put({ type: UPDATE_BATCH_REQUEST, payload: batch });
        const [success, failed] = yield race([
            take(UPDATE_BATCH_SUCCESS),
            take(UPDATE_BATCH_FAILURE),
        ]);
        if (success) {
            const data = get(success, "payload");
            yield all([
                put({
                    type: SET_BATCH_DETAILS,
                    payload: { data, initial: data },
                }),
                put({ type: EDIT_BATCH_DETAILS_SUCCESS }),
            ]);
        } else {
            yield put({
                type: EDIT_BATCH_DETAILS_FAILURE,
                payload: get(failed, "payload"),
            });
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
            assignedToUserId: get(action, "payload.assignedTo.id") || null,
            ownedByUserId: get(action, "payload.ownedBy.id") || null,
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

function* deleteBatchMixtureGenerator(action) {
    try {
        const mixture = get(action, "payload");
        yield put({
            type: DELETE_BATCH_STAGE_REQUEST,
            payload: {
                id: mixture.brewStage.id,
            },
        });
        const [success] = yield race([
            take(DELETE_BATCH_STAGE_SUCCESS),
            take(DELETE_BATCH_STAGE_FAILURE),
        ]);
        if (!success) {
            throw new Error("Failed to delete mixture");
        }
        const stages = yield select((state) => {
            const stages = state.Batch.Stages.content;
            const index = stages.findIndex(
                (s) => s.id === mixture.brewStage.id
            );
            stages.splice(index, 1);
            return stages;
        });
        const mixtures = yield select((state) => {
            const mixtures = state.Batch.BrewMixtures.content;
            const index = mixtures.findIndex((m) => m.id === mixture.id);
            mixtures.splice(index, 1);
            return mixtures;
        });
        yield all([
            put({
                type: SET_BATCH_MIXTURES,
                payload: {
                    content: mixtures,
                    initial: JSON.parse(JSON.stringify(mixtures)),
                },
            }),
            put({
                type: SET_BATCH_STAGES,
                payload: {
                    content: stages,
                    initial: JSON.parse(JSON.stringify(stages)),
                },
            }),
            put({ type: DELETE_BATCH_MIXTURE_AND_STAGE_SUCCESS }),
            put(snackSuccess("Deleted mixture")),
        ]);
    } catch (e) {
        yield put({
            type: DELETE_BATCH_MIXTURE_AND_STAGE_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
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
    yield all([
        put({ type: RESET_BATCH_STAGES }),
        put({ type: RESET_BATCH_MIXTURES }),
        put({ type: RESET_BATCH_MATERIAL_PORTIONS }),
    ]);
}

function* updateStageStageGenerator(action) {
    try {
        const stage = get(action, "payload.stage");
        const stages = yield select((state) => {
            return state.Batch.Stages.content;
        });
        const index = stages.findIndex((s) => s.id === stage.id);
        const data = JSON.parse(JSON.stringify(stages));
        data.splice(index, 1);
        yield put({
            type: SET_BATCH_STAGES,
            payload: {
                content: [...data, stage],
            },
        });
        yield put({
            type: EDIT_BATCH_STAGES,
        });
        const [success] = yield race([
            take(EDIT_BATCH_STAGES_SUCCESS),
            take(EDIT_BATCH_STAGES_FAILURE),
        ]);
        if (success) {
            yield put({
                type: UPDATE_BATCH_STAGE_SUCCESS,
            });
        } else {
            throw new Error();
        }
    } catch (e) {
        yield put({
            type: UPDATE_BATCH_STAGE_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* Batch() {
    yield takeEvery(GET_BATCH, fetchBatchGenerator);
    yield takeEvery(FETCH_BATCH_REQUEST, fetchBatchByIdGenerator);
    yield takeEvery(ADD_BATCH, addBatchGenerator);
    yield takeEvery(CREATE_BATCH_REQUEST, createBatchGenerator);
    yield takeEvery(ADD_BATCH_STAGE, addBatchStage);
    yield takeEvery(EDIT_BATCH, editBatchGenerator);
    yield takeEvery(EDIT_BATCH_DETAILS, editBatchDetailsGenerator);
    yield takeEvery(UPDATE_BATCH_REQUEST, updateBatchGenerator);
    yield takeEvery(
        DELETE_BATCH_MIXTURE_AND_STAGE,
        deleteBatchMixtureGenerator
    );
    yield takeEvery(UPDATE_BATCH_STAGE, updateStageStageGenerator);

    yield takeEvery(DELETE_BATCH_REQUEST, deleteBatchGenerator);
    yield takeEvery(RESET_BATCH_DETAILS, resetBatchDetailsGenerator);
    yield takeEvery(VALIDATE_BREW_FIELDS, validateBrewGenerator);
}

export default Batch;
