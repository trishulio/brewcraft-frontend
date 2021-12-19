import { call, put, takeLatest } from "redux-saga/effects";
import {
    FETCH_STORAGES_REQUEST,
    FETCH_STORAGES_SUCCESS,
    FETCH_STORAGES_FAILURE,
    CREATE_STORAGES_REQUEST,
    CREATE_STORAGES_SUCCESS,
    CREATE_STORAGES_FAILURE,
    UPDATE_STORAGES_REQUEST,
    UPDATE_STORAGES_SUCCESS,
    UPDATE_STORAGES_FAILURE,
    DELETE_STORAGES_REQUEST,
    DELETE_STORAGES_SUCCESS,
    DELETE_STORAGES_FAILURE,
} from "./actionTypes";
import { get, omit } from "lodash";
import AxiosInstance from "../../helpers/axiosInstance";
import { snackFailure, snackSuccess } from "../Snackbar/actions";

async function fetchStoragesRequest() {
    return await AxiosInstance.get("/api/v1/facilities/storages");
}

function* fetchStorages() {
    try {
        let response = yield call(fetchStoragesRequest);
        yield put({
            type: FETCH_STORAGES_SUCCESS,
            payload: response.data.content,
        });
    } catch (e) {
        yield put({ type: FETCH_STORAGES_FAILURE, payload: [] });
    }
}

async function addStorageRequest(payload) {
    return await AxiosInstance.post(
        `/api/v1/facilities/${42}/storages`,
        payload
    );
}
function* addStorage(action) {
    try {
        let response = yield call(
            addStorageRequest,
            get(action, "payload.formData")
        );
        yield put({ type: CREATE_STORAGES_SUCCESS, payload: response.data });
        yield call(action.payload.success);
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: CREATE_STORAGES_FAILURE, payload: [] });
        yield put(snackFailure());
    }
}

async function editStorageItemRequest(id, data) {
    return await AxiosInstance.patch(
        `/api/v1/facilities/storages/${id} `,
        data
    );
}

function* editStorage(action) {
    try {
        let response = yield call(
            editStorageItemRequest,
            get(action, "payload.formData.id"),
            omit(action.payload.formData, ["id"])
        );
        yield put({ type: UPDATE_STORAGES_SUCCESS, payload: response.data });
        action.payload.success && action.payload.success();
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: UPDATE_STORAGES_FAILURE });
        yield put(snackFailure());
    }
}

async function deleteStorageItemRequest(id) {
    return await AxiosInstance.delete(`/api/v1/facilities/storages/${id}`);
}

function* deleteStorage(action) {
    try {
        yield call(deleteStorageItemRequest, action.payload.id);
        yield put({
            type: DELETE_STORAGES_SUCCESS,
            payload: action.payload.id,
        });
        action.payload.success && action.payload.success();
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_STORAGES_FAILURE });
        yield put(snackFailure());
    }
}

export default function* Equipment() {
    yield takeLatest(FETCH_STORAGES_REQUEST, fetchStorages);
    yield takeLatest(CREATE_STORAGES_REQUEST, addStorage);
    yield takeLatest(UPDATE_STORAGES_REQUEST, editStorage);
    yield takeLatest(DELETE_STORAGES_REQUEST, deleteStorage);
}
