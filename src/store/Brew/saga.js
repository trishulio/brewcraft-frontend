import { call, put, take, takeEvery } from "redux-saga/effects";
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
} from "./actionTypes";
import { isValidName, validDate, validId } from "../../helpers/utils";
import { RESET_BREW_MIXTURE_DETAILS } from "../BrewMixtures/actionTypes";
import { RESET_BREW_MATERIAL_PORTIONS_DETAILS } from "../MaterialPortion/actionTypes";
import { RESET_BREW_STAGES } from "../BrewStages/actionTypes";

function* fetchBatchByIdGenerator(action) {
    try {
        const res = yield call(api.fetchBatchById, get(action, "payload.id"));
        yield put({
            type: SET_BATCH_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
        yield put({
            type: FETCH_BATCH_BY_ID_SUCCESS,
        });
    } catch (e) {
        yield put({
            type: FETCH_BATCH_BY_ID_FAILURE,
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
            let res = yield call(api.addBatch, batch);
            const pathname = "/brews/" + res.data.id;
            yield put({
                type: SET_BATCH_DETAILS,
                payload: { data: res.data, initial: res.data },
            });
            res = yield call(api.addBrewStage, [
                {
                    brewId: res.data.id,
                    taskId: 1, // mash
                    statusId: 4,
                    startedAt: batch.startedAt,
                },
            ]);
            res = yield call(api.addMixture, {
                quantity: {
                    symbol: "hl",
                    value: 0,
                },
                brewStageId: res.data[0].id,
            });
            yield put(
                setGlobalRedirect({
                    pathname,
                    search: "?edit=true",
                })
            );
            yield put({ type: ADD_BATCH_SUCCESS });
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

function* Batch() {
    yield takeEvery(FETCH_BATCH_BY_ID_REQUEST, fetchBatchByIdGenerator);
    yield takeEvery(ADD_BATCH_REQUEST, addBatchGenerator);
    yield takeEvery(EDIT_BATCH_REQUEST, editBatchGenerator);
    yield takeEvery(DELETE_BATCH_REQUEST, deleteBatchGenerator);
    yield takeEvery(RESET_BATCH_DETAILS, resetBatchDetailsGenerator);
    yield takeEvery(VALIDATE_BREW_FIELDS, validateBrewGenerator);
}

export default Batch;
