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
    FETCH_BATCH_MIXTURE_RECORDINGS_REQUEST,
    FETCH_BATCH_MIXTURE_RECORDINGS_SUCCESS,
    FETCH_BATCH_MIXTURE_RECORDINGS_FAILURE,
    EDIT_BATCH_MIXTURE_RECORDINGS,
    EDIT_BATCH_MIXTURE_RECORDINGS_SUCCESS,
    EDIT_BATCH_MIXTURE_RECORDINGS_FAILURE,
    DELETE_BATCH_MIXTURE_RECORDINGS_REQUEST,
    UPDATE_BATCH_MIXTURE_RECORDINGS_REQUEST,
    UPDATE_BATCH_MIXTURE_RECORDINGS_SUCCESS,
    UPDATE_BATCH_MIXTURE_RECORDINGS_FAILURE,
    DELETE_BATCH_MIXTURE_RECORDINGS_FAILURE,
    DELETE_BATCH_MIXTURE_RECORDINGS_SUCCESS,
    SET_BATCH_MIXTURE_RECORDINGS,
} from "./actionTypes";
import { api } from "./api";

function* fetchMixtureRecordingsGenerator(action) {
    try {
        const res = yield call(
            api.fetchMixtureRecordings,
            get(action, "payload")
        );
        yield all([
            put({
                type: FETCH_BATCH_MIXTURE_RECORDINGS_SUCCESS,
            }),
            put({
                type: SET_BATCH_MIXTURE_RECORDINGS,
                payload: {
                    content: [...res.data.content],
                    initial: [...res.data.content],
                },
            }),
        ]);
    } catch (e) {
        yield put({
            type: FETCH_BATCH_MIXTURE_RECORDINGS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* editMixtureRecordingsGenerator() {
    try {
        const { content: mixtureRecordings, initial } = yield select(
            (state) => {
                return state.Batch.MixtureRecordings;
            }
        );
        if (JSON.stringify(mixtureRecordings) === JSON.stringify(initial)) {
            yield put({ type: EDIT_BATCH_MIXTURE_RECORDINGS_SUCCESS });
            return;
        }
        const mixtureRecordingsIds = [];
        mixtureRecordings.forEach((mr) => {
            if (mr.id) {
                mixtureRecordingsIds.push(mr.id);
            }
        });
        yield all([
            put({
                type: UPDATE_BATCH_MIXTURE_RECORDINGS_REQUEST,
                payload: [...mixtureRecordings],
            }),
            put({
                type: DELETE_BATCH_MIXTURE_RECORDINGS_REQUEST,
                payload: initial
                    .filter((mr) => !mixtureRecordingsIds.includes(mr.id))
                    .map((mr) => mr.id),
            }),
        ]);
        const [success, failedUpdate, failedDelete] = yield race([
            all([
                take(UPDATE_BATCH_MIXTURE_RECORDINGS_SUCCESS),
                take(DELETE_BATCH_MIXTURE_RECORDINGS_SUCCESS),
            ]),
            take(UPDATE_BATCH_MIXTURE_RECORDINGS_FAILURE),
            take(DELETE_BATCH_MIXTURE_RECORDINGS_FAILURE),
        ]);
        if (success) {
            const data = get(success[0], "payload.data");
            yield put({
                type: SET_BATCH_MIXTURE_RECORDINGS,
                payload: {
                    content: JSON.parse(JSON.stringify(data)),
                    initial: JSON.parse(JSON.stringify(data)),
                },
            });
            yield put({
                type: EDIT_BATCH_MIXTURE_RECORDINGS_SUCCESS,
            });
        } else if (failedUpdate) {
            yield put({
                type: EDIT_BATCH_MIXTURE_RECORDINGS_FAILURE,
                payload: get(failedUpdate, "payload"),
            });
        } else {
            yield put({
                type: EDIT_BATCH_MIXTURE_RECORDINGS_FAILURE,
                payload: get(failedDelete, "payload"),
            });
        }
    } catch (e) {
        yield put({
            type: EDIT_BATCH_MIXTURE_RECORDINGS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* updateMixtureRecordingsGenerator(action) {
    try {
        const payload = get(action, "payload");
        if (!payload.length) {
            yield put({
                type: UPDATE_BATCH_MIXTURE_RECORDINGS_SUCCESS,
                payload: {
                    data: [],
                },
            });
        } else {
            const res = yield call(
                api.updateMixtureRecordings,
                get(action, "payload")
            );
            yield put({
                type: UPDATE_BATCH_MIXTURE_RECORDINGS_SUCCESS,
                payload: { ...res },
            });
        }
    } catch (e) {
        yield put({
            type: UPDATE_BATCH_MIXTURE_RECORDINGS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "danger",
            },
        });
    }
}

function* deleteMixtureRecordingsGenerator(action) {
    try {
        const payload = get(action, "payload");
        if (!payload.length) {
            yield put({
                type: DELETE_BATCH_MIXTURE_RECORDINGS_SUCCESS,
            });
        } else {
            yield call(api.deleteMixtureRecordings, get(action, "payload"));
            yield put({
                type: DELETE_BATCH_MIXTURE_RECORDINGS_SUCCESS,
            });
        }
    } catch (e) {
        yield put({
            type: DELETE_BATCH_MIXTURE_RECORDINGS_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "danger",
            },
        });
    }
}

function* MixtureRecordings() {
    yield takeEvery(
        FETCH_BATCH_MIXTURE_RECORDINGS_REQUEST,
        fetchMixtureRecordingsGenerator
    );
    yield takeEvery(
        EDIT_BATCH_MIXTURE_RECORDINGS,
        editMixtureRecordingsGenerator
    );
    yield takeEvery(
        UPDATE_BATCH_MIXTURE_RECORDINGS_REQUEST,
        updateMixtureRecordingsGenerator
    );
    yield takeEvery(
        DELETE_BATCH_MIXTURE_RECORDINGS_REQUEST,
        deleteMixtureRecordingsGenerator
    );
}

export default MixtureRecordings;
