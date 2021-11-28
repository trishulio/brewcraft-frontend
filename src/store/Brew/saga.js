import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { setGlobalRedirect } from "../Brewery/actions";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import {
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
import { isValidName, validDate, validId } from "../../helpers/utils";

function isValidBrew(batch) {
    return isValidName(batch.batchId)
        && validId(batch.productId)
        && validDate(batch.startedAt)
        && (!batch.endedAt || validDate(batch.endedAt))
}

function* fetchBatchByIdGenerator(action) {
    try {
        const res = yield call(api.fetchBatchById, get(action, "payload.id"));
        yield put({ type: SET_BATCH_DETAILS, payload: { data: res.data, initial: res.data }});
    } catch (e) {
        yield put(snackFailure(e.message));
    }
}

function* addBatchGenerator(action) {
    let resStage, resMixture;
    try {
        debugger;
        const batch = get(action, "payload.form")
        yield put({
            type: SET_BATCH_DETAILS,
            payload: {
                invalidBatchId: !isValidName(batch.batchId),
                invalidProduct: !validId(batch.product?.id),
                invalidBatchStartedAt: !validDate(batch.startedAt),
                invalidBatchEndedAt: batch.endedAt && !validDate(batch.endedAt) ? true : false
            }
        });
        if (!isValidBrew(get(action, "payload.form"))) {
            yield put({ type: SET_BATCH_DETAILS, payload: { error: true }});
        } else {
            const res = yield call(api.addBatch, batch);
            resStage = yield call(api.addBrewStage, [{
                brewId: res.data.id,
                taskId: 1, // mash
                statusId: 1,
                startedAt: get(action, "payload.form.startedAt")
            }, {
                brewId: res.data.id,
                taskId: 2, // kettle
                statusId: 1
            }, {
                brewId: res.data.id,
                taskId: 3, // whirlpool
                statusId: 1
            }, {
                brewId: res.data.id,
                taskId: 6, // transfer
                statusId: 1
            }, {
                brewId: res.data.id,
                taskId: 7, // ferment
                statusId: 1
            }, {
                brewId: res.data.id,
                taskId: 5, // condition
                statusId: 1
            }, {
                brewId: res.data.id,
                taskId: 8, // storage
                statusId: 1
            }]);
            resMixture = yield call(api.addMixture, {
                quantity: {
                    symbol: "hl",
                    value: 0
                },
                brewStageId: resStage.data[0].id
            });
            resMixture = yield call(api.addMixture, {
                parentMixtureId: resMixture.data.id,
                quantity: {
                    symbol: "hl",
                    value: 0
                },
                brewStageId: resStage.data[1].id
            });
            resMixture = yield call(api.addMixture, {
                parentMixtureId: resMixture.data.id,
                quantity: {
                    symbol: "hl",
                    value: 0
                },
                brewStageId: resStage.data[2].id
            });
            resMixture = yield call(api.addMixture, {
                parentMixtureId: resMixture.data.id,
                quantity: {
                    symbol: "hl",
                    value: 0
                },
                brewStageId: resStage.data[3].id
            });
            resMixture = yield call(api.addMixture, {
                parentMixtureId: resMixture.data.id,
                quantity: {
                    symbol: "hl",
                    value: 0
                },
                brewStageId: resStage.data[4].id
            });
            resMixture = yield call(api.addMixture, {
                parentMixtureId: resMixture.data.id,
                quantity: {
                    symbol: "hl",
                    value: 0
                },
                brewStageId: resStage.data[5].id
            });
            resMixture = yield call(api.addMixture, {
                parentMixtureId: resMixture.data.id,
                quantity: {
                    symbol: "hl",
                    value: 0
                },
                brewStageId: resStage.data[6].id
            });
            yield put({ type: SET_BATCH_DETAILS, payload: { data: res.data, initial: res.data }});
            yield put(setGlobalRedirect({ pathname: "/brews/" + res.data.id }));

        }
    } catch (e) {
        console.log(e);
        yield put({ type: SET_BATCH_DETAILS, payload: { error: true }});
    }
}

function* editBatchGenerator(action) {
    try {
        const res = yield call(api.updateBatch, get(action, "payload.id"), get(action, "payload.form"));
        yield put({ type: SET_BATCH_DETAILS, payload: { save: true, data: res.data, initial: res.data }});
        yield put(setGlobalRedirect({ pathname: "/brews/" + res.data.id }));
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_BATCH_FAILURE });
        yield put(snackFailure(e.message));
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

function* Batch() {
    yield takeEvery(FETCH_BATCH_BY_ID_REQUEST, fetchBatchByIdGenerator);
    yield takeEvery(ADD_BATCH_REQUEST, addBatchGenerator);
    yield takeEvery(EDIT_BATCH_REQUEST, editBatchGenerator);
    yield takeEvery(DELETE_BATCH_REQUEST, deleteBatchGenerator);
}

export default Batch;