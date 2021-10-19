import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { setGlobalRedirect } from "../Brewery/actions";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import {
    fetchAllBrewStages,
    fetchMixturesByBrewId,
    saveBrewStage
} from "../actions";
import {
    FETCH_BATCH_BY_ID_REQUEST,
    SET_BATCH_DETAILS,
    ADD_BATCH_REQUEST,
    ADD_BATCH_FAILURE,
    EDIT_BATCH_REQUEST,
    DELETE_BATCH_REQUEST,
    EDIT_BATCH_FAILURE,
    SET_INITIAL_BATCH_DETAILS
} from "./actionTypes";

function* fetchBatchByIdGenerator(action) {
    try {
        const res = yield call(api.fetchBatchById, get(action, "payload.id"));
        yield put({ type: SET_BATCH_DETAILS, payload: { data: res.data }});
        yield put({ type: SET_INITIAL_BATCH_DETAILS, payload: res.data });
        yield put(fetchAllBrewStages(res.data.id));
        yield put(fetchMixturesByBrewId(res.data.id));

    } catch (e) {
        yield put(snackFailure(e.message));
    }
}

function* addBatchGenerator(action) {
    try {
        const res = yield call(api.addBatch, get(action, "payload.form"));
        yield put(saveBrewStage({
            form: {
                brewId: res.data.id,
                taskId: 1, // mash
                statusId: 1, // in-process
                startedAt: get(action, "payload.form.startedAt")
            }
        }));
        yield put(saveBrewStage({
            form: {
                brewId: res.data.id,
                taskId: 2, // boil
                statusId: 1, // in-process
                startedAt: get(action, "payload.form.startedAt")
            }
        }));
        yield put(saveBrewStage({
            form: {
                brewId: res.data.id,
                taskId: 3, // whirlpool
                statusId: 1, // in-process
                startedAt: get(action, "payload.form.startedAt")
            }
        }));
        yield put({ type: SET_BATCH_DETAILS, payload: { data: res.data }});
        yield put({ type: SET_INITIAL_BATCH_DETAILS, payload: res.data });
        // yield put(fetchMixturesByBrewId(res.data.id));
        yield put(setGlobalRedirect({ pathname: "/batches/" + res.data.id }));
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: ADD_BATCH_FAILURE });
        yield put(snackFailure(e.message));
    }
}

function* editBatchGenerator(action) {
    try {
        const res = yield call(api.updateBatch, get(action, "payload.id"), get(action, "payload.form"));
        yield put({ type: SET_BATCH_DETAILS, payload: { data: res.data }});
        yield put({ type: SET_INITIAL_BATCH_DETAILS, payload: res.data });
        yield put(setGlobalRedirect({ pathname: "/batches/" + res.data.id }));
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_BATCH_FAILURE });
        yield put(snackFailure(e.message));
    }
}

function* deleteBatchGenerator(action) {
    try {
        yield call(api.deleteBatch, get(action, "payload.id"));
        yield put(setGlobalRedirect({ pathname: "/batches" }));
        yield put(snackSuccess());
    } catch (e) {
        yield put(snackFailure(e.message));
    }
}

function* Batch() {
    yield takeEvery(FETCH_BATCH_BY_ID_REQUEST, fetchBatchByIdGenerator);
    yield takeEvery(ADD_BATCH_REQUEST, addBatchGenerator);
    yield takeEvery(EDIT_BATCH_REQUEST, editBatchGenerator);
    yield takeEvery(DELETE_BATCH_REQUEST, deleteBatchGenerator);
}

export default Batch;