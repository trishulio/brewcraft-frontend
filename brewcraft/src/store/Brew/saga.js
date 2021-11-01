import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { setGlobalRedirect } from "../Brewery/actions";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import {
    fetchAllBrewStages,
    fetchMixturesByBrewId,
    saveBrewStage,
    togglePreloader
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
    let resStage, resMixture;
    try {
        yield put(togglePreloader(true));
        const res = yield call(api.addBatch, get(action, "payload.form"));
        yield put({ type: SET_BATCH_DETAILS, payload: { data: res.data }});
        yield put({ type: SET_INITIAL_BATCH_DETAILS, payload: res.data });
        // add mashlauter stage and mixture
        resStage = yield call(api.addBrewStage, [{
            brewId: res.data.id,
            taskId: 1, // mash
            statusId: 1, // in-process
            startedAt: get(action, "payload.form.startedAt")
        }, {
            brewId: res.data.id,
            taskId: 2, // kettle
            statusId: 1, // in-process
            // startedAt: get(action, "payload.form.startedAt")
        }, {
            brewId: res.data.id,
            taskId: 3, // whirlpool
            statusId: 1, // in-process
            // startedAt: get(action, "payload.form.startedAt")
        }]);
        resMixture = yield call(api.addMixture, {
            quantity: {
                symbol: "hl",
                value: 0
            },
            brewStageId: resStage.data[0].id
        });
        // add kettle stage and mixture
        // resStage = yield call(api.addBrewStage, [{
        //     brewId: res.data.id,
        //     taskId: 2, // kettle
        //     statusId: 1, // in-process
        //     // startedAt: get(action, "payload.form.startedAt")
        // }]);
        resMixture = yield call(api.addMixture, {
            parentMixtureId: resMixture.data.id,
            quantity: {
                symbol: "hl",
                value: 0
            },
            brewStageId: resStage.data[1].id
        });
        // add whirlpool stage and mixture
        // resStage = yield call(api.addBrewStage, [{
        //     brewId: res.data.id,
        //     taskId: 3, // whirlpool
        //     statusId: 1, // in-process
        //     // startedAt: get(action, "payload.form.startedAt")
        // }]);
        resMixture = yield call(api.addMixture, {
            parentMixtureId: resMixture.data.id,
            quantity: {
                symbol: "hl",
                value: 0
            },
            brewStageId: resStage.data[2].id
        });
        // add transfer stage and mixture
        // resStage = yield call(api.addBrewStage, {
        //     brewId: res.data.id,
        //     taskId: 7, // transfer
        //     statusId: 1, // in-process
        //     // startedAt: get(action, "payload.form.startedAt")
        // });
        // resMixture = yield call(api.addMixture, {
        //     parentMixtureId: resMixture.data.id,
        //     quantity: {
        //         symbol: "hl",
        //         value: 0
        //     },
        //     brewStageId: resStage.data.id
        // });
        yield put(setGlobalRedirect({ pathname: "/batches/" + res.data.id }));
        yield put(snackSuccess());

    } catch (e) {
        console.log(e);
        yield put(snackFailure(e.message));

    } finally {
        yield put(togglePreloader(false));
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