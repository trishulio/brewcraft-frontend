import {
    FETCH_MIXTURE_PORTION_BY_BREW_ID_REQUEST,
    SET_TRANSFER_MIXTURE_PORTION_DETAILS,
    ADD_TRANSFER_MIXTURE_PORTION_REQUEST,
    EDIT_TRANSFER_MIXTURE_PORTION_REQUEST,
    DELETE_TRANSFER_MIXTURE_PORTION_REQUEST,
    EDIT_TRANSFER_MIXTURE_PORTION_FAILURE,
    SET_FERMENT_MIXTURE_PORTION_DETAILS,
    EDIT_FERMENT_MIXTURE_PORTION_FAILURE,
    ADD_FERMENT_MIXTURE_PORTION_REQUEST,
    EDIT_FERMENT_MIXTURE_PORTION_REQUEST,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";
import { fetchMixturesByBrewId } from "../actions";
import { SET_BATCH_DETAILS } from "../Brew/actionTypes";

function* fetchMixturePortionByBrewIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchMixturePortionByBrewId,
            get(action, "payload.id")
        );
        yield put({
            type: SET_TRANSFER_MIXTURE_PORTION_DETAILS,
            payload: { ...res.data, initial: res.data.content },
        });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

// function* fetchMixturePortionByIdGenerator(action) {
//     try {
//         const res = yield call(api.fetchMixturePortionById, get(action, "payload.id"));
//         res.initial = JSON.parse(JSON.stringify(res.data));
//         yield put({ type: SET_TRANSFER_MIXTURE_PORTION_DETAILS, payload: { data: res.data, initial: res.initial }});
//     } catch (e) {
//         yield put(snackFailure("Something went wrong please try again."));
//     }
// }

// function* fetchTransferMixturePortionsByMixtureIdGenerator(action) {
//     try {
//         const res = yield call(api.fetchMixturePortionsByMixtureId, get(action, "payload.id"));
//         yield put({ type: SET_TRANSFER_MIXTURE_PORTION_DETAILS, payload: { content: res.data.content }});
//     } catch (e) {
//         console.log(e);
//         yield put(snackFailure("Something went wrong please try again."));
//     }
// }

function* addTransferMixturePortionGenerator(action) {
    try {
        const res = yield call(
            api.addMixturePortion,
            get(action, "payload.form")
        );
        yield put({
            type: SET_TRANSFER_MIXTURE_PORTION_DETAILS,
            payload: { ...res.data, initial: res.data.content },
        });
        yield put({ type: SET_BATCH_DETAILS, payload: { save: false } });
    } catch (e) {
        console.log(e);
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editTransferMixturePortionGenerator(action) {
    try {
        const res = yield call(
            api.updateMixturePortion,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: SET_TRANSFER_MIXTURE_PORTION_DETAILS,
            payload: { ...res.data, initial: res.data.content },
        });
        yield put({ type: SET_BATCH_DETAILS, payload: { save: false } });
    } catch (e) {
        yield put({ type: EDIT_TRANSFER_MIXTURE_PORTION_FAILURE });
        yield put(snackFailure());
    }
}

function* addFermentMixturePortionGenerator(action) {
    try {
        const res = yield call(
            api.addMixturePortion,
            get(action, "payload.form")
        );
        yield put({
            type: SET_FERMENT_MIXTURE_PORTION_DETAILS,
            payload: { ...res.data, initial: res.data.content },
        });
        yield put({ type: SET_BATCH_DETAILS, payload: { save: false } });
    } catch (e) {
        console.log(e);
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editFermentMixturePortionGenerator(action) {
    try {
        const res = yield call(
            api.updateMixturePortion,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: SET_FERMENT_MIXTURE_PORTION_DETAILS,
            payload: { ...res.data, initial: res.data.content },
        });
        yield put({ type: SET_BATCH_DETAILS, payload: { save: false } });
    } catch (e) {
        yield put({ type: EDIT_FERMENT_MIXTURE_PORTION_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteMixturePortionGenerator(action) {
    try {
        yield call(api.deleteMixturePortion, get(action, "payload.id"));
        yield put(fetchMixturesByBrewId(get(action, "payload.batchId")));
    } catch (e) {
        console.log(e);
        yield put(snackFailure());
    }
}

function* MixturePortion() {
    yield takeEvery(
        FETCH_MIXTURE_PORTION_BY_BREW_ID_REQUEST,
        fetchMixturePortionByBrewIdGenerator
    );
    // yield takeEvery(FETCH_MIXTURE_PORTION_BY_ID_REQUEST, fetchMixturePortionByIdGenerator);
    // yield takeEvery(FETCH_TRANSFER_MIXTURE_PORTION_BY_MIXTURE_ID_REQUEST, fetchFermentMixturePortionsByMixtureIdGenerator);
    yield takeEvery(
        ADD_TRANSFER_MIXTURE_PORTION_REQUEST,
        addTransferMixturePortionGenerator
    );
    yield takeEvery(
        EDIT_TRANSFER_MIXTURE_PORTION_REQUEST,
        editTransferMixturePortionGenerator
    );
    yield takeEvery(
        ADD_FERMENT_MIXTURE_PORTION_REQUEST,
        addFermentMixturePortionGenerator
    );
    yield takeEvery(
        EDIT_FERMENT_MIXTURE_PORTION_REQUEST,
        editFermentMixturePortionGenerator
    );
    yield takeEvery(
        DELETE_TRANSFER_MIXTURE_PORTION_REQUEST,
        deleteMixturePortionGenerator
    );
}

export default MixturePortion;
