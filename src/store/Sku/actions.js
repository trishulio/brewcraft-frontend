import {
    CREATE_SKU,
    FETCH_SKU,
    UPDATE_SKU,
    SET_SKU_DETAILS,
    RESET_SKU_DETAILS,
    INVALID_NAME,
    INVALID_DESCRIPTION,
    DELETE_SKU,
    INVALID_PRODUCT,
    INVALID_VOLUME,
    INVALID_QUANTITY_UNIT,
} from "./actionTypes";

export const setSkuDetails = (payload) => ({
    type: SET_SKU_DETAILS,
    payload,
});

export const fetchSkuById = ({ id, success }) => ({
    type: FETCH_SKU,
    payload: { id, success },
});

export const createSku = (payload) => ({
    type: CREATE_SKU,
    payload,
});

export const updateSku = (payload) => ({
    type: UPDATE_SKU,
    payload,
});

export const deleteSku = (id) => ({
    type: DELETE_SKU,
    payload: { id },
});

export const resetSkuDetails = () => ({
    type: RESET_SKU_DETAILS,
    payload: null,
});

export const setSkuInvalidName = (value) => ({
    type: INVALID_NAME,
    payload: {
        invalidName: value.length > 12 || !value,
    },
});

export const setSkuInvalidProduct = (enabled) => ({
    type: INVALID_PRODUCT,
    payload: {
        invalidProduct: enabled,
    },
});

export const setSkuInvalidVolume = (enabled) => ({
    type: INVALID_VOLUME,
    payload: {
        invalidVolume: enabled,
    },
});

export const setSkuInvalidDescription = (enabled) => ({
    type: INVALID_DESCRIPTION,
    payload: {
        invalidDescription: enabled,
    },
});

export const setSkuInvalidBaseQuantityUnit = (enabled) => ({
    type: INVALID_QUANTITY_UNIT,
    payload: {
        invalidBaseQuantityUnit: enabled,
    },
});
