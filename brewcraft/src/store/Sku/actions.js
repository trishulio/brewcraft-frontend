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

export const setSkuDetails = product => ({
    type: SET_SKU_DETAILS,
    payload: {
        data: product
    }
});

export const fetchSkuById = ({id, success}) => ({
    type: FETCH_SKU,
    payload: { id, success }
});

export const createSku = ({data, categoryId, success}) => ({
    type: CREATE_SKU,
    payload: {
        form: {
            name: data.name,
            parentCategoryId: categoryId
        },
        success: success
    }
});

export const updateSku = ({data, parentCategoryId, success}) => ({
    type: UPDATE_SKU,
    payload: {
        id: data.id,
        form: {
            name: data.name,
            parentCategoryId: parentCategoryId,
            version: data.version
        },
        success: success
    }
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

export const setSkuInvalidClass = enabled => ({
    type: INVALID_CLASS,
    payload: {
        invalidClass: enabled
    }
});

export const setSkuInvalidType = enabled => ({
    type: INVALID_TYPE,
    payload: {
        invalidType: enabled
    }
});

export const setSkuInvalidStyle = enabled => ({
    type: INVALID_STYLE,
    payload: {
        invalidStyle: enabled
    }
});

export const setSkuInvalidDescription = enabled => ({
    type: INVALID_DESCRIPTION,
    payload: {
        invalidDescription: enabled
    }
});