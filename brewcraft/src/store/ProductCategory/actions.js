import {
    CREATE_PRODUCT_CATEGORY,
    FETCH_PRODUCT_CATEGORY,
    UPDATE_PRODUCT_CATEGORY,
    SET_PRODUCT_CATEGORY_DETAILS,
    INVALID_NAME,
    INVALID_CLASS,
    INVALID_TYPE,
    INVALID_STYLE,
    INVALID_DESCRIPTION,
    RESET_PRODUCT_CATEGORY_DETAILS,
    DELETE_PRODUCT_CATEGORY
} from "./actionTypes";

export const setProductCategoryDetails = product => ({
    type: SET_PRODUCT_CATEGORY_DETAILS,
    payload: {
        data: product
    }
});

export const fetchProductCategoryById = ({id, success}) => ({
    type: FETCH_PRODUCT_CATEGORY,
    payload: { id, success }
});

export const createProductCategory = ({data, categoryId, success}) => ({
    type: CREATE_PRODUCT_CATEGORY,
    payload: {
        form: {
            name: data.name,
            parentCategoryId: categoryId
        },
        success: success
    }
});

export const updateProductCategory = ({data, parentCategoryId, success}) => ({
    type: UPDATE_PRODUCT_CATEGORY,
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

export const deleteProductCategory = ({ id, success }) => ({
    type: DELETE_PRODUCT_CATEGORY,
    payload: { id, success }
});

export const setInvalidName = enabled => ({
    type: INVALID_NAME,
    payload: {
        invalidName: enabled
    }
});

export const setInvalidClass = enabled => ({
    type: INVALID_CLASS,
    payload: {
        invalidClass: enabled
    }
});

export const setInvalidType = enabled => ({
    type: INVALID_TYPE,
    payload: {
        invalidType: enabled
    }
});

export const setInvalidStyle = enabled => ({
    type: INVALID_STYLE,
    payload: {
        invalidStyle: enabled
    }
});

export const resetProductCategoryDetails = success => ({
    type: RESET_PRODUCT_CATEGORY_DETAILS,
    payload: success
});