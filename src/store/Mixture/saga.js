import {
    FETCH_MIXTURE_BY_BREW_ID_REQUEST,
    FETCH_MASH_MIXTURE_BY_ID_REQUEST,
    SET_MASH_MIXTURE_DETAILS,
    ADD_MASH_MIXTURE_REQUEST,
    EDIT_MASH_MIXTURE_REQUEST,
    DELETE_MASH_MIXTURE_REQUEST,
    EDIT_MASH_MIXTURE_SUCCESS,
    DELETE_MASH_MIXTURE_SUCCESS,
    EDIT_MASH_MIXTURE_FAILURE,
    DELETE_MASH_MIXTURE_FAILURE,
    FETCH_KETTLE_MIXTURE_BY_ID_REQUEST,
    SET_KETTLE_MIXTURE_DETAILS,
    ADD_KETTLE_MIXTURE_REQUEST,
    EDIT_KETTLE_MIXTURE_REQUEST,
    DELETE_KETTLE_MIXTURE_REQUEST,
    EDIT_KETTLE_MIXTURE_SUCCESS,
    DELETE_KETTLE_MIXTURE_SUCCESS,
    EDIT_KETTLE_MIXTURE_FAILURE,
    DELETE_KETTLE_MIXTURE_FAILURE,
    FETCH_WHIRLPOOL_MIXTURE_BY_ID_REQUEST,
    SET_WHIRLPOOL_MIXTURE_DETAILS,
    ADD_WHIRLPOOL_MIXTURE_REQUEST,
    EDIT_WHIRLPOOL_MIXTURE_REQUEST,
    DELETE_WHIRLPOOL_MIXTURE_REQUEST,
    EDIT_WHIRLPOOL_MIXTURE_SUCCESS,
    DELETE_WHIRLPOOL_MIXTURE_SUCCESS,
    EDIT_WHIRLPOOL_MIXTURE_FAILURE,
    DELETE_WHIRLPOOL_MIXTURE_FAILURE,
    SET_TRANSFER_MIXTURE_DETAILS,
    SET_FERMENT_MIXTURE_DETAILS,
    SET_CONDITION_MIXTURE_DETAILS,
    FETCH_FERMENT_MIXTURE_BY_ID_REQUEST,
    ADD_FERMENT_MIXTURE_REQUEST,
    EDIT_FERMENT_MIXTURE_REQUEST,
    DELETE_FERMENT_MIXTURE_REQUEST,
    EDIT_FERMENT_MIXTURE_SUCCESS,
    DELETE_FERMENT_MIXTURE_SUCCESS,
    EDIT_FERMENT_MIXTURE_FAILURE,
    DELETE_FERMENT_MIXTURE_FAILURE,
    FETCH_FERMENT_MIXTURE_BY_ID_FAILURE,
    ADD_FERMENT_MIXTURE_FAILURE,
    FETCH_MIXTURE_BY_BREW_ID_SUCCESS,
    FETCH_MIXTURE_BY_BREW_ID_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { SET_BRITE_TANK_MIXTURE_RECORDING_DETAILS } from "../MixtureRecording/actionTypes";

function* fetchMixturesByBrewIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchMixturesByBrewId,
            get(action, "payload.id")
        );
        debugger;
        yield put({
            type: FETCH_MIXTURE_BY_BREW_ID_SUCCESS,
            payload: {
                content: [...res.data.content],
                initial: [...res.data.content],
            },
        });

        let content;
        content = res.data.content.find(
            (m) => m.brewStage.task.name === "BOIL"
        );
        if (content) {
            yield put({
                type: SET_KETTLE_MIXTURE_DETAILS,
                payload: { data: content, initial: content },
            });
        }
        content = res.data.content.find(
            (m) => m.brewStage.task.name === "WHIRLPOOL"
        );
        if (content) {
            yield put({
                type: SET_WHIRLPOOL_MIXTURE_DETAILS,
                payload: { data: content, initial: content },
            });
        }
        content = res.data.content.find(
            (m) => m.brewStage.task.name === "TRANSFER"
        );
        if (content) {
            yield put({
                type: SET_TRANSFER_MIXTURE_DETAILS,
                payload: { data: content, initial: content },
            });
        }
        content = res.data.content.find(
            (m) => m.brewStage.task.name === "FERMENT"
        );
        if (content) {
            yield put({
                type: SET_FERMENT_MIXTURE_DETAILS,
                payload: { data: content, initial: content },
            });
        }
        content = res.data.content.find(
            (m) => m.brewStage.task.name === "CONDITION"
        );
        if (content) {
            yield put({
                type: SET_CONDITION_MIXTURE_DETAILS,
                payload: { data: content, initial: content },
            });
        }
        content = res.data.content.find(
            (m) => m.brewStage.task.name === "STORAGE"
        );
        if (content) {
            yield put({
                type: SET_BRITE_TANK_MIXTURE_RECORDING_DETAILS,
                payload: { data: content, initial: content },
            });
        }
    } catch (e) {
        yield put({
            type: FETCH_MIXTURE_BY_BREW_ID_FAILURE,
            payload: {},
        });
    }
}

