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
    FETCH_BATCH_MIXTURES_REQUEST,
    FETCH_BATCH_MIXTURES_SUCCESS,
    FETCH_BATCH_MIXTURES_FAILURE,
    CREATE_BATCH_MIXTURE_REQUEST,
    CREATE_BATCH_MIXTURE_SUCCESS,
    CREATE_BATCH_MIXTURE_FAILURE,
    UPDATE_BATCH_MIXTURES_REQUEST,
    EDIT_BATCH_MIXTURES_SUCCESS,
    UPDATE_BATCH_MIXTURES_SUCCESS,
    UPDATE_BATCH_MIXTURES_FAILURE,
    EDIT_BATCH_MIXTURES_FAILURE,
    SET_BATCH_MIXTURES,
    EDIT_BATCH_MIXTURES,
    DELETE_BATCH_MIXTURE_REQUEST,
    DELETE_BATCH_MIXTURE_SUCCESS,
    DELETE_BATCH_MIXTURE_FAILURE,
} from "./actionTypes";
import { api } from "./api";

function* fetchBatchMixturesGenerator(action) {
    try {
        const res = yield call(api.fetchMixtures, get(action, "payload"));
        yield put({
            type: FETCH_BATCH_MIXTURES_SUCCESS,
            payload: {
                content: [...res.data.content],
                initial: [...res.data.content],
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_BATCH_MIXTURES_FAILURE,
            payload: {},
        });
    }
}

function* createBatchMixtureGenerator(action) {
    try {
        const res = yield call(api.createMixture, get(action, "payload"));
        yield put({
            type: CREATE_BATCH_MIXTURE_SUCCESS,
            payload: { ...res.data },
        });
    } catch (e) {
        yield put({
            type: CREATE_BATCH_MIXTURE_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* editBatchMixturesGenerator() {
    try {
        const mixtures = yield select((state) => {
            return state.Batch.BrewMixtures.content;
        });
        const initial = yield select((state) => {
            return state.Batch.BrewMixtures.initial;
        });
        if (JSON.stringify(mixtures) === JSON.stringify(initial)) {
            yield put({ type: EDIT_BATCH_MIXTURES_SUCCESS });
        } else {
            // todo: be smart and only update mixtures that changed.
            yield put({
                type: UPDATE_BATCH_MIXTURES_REQUEST,
                payload: mixtures,
            });
            const [success, failed] = yield race([
                take(UPDATE_BATCH_MIXTURES_SUCCESS),
                take(UPDATE_BATCH_MIXTURES_FAILURE),
            ]);
            if (success) {
                const data = get(success, "payload");
                yield put({
                    type: SET_BATCH_MIXTURES,
                    payload: {
                        content: JSON.parse(JSON.stringify(data)),
                        initial: JSON.parse(JSON.stringify(data)),
                    },
                });
                yield put({ type: EDIT_BATCH_MIXTURES_SUCCESS });
            } else {
                yield put({
                    type: EDIT_BATCH_MIXTURES_FAILURE,
                    payload: get(failed, "payload"),
                });
            }
        }
    } catch (e) {
        yield put({
            type: EDIT_BATCH_MIXTURES_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* updateBatchMixturesGenerator(action) {
    try {
        const mixtures = get(action, "payload");
        const res = yield all(
            mixtures.map((mixture) => {
                return call(api.updateMixture, { ...mixture });
            })
        );
        yield put({
            type: UPDATE_BATCH_MIXTURES_SUCCESS,
            payload: res.map((r) => r.data),
        });
    } catch (e) {
        yield put({
            type: UPDATE_BATCH_MIXTURES_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* deleteBatchMixtureGenerator(action) {
    try {
        yield call(api.deleteMixture, get(action, "payload.id"));
        yield put({
            type: DELETE_BATCH_MIXTURE_SUCCESS,
            payload: get(action, "payload"),
        });
    } catch (e) {
        yield put({ type: DELETE_BATCH_MIXTURE_FAILURE });
    }
}

function* Mixture() {
    yield takeEvery(FETCH_BATCH_MIXTURES_REQUEST, fetchBatchMixturesGenerator);
    yield takeEvery(CREATE_BATCH_MIXTURE_REQUEST, createBatchMixtureGenerator);
    yield takeEvery(EDIT_BATCH_MIXTURES, editBatchMixturesGenerator);
    yield takeEvery(
        UPDATE_BATCH_MIXTURES_REQUEST,
        updateBatchMixturesGenerator
    );

    yield takeEvery(DELETE_BATCH_MIXTURE_REQUEST, deleteBatchMixtureGenerator);
}

export default Mixture;
