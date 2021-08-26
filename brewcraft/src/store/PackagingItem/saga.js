import {
    FETCH_PACKAGING_ITEM_BY_ID_REQUEST,
    SET_PACKAGING_ITEM_DETAILS,
    ADD_PACKAGING_ITEM_REQUEST,
    ADD_PACKAGING_ITEM_SUCCESS,
    ADD_PACKAGING_ITEM_FAILURE,
    EDIT_PACKAGING_ITEM_REQUEST,
    DELETE_PACKAGING_ITEM_REQUEST,
    EDIT_PACKAGING_ITEM_SUCCESS,
    EDIT_PACKAGING_ITEM_FAILURE,
    DELETE_PACKAGING_ITEM_FAILURE
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../Brewery/actions";

function* fetchPackagingItemByIdGenerator(action) {
    try {
        const res = yield call(api.fetchPackagingItemById,get(action, "payload.id"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_PACKAGING_ITEM_DETAILS, payload: { data: res.data, initial: res.data }});
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* addPackagingItemGenerator(action) {
    try {
        const res = yield call(api.addPackagingItem, get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: ADD_PACKAGING_ITEM_SUCCESS, payload: { data: res.data, initial: res.data }});
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: ADD_PACKAGING_ITEM_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* editPackagingItemGenerator(action) {
    try {
        const res = yield call(api.updatePackagingItem, get(action, "payload.id"), get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: EDIT_PACKAGING_ITEM_SUCCESS, payload: { data: res.data, initial: res.data }});
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_PACKAGING_ITEM_FAILURE });
        yield put(snackFailure());
    }
}

function* deletePackagingItemGenerator(action) {
    try {
        yield call(api.deletePackagingItem, get(action, "payload.id"));
        yield put(setGlobalRedirect({ pathname: "/materials/packaging" }));
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_PACKAGING_ITEM_FAILURE });
        yield put(snackFailure());
    }
}

function* PackagingItem() {
    yield takeEvery(FETCH_PACKAGING_ITEM_BY_ID_REQUEST, fetchPackagingItemByIdGenerator);
    yield takeEvery(ADD_PACKAGING_ITEM_REQUEST, addPackagingItemGenerator);
    yield takeEvery(EDIT_PACKAGING_ITEM_REQUEST, editPackagingItemGenerator);
    yield takeEvery(DELETE_PACKAGING_ITEM_REQUEST, deletePackagingItemGenerator);
}

export default PackagingItem;