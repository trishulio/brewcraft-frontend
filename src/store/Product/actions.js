import {
    CREATE_PRODUCT,
    FETCH_PRODUCT,
    UPDATE_PRODUCT,
    SET_PRODUCT_DETAILS,
    INVALID_NAME,
    INVALID_CLASS,
    INVALID_TYPE,
    INVALID_STYLE,
    INVALID_DESCRIPTION,
    RESET_PRODUCT_DETAILS,
    DELETE_PRODUCT,
} from "./actionTypes";

export const setProductDetails = (product) => ({
    type: SET_PRODUCT_DETAILS,
    payload: {
        data: product,
    },
});

export const fetchProductById = (id) => ({
    type: FETCH_PRODUCT,
    payload: { id },
});

export const createProduct = ({ data, categoryId }) => ({
    type: CREATE_PRODUCT,
    payload: {
        form: {
            name: data.name,
            description: data.description || "",
            categoryId: categoryId,
        },
    },
});

export const updateProduct = ({ data, categoryId }) => ({
    type: UPDATE_PRODUCT,
    payload: {
        id: data.id,
        form: {
            name: data.name,
            description: data.description || "",
            categoryId: categoryId,
            version: data.version,
        },
    },
});

export const deleteProduct = (id) => ({
    type: DELETE_PRODUCT,
    payload: { id },
});

export const setProductInvalidName = (enabled) => ({
    type: INVALID_NAME,
    payload: {
        invalidName: enabled,
    },
});

export const setProductInvalidClass = (enabled) => ({
    type: INVALID_CLASS,
    payload: {
        invalidClass: enabled,
    },
});

export const setProductInvalidType = (enabled) => ({
    type: INVALID_TYPE,
    payload: {
        invalidType: enabled,
    },
});

export const setProductInvalidStyle = (enabled) => ({
    type: INVALID_STYLE,
    payload: {
        invalidStyle: enabled,
    },
});

export const setProductInvalidDescription = (enabled) => ({
    type: INVALID_DESCRIPTION,
    payload: {
        invalidDescription: enabled,
    },
});

export const resetProductDetails = (success) => ({
    type: RESET_PRODUCT_DETAILS,
    payload: success,
});