function* fetchMashMixtureByIdGenerator(action) {
    try {
        const res = yield call(api.fetchMixtureById, get(action, "payload.id"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({
            type: SET_MASH_MIXTURE_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* addMashMixtureGenerator(action) {
    try {
        yield call(api.addMixture, get(action, "payload.params"));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editMashMixtureGenerator(action) {
    try {
        const res = yield call(
            api.updateMixture,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: EDIT_MASH_MIXTURE_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put({ type: EDIT_MASH_MIXTURE_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteMashMixtureGenerator(action) {
    try {
        yield call(api.deleteMixture, get(action, "payload.id"));
        yield put({
            type: DELETE_MASH_MIXTURE_SUCCESS,
            payload: get(action, "payload"),
        });
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_MASH_MIXTURE_FAILURE });
        yield put(snackFailure());
    }
}

function* addKettleMixtureGenerator(action) {
    try {
        yield call(api.addMixture, get(action, "payload.params"));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchKettleMixtureByIdGenerator(action) {
    try {
        const res = yield call(api.fetchMixtureById, get(action, "payload.id"));
        yield put({
            type: SET_KETTLE_MIXTURE_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editKettleMixtureGenerator(action) {
    try {
        const res = yield call(
            api.updateMixture,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: EDIT_KETTLE_MIXTURE_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put({ type: EDIT_KETTLE_MIXTURE_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteKettleMixtureGenerator(action) {
    try {
        yield call(api.deleteMixture, get(action, "payload.id"));
        yield put({
            type: DELETE_KETTLE_MIXTURE_SUCCESS,
            payload: get(action, "payload"),
        });
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_KETTLE_MIXTURE_FAILURE });
        yield put(snackFailure());
    }
}

function* fetchWhirlpoolMixtureByIdGenerator(action) {
    try {
        const res = yield call(api.fetchMixtureById, get(action, "payload.id"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({
            type: SET_WHIRLPOOL_MIXTURE_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* addWhirlpoolMixtureGenerator(action) {
    try {
        yield call(api.addMixture, get(action, "payload.params"));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editWhirlpoolMixtureGenerator(action) {
    try {
        const res = yield call(
            api.updateMixture,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: EDIT_WHIRLPOOL_MIXTURE_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put({ type: EDIT_WHIRLPOOL_MIXTURE_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteWhirlpoolMixtureGenerator(action) {
    try {
        yield call(api.deleteMixture, get(action, "payload.id"));
        yield put({
            type: DELETE_WHIRLPOOL_MIXTURE_SUCCESS,
            payload: get(action, "payload"),
        });
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_WHIRLPOOL_MIXTURE_FAILURE });
        yield put(snackFailure());
    }
}

function* fetchFermentMixtureByIdGenerator(action) {
    try {
        const res = yield call(api.fetchMixtureById, get(action, "payload.id"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({
            type: SET_FERMENT_MIXTURE_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put({ type: FETCH_FERMENT_MIXTURE_BY_ID_FAILURE });
    }
}

function* addFermentMixtureGenerator(action) {
    try {
        yield call(api.addMixture, get(action, "payload.params"));
    } catch (e) {
        yield put({ type: ADD_FERMENT_MIXTURE_FAILURE });
    }
}

function* editFermentMixtureGenerator(action) {
    try {
        const res = yield call(
            api.updateMixture,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: EDIT_FERMENT_MIXTURE_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put({ type: EDIT_FERMENT_MIXTURE_FAILURE });
    }
}

function* deleteFermentMixtureGenerator(action) {
    try {
        yield call(api.deleteMixture, get(action, "payload.id"));
        yield put({
            type: DELETE_FERMENT_MIXTURE_SUCCESS,
            payload: get(action, "payload"),
        });
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_FERMENT_MIXTURE_FAILURE });
    }
}

function* Mixture() {
    yield takeEvery(
        FETCH_MIXTURE_BY_BREW_ID_REQUEST,
        fetchMixturesByBrewIdGenerator
    );
    yield takeEvery(
        FETCH_MASH_MIXTURE_BY_ID_REQUEST,
        fetchMashMixtureByIdGenerator
    );
    yield takeEvery(ADD_MASH_MIXTURE_REQUEST, addMashMixtureGenerator);
    yield takeEvery(EDIT_MASH_MIXTURE_REQUEST, editMashMixtureGenerator);
    yield takeEvery(DELETE_MASH_MIXTURE_REQUEST, deleteMashMixtureGenerator);
    yield takeEvery(
        FETCH_KETTLE_MIXTURE_BY_ID_REQUEST,
        fetchKettleMixtureByIdGenerator
    );
    yield takeEvery(ADD_KETTLE_MIXTURE_REQUEST, addKettleMixtureGenerator);
    yield takeEvery(EDIT_KETTLE_MIXTURE_REQUEST, editKettleMixtureGenerator);
    yield takeEvery(
        DELETE_KETTLE_MIXTURE_REQUEST,
        deleteKettleMixtureGenerator
    );
    yield takeEvery(
        FETCH_WHIRLPOOL_MIXTURE_BY_ID_REQUEST,
        fetchWhirlpoolMixtureByIdGenerator
    );
    yield takeEvery(
        ADD_WHIRLPOOL_MIXTURE_REQUEST,
        addWhirlpoolMixtureGenerator
    );
    yield takeEvery(
        EDIT_WHIRLPOOL_MIXTURE_REQUEST,
        editWhirlpoolMixtureGenerator
    );
    yield takeEvery(
        DELETE_WHIRLPOOL_MIXTURE_REQUEST,
        deleteWhirlpoolMixtureGenerator
    );
    yield takeEvery(
        FETCH_FERMENT_MIXTURE_BY_ID_REQUEST,
        fetchFermentMixtureByIdGenerator
    );
    yield takeEvery(ADD_FERMENT_MIXTURE_REQUEST, addFermentMixtureGenerator);
    yield takeEvery(EDIT_FERMENT_MIXTURE_REQUEST, editFermentMixtureGenerator);
    yield takeEvery(
        DELETE_FERMENT_MIXTURE_REQUEST,
        deleteFermentMixtureGenerator
    );
}

export default Mixture;
