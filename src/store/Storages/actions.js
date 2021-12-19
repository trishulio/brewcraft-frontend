import {
    FETCH_STORAGES_REQUEST,
    CREATE_STORAGES_REQUEST,
    UPDATE_STORAGES_REQUEST,
    DELETE_STORAGES_REQUEST,
} from "./actionTypes";

export const fetchStorages = () => ({
    type: FETCH_STORAGES_REQUEST,
});

export const createStorage = (payload) => ({
    type: CREATE_STORAGES_REQUEST,
    payload: payload,
});

export const updateStorage = (payload) => ({
    type: UPDATE_STORAGES_REQUEST,
    payload: payload,
});

export const deleteStorage = (payload) => ({
    type: DELETE_STORAGES_REQUEST,
    payload: payload,
});
