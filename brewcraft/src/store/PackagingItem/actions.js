import {
    FETCH_PACKAGING_ITEM_BY_ID_REQUEST,
    SET_PACKAGING_ITEM_DETAILS,
    ADD_PACKAGING_ITEM_REQUEST,
    EDIT_PACKAGING_ITEM_REQUEST,
    DELETE_PACKAGING_ITEM_REQUEST,
    ADD_PACKAGING_ITEM_SUCCESS,
    RESET_PACKAGING_ITEM_DETAILS,
    SET_PACKAGING_ITEM_INVALID_CATEGORY
} from "./actionTypes";

export const fetchPackagingItemById = (payload) => ({
    type: FETCH_PACKAGING_ITEM_BY_ID_REQUEST,
    payload: payload,
  });

export const setPackagingItemDetails = payload => ({
    type: SET_PACKAGING_ITEM_DETAILS,
    payload: payload
});

export const resetPackagingItemDetails = () => ({
    type: RESET_PACKAGING_ITEM_DETAILS,
    payload: null
});

export const savePackagingItem = payload => ({
    type: ADD_PACKAGING_ITEM_REQUEST,
    payload: payload,
});

export const editPackagingItem = payload => ({
    type: EDIT_PACKAGING_ITEM_REQUEST,
    payload: payload,
});

export const deletePackagingItem = id => ({
    type: DELETE_PACKAGING_ITEM_REQUEST,
    payload: { id },
});

export const setPackagingItemInvalidCategory = value => ({
    type: SET_PACKAGING_ITEM_INVALID_CATEGORY,
    payload: value
});

export const setPackagingItemInvalidBaseQuantityUnit = value => ({
    type: SET_PACKAGING_ITEM_INVALID_CATEGORY,
    payload: value
});