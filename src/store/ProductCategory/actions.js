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
    DELETE_PRODUCT_CATEGORY,
    RESET_PRODUCT_CATEGORY,
} from "./actionTypes";

export const setProductCategoryDetails = (product) => ({
    type: SET_PRODUCT_CATEGORY_DETAILS,
    payload: {
        data: product,
    },
});

export const fetchProductCategoryById = ({ id, success }) => ({
    type: FETCH_PRODUCT_CATEGORY,
    payload: { id, success },
});

export const createProductCategory = ({ data, categoryId, success }) => ({
    type: CREATE_PRODUCT_CATEGORY,
    payload: {
        form: {
            name: data.name,
            parentCategoryId: categoryId,
        },
        success: success,
    },
});

export const updateProductCategory = ({ data, parentCategoryId, success }) => ({
    type: UPDATE_PRODUCT_CATEGORY,
    payload: {
        id: data.id,
        form: {
            name: data.name,
            parentCategoryId: parentCategoryId,
            version: data.version,
        },
        success: success,
    },
});

export const deleteProductCategory = (id) => ({
    type: DELETE_PRODUCT_CATEGORY,
    payload: { id },
});

export const setProductCategoryInvalidName = (enabled) => ({
    type: INVALID_NAME,
    payload: {
        invalidName: enabled,
    },
});

export const setProductCategoryInvalidClass = (enabled) => ({
    type: INVALID_CLASS,
    payload: {
        invalidClass: enabled,
    },
});

export const setProductCategoryInvalidType = (enabled) => ({
    type: INVALID_TYPE,
    payload: {
        invalidType: enabled,
    },
});

export const setProductCategoryInvalidStyle = (enabled) => ({
    type: INVALID_STYLE,
    payload: {
        invalidStyle: enabled,
    },
});

export const setProductCategoryInvalidDescription = (enabled) => ({
    type: INVALID_DESCRIPTION,
    payload: {
        invalidDescription: enabled,
    },
});

export const resetProductCategory = () => ({
    type: RESET_PRODUCT_CATEGORY,
    payload: null,
});
