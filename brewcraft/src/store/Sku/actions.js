import {
    CREATE_SKU,
    FETCH_SKU,
    UPDATE_SKU,
    SET_SKU_DETAILS,
    INVALID_NAME,
    INVALID_CLASS,
    INVALID_TYPE,
    INVALID_STYLE,
    INVALID_DESCRIPTION,
    DELETE_SKU
} from "./actionTypes";

export const setSkuDetails = payload => ({
    type: SET_SKU_DETAILS,
    payload
});

export const fetchSkuById = ({id, success}) => ({
    type: FETCH_SKU,
    payload: { id, success }
});

export const createSku = payload => ({
    type: CREATE_SKU,
    payload
});

export const updateSku = payload => ({
    type: UPDATE_SKU,
    payload
});

export const deleteSku = id => ({
    type: DELETE_SKU,
    payload: { id }
});

export const setSkuInvalidName = enabled => ({
    type: INVALID_NAME,
    payload: {
        invalidName: enabled
    }
});

export const setSkuInvalidDescription = enabled => ({
    type: INVALID_DESCRIPTION,
    payload: {
        invalidDescription: enabled
    }
});