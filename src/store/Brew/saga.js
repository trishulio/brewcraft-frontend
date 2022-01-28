import { call, put, takeEvery } from "redux-saga/effects";
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
} from "./actionTypes";
import { isValidName, validDate, validId } from "../../helpers/utils";
import {
    RESET_FERMENT_MIXTURE_DETAILS,
    RESET_KETTLE_MIXTURE_DETAILS,
    RESET_MASH_MIXTURE_DETAILS,
    RESET_TRANSFER_MIXTURE_DETAILS,
    RESET_WHIRLPOOL_MIXTURE_DETAILS,
} from "../Mixture/actionTypes";
import {
    RESET_FERMENT_MATERIAL_PORTION_DETAILS,
    RESET_KETTLE_MATERIAL_PORTION_DETAILS,
    RESET_MASH_MATERIAL_PORTION_DETAILS,
} from "../MaterialPortion/actionTypes";
import {
    RESET_FERMENT_MIXTURE_RECORDING_DETAILS,
    RESET_KETTLE_MIXTURE_RECORDING_DETAILS,
    RESET_TRANSFER_MIXTURE_RECORDING_DETAILS,
    RESET_WHIRLPOOL_MIXTURE_RECORDING_DETAILS,
} from "../MixtureRecording/actionTypes";
import {
    RESET_FERMENT_STAGE_DETAILS,
    RESET_KETTLE_STAGE_DETAILS,
    RESET_MASH_STAGE_DETAILS,
    RESET_TRANSFER_STAGE_DETAILS,
    RESET_WHIRLPOOL_STAGE_DETAILS,
} from "../BrewStages/actionTypes";
import { RESET_FERMENT_FINISHED_GOODS_DETAILS } from "../FinishedGoods/actionTypes";

function isValidBrew(batch) {
    return (
        isValidName(batch.batchId) &&
        validId(batch.productId) &&
        validDate(batch.startedAt) &&
        (!batch.endedAt || validDate(batch.endedAt))
    );
}

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

function* addBatchGenerator(action) {
    try {
        const batch = get(action, "payload.form");
        yield put({
            type: SET_BATCH_DETAILS,
            payload: {
                invalidBatchId: !isValidName(batch.batchId),
                invalidProduct: !validId(batch.productId),
                invalidBatchStartedAt: !validDate(batch.startedAt),
                invalidBatchEndedAt:
                    batch.endedAt && !validDate(batch.endedAt) ? true : false,
            },
        });
        if (!isValidBrew(get(action, "payload.form"))) {
            yield put({ type: SET_BATCH_DETAILS, payload: { error: true } });
        } else {
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
                    startedAt: get(action, "payload.form.startedAt"),
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
        }
    } catch (e) {
        yield put({ type: SET_BATCH_DETAILS, payload: { error: true } });
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
    // reset mash
    yield put({ type: RESET_MASH_STAGE_DETAILS });
    yield put({ type: RESET_MASH_MIXTURE_DETAILS });
    yield put({ type: RESET_MASH_MATERIAL_PORTION_DETAILS });
    // reset kettle
    yield put({ type: RESET_KETTLE_STAGE_DETAILS });
    yield put({ type: RESET_KETTLE_MIXTURE_DETAILS });
    yield put({ type: RESET_KETTLE_MATERIAL_PORTION_DETAILS });
    yield put({ type: RESET_KETTLE_MIXTURE_RECORDING_DETAILS });
    // reset whirlpool
    yield put({ type: RESET_WHIRLPOOL_STAGE_DETAILS });
    yield put({ type: RESET_WHIRLPOOL_MIXTURE_DETAILS });
    yield put({ type: RESET_WHIRLPOOL_MIXTURE_RECORDING_DETAILS });
    // reset transfer
    yield put({ type: RESET_TRANSFER_STAGE_DETAILS });
    yield put({ type: RESET_TRANSFER_MIXTURE_DETAILS });
    yield put({ type: RESET_TRANSFER_MIXTURE_RECORDING_DETAILS });
    // reset ferment
    yield put({ type: RESET_FERMENT_STAGE_DETAILS });
    yield put({ type: RESET_FERMENT_MIXTURE_DETAILS });
    yield put({ type: RESET_FERMENT_MATERIAL_PORTION_DETAILS });
    yield put({ type: RESET_FERMENT_MIXTURE_RECORDING_DETAILS });
    yield put({ type: RESET_FERMENT_FINISHED_GOODS_DETAILS });
}

function* Batch() {
    yield takeEvery(FETCH_BATCH_BY_ID_REQUEST, fetchBatchByIdGenerator);
    yield takeEvery(ADD_BATCH_REQUEST, addBatchGenerator);
    yield takeEvery(EDIT_BATCH_REQUEST, editBatchGenerator);
    yield takeEvery(DELETE_BATCH_REQUEST, deleteBatchGenerator);
    yield takeEvery(RESET_BATCH_DETAILS, resetBatchDetailsGenerator);
}

export default Batch;
