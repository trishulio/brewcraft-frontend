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
    FETCH_BATCH_FINISHED_GOODS_REQUEST,
    FETCH_BATCH_FINISHED_GOODS_SUCCESS,
    FETCH_BATCH_FINISHED_GOODS_FAILURE,
    EDIT_BATCH_FINISHED_GOODS,
    DELETE_BATCH_FINISHED_GOODS_REQUEST,
    EDIT_BATCH_FINISHED_GOODS_SUCCESS,
    EDIT_BATCH_FINISHED_GOODS_FAILURE,
    DELETE_BATCH_FINISHED_GOODS_SUCCESS,
    DELETE_BATCH_FINISHED_GOODS_FAILURE,
    UPDATE_BATCH_FINISHED_GOODS_REQUEST,
    UPDATE_BATCH_FINISHED_GOODS_FAILURE,
    UPDATE_BATCH_FINISHED_GOODS_SUCCESS,
    SET_BATCH_FINISHED_GOODS,
} from "./actionTypes";
import { api } from "./api";

function* fetchBatchFinishedGoodsGenerator(action) {
    try {
        const res = yield call(
            api.fetchBatchFinishedGoods,
            get(action, "payload")
        );
        yield put({
            type: FETCH_BATCH_FINISHED_GOODS_SUCCESS,
            payload: {
                content: [...res.data.content],
                initial: [...res.data.content],
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_BATCH_FINISHED_GOODS_FAILURE,
            payload: {},
        });
    }
}

function* editFinishedGoodsGenerator() {
    try {
        const { content: finishedGoods, initial } = yield select((state) => {
            return state.Batch.BatchFinishedGoods;
        });
        if (JSON.stringify(finishedGoods) === JSON.stringify(initial)) {
            yield put({ type: EDIT_BATCH_FINISHED_GOODS_SUCCESS });
            return;
        }
        const finishedGoodsIds = finishedGoods.map((mr) => mr.id);
        yield all([
            put({
                type: UPDATE_BATCH_FINISHED_GOODS_REQUEST,
                payload: [...finishedGoods],
            }),
            put({
                type: DELETE_BATCH_FINISHED_GOODS_REQUEST,
                payload: initial
                    .filter((mr) => !finishedGoodsIds.includes(mr.id))
                    .map((mr) => mr.id),
            }),
        ]);
        const [success, failedUpdate, failedDelete] = yield race([
            all([
                take(UPDATE_BATCH_FINISHED_GOODS_SUCCESS),
                take(DELETE_BATCH_FINISHED_GOODS_SUCCESS),
            ]),
            take(UPDATE_BATCH_FINISHED_GOODS_FAILURE),
            take(DELETE_BATCH_FINISHED_GOODS_FAILURE),
        ]);
        if (success) {
            const data = get(success[0], "payload.data");
            yield put({
                type: SET_BATCH_FINISHED_GOODS,
                payload: {
                    content: JSON.parse(JSON.stringify(data)),
                    initial: JSON.parse(JSON.stringify(data)),
                },
            });
            yield put({
                type: EDIT_BATCH_FINISHED_GOODS_SUCCESS,
            });
        } else if (failedUpdate) {
            yield put({
                type: EDIT_BATCH_FINISHED_GOODS_FAILURE,
                payload: get(failedUpdate, "payload"),
            });
        } else {
            yield put({
                type: EDIT_BATCH_FINISHED_GOODS_FAILURE,
                payload: get(failedDelete, "payload"),
            });
        }
    } catch (e) {
        yield put({
            type: EDIT_BATCH_FINISHED_GOODS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* updateFinishedGoodsGenerator(action) {
    try {
        const res = yield call(api.updateFinishedGoods, get(action, "payload"));
        yield put({
            type: UPDATE_BATCH_FINISHED_GOODS_SUCCESS,
            payload: { ...res },
        });
    } catch (e) {
        yield put({
            type: UPDATE_BATCH_FINISHED_GOODS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "danger",
            },
        });
    }
}

function* deleteFinishedGoodsGenerator(action) {
    try {
        const res = yield call(api.deleteFinishedGoods, get(action, "payload"));
        yield put({
            type: DELETE_BATCH_FINISHED_GOODS_SUCCESS,
            payload: { ...res },
        });
    } catch (e) {
        yield put({
            type: DELETE_BATCH_FINISHED_GOODS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "danger",
            },
        });
    }
}

function* FinishedGood() {
    yield takeEvery(
        FETCH_BATCH_FINISHED_GOODS_REQUEST,
        fetchBatchFinishedGoodsGenerator
    );
    yield takeEvery(EDIT_BATCH_FINISHED_GOODS, editFinishedGoodsGenerator);
    yield takeEvery(
        UPDATE_BATCH_FINISHED_GOODS_REQUEST,
        updateFinishedGoodsGenerator
    );
    yield takeEvery(
        DELETE_BATCH_FINISHED_GOODS_REQUEST,
        deleteFinishedGoodsGenerator
    );
}

export default FinishedGood;
