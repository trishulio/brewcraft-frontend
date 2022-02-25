import {
    FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_REQUEST,
    FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_SUCCESS,
    FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_FAILURE,
    EDIT_BREW_MATERIAL_PORTIONS_REQUEST,
    EDIT_BREW_MATERIAL_PORTIONS_SUCCESS,
    EDIT_BREW_MATERIAL_PORTIONS_FAILURE,
    DELETE_BREW_MATERIAL_PORTIONS_REQUEST,
    DELETE_BREW_MATERIAL_PORTIONS_SUCCESS,
    DELETE_BREW_MATERIAL_PORTIONS_FAILURE,
} from "./actionTypes";
import { call, put, race, select, take, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";

function* fetchMaterialPortionsByBrewIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchMaterialPortionsByBrewId,
            get(action, "payload.id")
        );
        yield put({
            type: FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_SUCCESS,
            payload: {
                content: JSON.parse(JSON.stringify(res.data.content)),
                initial: JSON.parse(JSON.stringify(res.data.content)),
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* editMaterialPortionsGenerator(action) {
    try {
        const batch = yield select((state) => state.Batch.Batch.data);
        yield call(api.updateMaterialPortions, get(action, "payload.form"));
        yield put({
            type: FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_REQUEST,
            payload: {
                id: batch.id,
            },
        });
        const [success, failed] = yield race([
            take(FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_SUCCESS),
            take(FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_FAILURE),
        ]);
        if (success) {
            yield put({
                type: EDIT_BREW_MATERIAL_PORTIONS_SUCCESS,
            });
        } else {
            yield put({
                type: EDIT_BREW_MATERIAL_PORTIONS_FAILURE,
                payload: get(failed, "payload.error"),
            });
        }
    } catch (e) {
        yield put({
            type: EDIT_BREW_MATERIAL_PORTIONS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* deleteMaterialPortionsGenerator(action) {
    try {
        debugger;
        const batch = yield select((state) => state.Batch.Batch.data);
        yield call(api.deleteMaterialPortions, get(action, "payload.form"));
        yield put({
            type: FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_REQUEST,
            payload: {
                id: batch.id,
            },
        });
        const [success, failed] = yield race([
            take(FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_SUCCESS),
            take(FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_FAILURE),
        ]);
        if (success) {
            yield put({
                type: DELETE_BREW_MATERIAL_PORTIONS_SUCCESS,
            });
        } else {
            yield put({
                type: DELETE_BREW_MATERIAL_PORTIONS_FAILURE,
                payload: get(failed, "payload.error"),
            });
        }
    } catch (e) {
        yield put({
            type: DELETE_BREW_MATERIAL_PORTIONS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* MaterialPortion() {
    yield takeEvery(
        FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_REQUEST,
        fetchMaterialPortionsByBrewIdGenerator
    );
    yield takeEvery(
        EDIT_BREW_MATERIAL_PORTIONS_REQUEST,
        editMaterialPortionsGenerator
    );
    yield takeEvery(
        DELETE_BREW_MATERIAL_PORTIONS_REQUEST,
        deleteMaterialPortionsGenerator
    );
}

export default MaterialPortion;
