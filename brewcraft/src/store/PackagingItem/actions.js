import {
    FETCH_PACKAGING_ITEM_BY_ID_REQUEST,
    SET_PACKAGING_ITEM_DETAILS,
    ADD_PACKAGING_ITEM_REQUEST,
    EDIT_PACKAGING_ITEM_REQUEST,
    DELETE_PACKAGING_ITEM_REQUEST,
    RESET_PACKAGING_ITEM_DETAILS,
    PACKAGING_ITEM_INVALID_NAME,
    PACKAGING_ITEM_INVALID_CATEGORY,
    PACKAGING_ITEM_INVALID_BASE_QUANTITY_UNIT
} from "./actionTypes";

export const fetchPackagingItemById = payload => ({
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

export const setPackagingItemInvalidName = value => ({
    type: PACKAGING_ITEM_INVALID_NAME,
    payload: { invalidName: value }
});

export const setPackagingItemInvalidCategory = value => ({
    type: PACKAGING_ITEM_INVALID_CATEGORY,
    payload: { invalidCategory: value }
});

export const setPackagingItemInvalidBaseQuantityUnit = value => ({
    type: PACKAGING_ITEM_INVALID_BASE_QUANTITY_UNIT,
    payload: { invakidBaseQuantityUnit: value }
});