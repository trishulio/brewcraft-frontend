import { all, call, put, race, take, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { setGlobalRedirect } from "../Brewery/actions";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import {
    FETCH_BATCH_BY_ID_REQUEST,
    SET_BATCH_DETAILS,
    ADD_BATCH_REQUEST,
    EDIT_BATCH_REQUEST,
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
    SET_BATCH_ERROR,
    FETCH_BATCH_REQUEST,
    FETCH_BATCH_SUCCESS,
    FETCH_BATCH_FAILURE,
} from "./actionTypes";
import { isValidName, validDate, validId } from "../../helpers/utils";
import {
    EDIT_BREW_MIXTURE_FAILURE,
    FETCH_BREW_MIXTURES_FAILURE,
    FETCH_BREW_MIXTURES_REQUEST,
    FETCH_BREW_MIXTURES_SUCCESS,
    RESET_BREW_MIXTURE_DETAILS,
} from "../BrewMixtures/actionTypes";
import {
    FETCH_BREW_MATERIAL_PORTIONS_FAILURE,
    FETCH_BREW_MATERIAL_PORTIONS_REQUEST,
    FETCH_BREW_MATERIAL_PORTIONS_SUCCESS,
    RESET_BREW_MATERIAL_PORTIONS_DETAILS,
} from "../MaterialPortion/actionTypes";
import {
    ADD_BREW_STAGE_FAILURE,
    EDIT_BREW_STAGES_FAILURE,
    FETCH_BREW_STAGES_REQUEST,
    FETCH_BREW_STAGES_SUCCESS,
    RESET_BREW_STAGES,
    FETCH_BREW_STAGES_FAILURE,
} from "../BrewStages/actionTypes";
import {
    FETCH_BREW_MIXTURE_RECORDINGS_FAILURE,
    FETCH_BREW_MIXTURE_RECORDINGS_REQUEST,
    FETCH_BREW_MIXTURE_RECORDINGS_SUCCESS,
} from "../MixtureRecording/actionTypes";
import {
    FETCH_BREW_FINISHED_GOODS_FAILURE,
    FETCH_BREW_FINISHED_GOODS_REQUEST,
    FETCH_BREW_FINISHED_GOODS_SUCCESS,
} from "../BrewFinishedGoods/actionTypes";

function* fetchBatchGenerator(action) {
    try {
        const batchId = get(action, "payload.batchId");
        yield put({ type: FETCH_BATCH_BY_ID_REQUEST, payload: { batchId } });
        yield put({ type: FETCH_BREW_MIXTURES_REQUEST, payload: { batchId } });
        yield put({ type: FETCH_BREW_STAGES_REQUEST, payload: { batchId } });
        yield put({
            type: FETCH_BREW_MATERIAL_PORTIONS_REQUEST,
            payload: { batchId },
        });
        yield put({
            type: FETCH_BREW_MIXTURE_RECORDINGS_REQUEST,
            payload: { batchId },
        });
        yield put({
            type: FETCH_BREW_FINISHED_GOODS_REQUEST,
            payload: {
                id: batchId,
            },
        });
        const [success] = yield race([
            all([
                take(FETCH_BATCH_BY_ID_SUCCESS),
                take(FETCH_BREW_MIXTURES_SUCCESS),
                take(FETCH_BREW_STAGES_SUCCESS),
                take(FETCH_BREW_MATERIAL_PORTIONS_SUCCESS),
                take(FETCH_BREW_MIXTURE_RECORDINGS_SUCCESS),
                take(FETCH_BREW_FINISHED_GOODS_SUCCESS),
            ]),
            take(FETCH_BATCH_BY_ID_FAILURE),
            take(FETCH_BREW_MIXTURES_FAILURE),
            take(FETCH_BREW_STAGES_FAILURE),
            take(FETCH_BREW_MATERIAL_PORTIONS_FAILURE),
            take(FETCH_BREW_MIXTURE_RECORDINGS_FAILURE),
            take(FETCH_BREW_FINISHED_GOODS_FAILURE),
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
        const res = yield call(api.fetchBatchById, get(action, "payload"));
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

function isBatchValid(batch) {
    return (
        !batch.invalidBatchId &&
        !batch.invalidProduct &&
        !batch.invalidBatchStartedAt &&
        !batch.invalidBatchEndedAt
    );
}
function* addBatchGenerator(action) {
    try {
        const batch = get(action, "payload.batch");
        yield put({ type: VALIDATE_BREW_FIELDS, payload: { batch } });
        yield take(VALIDATE_BREW_FIELDS_SUCCESS);
        if (isBatchValid(batch)) {
            const res = yield call(api.addBatch, batch);
            yield put({
                type: ADD_BATCH_SUCCESS,
                payload: { data: res.data, initial: res.data },
            });
            yield put(
                setGlobalRedirect({
                    pathname: "/brews/" + res.data.id,
                    search: "?edit=true",
                })
            );
        } else {
            yield put({
                type: ADD_BATCH_FAILURE,
                payload: {
                    error: null,
                },
            });
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

function* editBatchGenerator(action) {
    try {
        const res = yield call(
            api.updateBatch,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: SET_BATCH_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
        yield put(
            setGlobalRedirect({
                pathname: "/brews/" + res.data.id,
                search: "?edit=true",
            })
        );
        yield put({ type: EDIT_BATCH_SUCCESS });
    } catch (e) {
        yield put({ type: EDIT_BATCH_FAILURE });
    }
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
    yield put({ type: RESET_BREW_STAGES });
    yield put({ type: RESET_BREW_MIXTURE_DETAILS });
    yield put({ type: RESET_BREW_MATERIAL_PORTIONS_DETAILS });
}

function* setBatchErrorGenerator(action) {
    yield put({
        type: SET_BATCH_ERROR,
        payload: get(action, "payload"),
    });
}

function* Batch() {
    yield takeEvery(FETCH_BATCH_REQUEST, fetchBatchGenerator);
    yield takeEvery(FETCH_BATCH_BY_ID_REQUEST, fetchBatchByIdGenerator);

    yield takeEvery(ADD_BATCH_REQUEST, addBatchGenerator);
    yield takeEvery(EDIT_BATCH_REQUEST, editBatchGenerator);
    yield takeEvery(DELETE_BATCH_REQUEST, deleteBatchGenerator);
    yield takeEvery(RESET_BATCH_DETAILS, resetBatchDetailsGenerator);
    yield takeEvery(VALIDATE_BREW_FIELDS, validateBrewGenerator);
    yield takeEvery(ADD_BREW_STAGE_FAILURE, setBatchErrorGenerator);
    yield takeEvery(EDIT_BREW_STAGES_FAILURE, setBatchErrorGenerator);
    yield takeEvery(FETCH_BREW_MIXTURES_FAILURE, setBatchErrorGenerator);
    yield takeEvery(EDIT_BREW_MIXTURE_FAILURE, setBatchErrorGenerator);
}

export default Batch;
