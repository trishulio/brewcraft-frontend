import {
    FETCH_ALL_BREW_STAGE_REQUEST,
    FETCH_MASH_STAGE_BY_ID_REQUEST,
    SET_MASH_STAGE_DETAILS,
    ADD_MASH_STAGE_REQUEST,
    ADD_MASH_STAGE_SUCCESS,
    ADD_MASH_STAGE_FAILURE,
    EDIT_MASH_STAGE_REQUEST,
    DELETE_MASH_STAGE_REQUEST,
    EDIT_MASH_STAGE_SUCCESS,
    DELETE_MASH_STAGE_SUCCESS,
    EDIT_MASH_STAGE_FAILURE,
    DELETE_MASH_STAGE_FAILURE,
    FETCH_KETTLE_STAGE_BY_ID_REQUEST,
    SET_KETTLE_STAGE_DETAILS,
    ADD_KETTLE_STAGE_REQUEST,
    ADD_KETTLE_STAGE_SUCCESS,
    ADD_KETTLE_STAGE_FAILURE,
    EDIT_KETTLE_STAGE_REQUEST,
    DELETE_KETTLE_STAGE_REQUEST,
    EDIT_KETTLE_STAGE_SUCCESS,
    DELETE_KETTLE_STAGE_SUCCESS,
    EDIT_KETTLE_STAGE_FAILURE,
    DELETE_KETTLE_STAGE_FAILURE,
    FETCH_WHIRLPOOL_STAGE_BY_ID_REQUEST,
    SET_WHIRLPOOL_STAGE_DETAILS,
    ADD_WHIRLPOOL_STAGE_REQUEST,
    ADD_WHIRLPOOL_STAGE_SUCCESS,
    ADD_WHIRLPOOL_STAGE_FAILURE,
    EDIT_WHIRLPOOL_STAGE_REQUEST,
    DELETE_WHIRLPOOL_STAGE_REQUEST,
    EDIT_WHIRLPOOL_STAGE_SUCCESS,
    DELETE_WHIRLPOOL_STAGE_SUCCESS,
    EDIT_WHIRLPOOL_STAGE_FAILURE,
    DELETE_WHIRLPOOL_STAGE_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";

function* fetchAllBrewStages(action) {
    try {
        let res = yield call(api.fetchBrewStages, get(action, "payload.id"));
        let data, initial;
        data = res.data.content.find(s => s.task.name === "MASH");
        initial = JSON.parse(JSON.stringify(data));
        yield put({ type: SET_MASH_STAGE_DETAILS, payload: { data, initial }});

        data = res.data.content.find(s => s.task.name === "BOIL");
        initial = JSON.parse(JSON.stringify(data));
        yield put({ type: SET_KETTLE_STAGE_DETAILS, payload: { data, initial }});

        data = res.data.content.find(s => s.task.name === "WHIRLPOOL");
        initial = JSON.parse(JSON.stringify(data));
        yield put({ type: SET_WHIRLPOOL_STAGE_DETAILS, payload: { data, initial }});

    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
 }

function* fetchMashStageByIdGenerator(action) {
    try {
        const res = yield call(api.fetchBrewStageById, get(action, "payload.id"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_MASH_STAGE_DETAILS, payload: { data: res.data, initial: res.data }});
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* addMashStageGenerator(action) {
    try {
        const res = yield call(api.addBrewStage, get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: ADD_MASH_STAGE_SUCCESS, payload: { data: res.data, initial: res.data }});
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: ADD_MASH_STAGE_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editMashStageGenerator(action) {
    try {
        const res = yield call(api.updateBrewStage, get(action, "payload.id"), get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: EDIT_MASH_STAGE_SUCCESS, payload: { data: res.data, initial: res.data, editable: false }});
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_MASH_STAGE_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteMashStageGenerator(action) {
    try {
        yield call(api.deleteBrewStage, get(action, "payload.id"));
        yield put({ type: DELETE_MASH_STAGE_SUCCESS , payload : get(action, "payload") });
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_MASH_STAGE_FAILURE });
        yield put(snackFailure());
    }
}

function* addKettleStageGenerator(action) {
    try {
        const res = yield call(api.addBrewStage, get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: ADD_KETTLE_STAGE_SUCCESS, payload: { data: res.data, initial: res.data }});
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: ADD_MASH_STAGE_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editKettleStageGenerator(action) {
    try {
        const res = yield call(api.updateBrewStage, get(action, "payload.id"), get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: EDIT_KETTLE_STAGE_SUCCESS, payload: { data: res.data, initial: res.data, editable: false }});
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_MASH_STAGE_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteKettleStageGenerator(action) {
    try {
        yield call(api.deleteBrewStage, get(action, "payload.id"));
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_MASH_STAGE_FAILURE });
        yield put(snackFailure());
    }
}

function* addWhirlpoolStageGenerator(action) {
    try {
        const res = yield call(api.addBrewStage, get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: ADD_WHIRLPOOL_STAGE_SUCCESS, payload: { data: res.data, initial: res.data }});
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: ADD_WHIRLPOOL_STAGE_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editWhirlpoolStageGenerator(action) {
    try {
        const res = yield call(api.updateBrewStage, get(action, "payload.id"), get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: EDIT_WHIRLPOOL_STAGE_SUCCESS, payload: { data: res.data, initial: res.data, editable: false }});
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_WHIRLPOOL_STAGE_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteWhirlpoolStageGenerator(action) {
    try {
        yield call(api.deleteBrewStage, get(action, "payload.id"));
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_WHIRLPOOL_STAGE_FAILURE });
        yield put(snackFailure());
    }
}

function* BrewStage() {
    yield takeEvery(FETCH_ALL_BREW_STAGE_REQUEST, fetchAllBrewStages);
    yield takeEvery(FETCH_MASH_STAGE_BY_ID_REQUEST, fetchMashStageByIdGenerator);
    yield takeEvery(ADD_MASH_STAGE_REQUEST, addMashStageGenerator);
    yield takeEvery(EDIT_MASH_STAGE_REQUEST, editMashStageGenerator);
    yield takeEvery(DELETE_MASH_STAGE_REQUEST, deleteMashStageGenerator);
    yield takeEvery(ADD_KETTLE_STAGE_REQUEST, addKettleStageGenerator);
    yield takeEvery(EDIT_KETTLE_STAGE_REQUEST, editKettleStageGenerator);
    yield takeEvery(DELETE_KETTLE_STAGE_REQUEST, deleteKettleStageGenerator);
    yield takeEvery(ADD_WHIRLPOOL_STAGE_REQUEST, addWhirlpoolStageGenerator);
    yield takeEvery(EDIT_WHIRLPOOL_STAGE_REQUEST, editWhirlpoolStageGenerator);
    yield takeEvery(DELETE_WHIRLPOOL_STAGE_REQUEST, deleteWhirlpoolStageGenerator);
}

export default BrewStage;