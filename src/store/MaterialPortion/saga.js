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
    FETCH_BATCH_MATERIAL_PORTIONS_REQUEST,
    FETCH_BATCH_MATERIAL_PORTIONS_SUCCESS,
    FETCH_BATCH_MATERIAL_PORTIONS_FAILURE,
    EDIT_BATCH_MATERIAL_PORTIONS,
    EDIT_BATCH_MATERIAL_PORTIONS_SUCCESS,
    EDIT_BATCH_MATERIAL_PORTIONS_FAILURE,
    DELETE_BATCH_MATERIAL_PORTIONS_REQUEST,
    DELETE_BATCH_MATERIAL_PORTIONS_SUCCESS,
    DELETE_BATCH_MATERIAL_PORTIONS_FAILURE,
    UPDATE_BATCH_MATERIAL_PORTIONS_REQUEST,
    UPDATE_BATCH_MATERIAL_PORTIONS_SUCCESS,
    UPDATE_BATCH_MATERIAL_PORTIONS_FAILURE,
    SET_BATCH_MATERIAL_PORTIONS,
} from "./actionTypes";
import { api } from "./api";

function* fetchMaterialPortionsGenerator(action) {
    try {
        const res = yield call(
            api.fetchMaterialPortions,
            get(action, "payload")
        );
        yield put({
            type: FETCH_BATCH_MATERIAL_PORTIONS_SUCCESS,
            payload: {
                content: JSON.parse(JSON.stringify(res.data.content)),
                initial: JSON.parse(JSON.stringify(res.data.content)),
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_BATCH_MATERIAL_PORTIONS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* editMaterialPortionsGenerator() {
    try {
        const { content: materialPortions, initial } = yield select((state) => {
            return state.Batch.MaterialPortions;
        });
        if (JSON.stringify(materialPortions) === JSON.stringify(initial)) {
            yield put({ type: EDIT_BATCH_MATERIAL_PORTIONS_SUCCESS });
            return;
        }
        const materialPortionsIds = materialPortions.map((mp) => mp.id);
        yield all([
            put({
                type: UPDATE_BATCH_MATERIAL_PORTIONS_REQUEST,
                payload: [...materialPortions],
            }),
            put({
                type: DELETE_BATCH_MATERIAL_PORTIONS_REQUEST,
                payload: initial
                    .filter((mp) => !materialPortionsIds.includes(mp.id))
                    .map((mp) => mp.id),
            }),
        ]);
        const [success, failed] = yield race([
            all([
                take(UPDATE_BATCH_MATERIAL_PORTIONS_SUCCESS),
                take(DELETE_BATCH_MATERIAL_PORTIONS_SUCCESS),
            ]),
            take(UPDATE_BATCH_MATERIAL_PORTIONS_FAILURE),
            take(DELETE_BATCH_MATERIAL_PORTIONS_FAILURE),
        ]);
        if (success) {
            const data = get(success[0], "payload.data");
            yield put({
                type: SET_BATCH_MATERIAL_PORTIONS,
                payload: {
                    content: JSON.parse(JSON.stringify(data)),
                    initial: JSON.parse(JSON.stringify(data)),
                },
            });
            yield put({
                type: EDIT_BATCH_MATERIAL_PORTIONS_SUCCESS,
            });
        } else {
            yield put({
                type: EDIT_BATCH_MATERIAL_PORTIONS_FAILURE,
                payload: get(failed, "payload"),
            });
        }
    } catch (e) {
        yield put({
            type: EDIT_BATCH_MATERIAL_PORTIONS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* updateMaterialPortionsGenerator(action) {
    try {
        const res = yield call(
            api.updateMaterialPortions,
            get(action, "payload")
        );
        yield put({
            type: UPDATE_BATCH_MATERIAL_PORTIONS_SUCCESS,
            payload: { ...res },
        });
    } catch (e) {
        yield put({
            type: UPDATE_BATCH_MATERIAL_PORTIONS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "danger",
            },
        });
    }
}

function* deleteMaterialPortionsGenerator(action) {
    try {
        const res = yield call(
            api.deleteMaterialPortions,
            get(action, "payload")
        );
        yield put({
            type: DELETE_BATCH_MATERIAL_PORTIONS_SUCCESS,
            payload: { ...res },
        });
    } catch (e) {
        yield put({
            type: DELETE_BATCH_MATERIAL_PORTIONS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "danger",
            },
        });
    }
}

function* MaterialPortion() {
    yield takeEvery(
        FETCH_BATCH_MATERIAL_PORTIONS_REQUEST,
        fetchMaterialPortionsGenerator
    );
    yield takeEvery(
        EDIT_BATCH_MATERIAL_PORTIONS,
        editMaterialPortionsGenerator
    );
    yield takeEvery(
        UPDATE_BATCH_MATERIAL_PORTIONS_REQUEST,
        updateMaterialPortionsGenerator
    );
    yield takeEvery(
        DELETE_BATCH_MATERIAL_PORTIONS_REQUEST,
        deleteMaterialPortionsGenerator
    );
}

export default MaterialPortion;
