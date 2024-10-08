import {
    CREATE_PRODUCT,
    FETCH_PRODUCT,
    UPDATE_PRODUCT,
    SET_PRODUCT_DETAILS,
    SET_PRODUCT_DETAILS_ERROR,
    INVALID_NAME,
    INVALID_CLASS,
    INVALID_TYPE,
    INVALID_STYLE,
    INVALID_ABV,
    INVALID_DESCRIPTION,
    INVALID_IMAGE_FILE,
    RESET_PRODUCT_DETAILS,
    DELETE_PRODUCT,
} from "./actionTypes";

export const setProductDetails = (product) => ({
    type: SET_PRODUCT_DETAILS,
    payload: {
        data: product,
    },
});

export const setProductDetailsError = (error) => ({
    type: SET_PRODUCT_DETAILS_ERROR,
    payload: {
        ...error,
    },
});

export const fetchProductById = (id) => ({
    type: FETCH_PRODUCT,
    payload: { id },
});

export const createProduct = ({ data, categoryId, targetMeasures }) => ({
    type: CREATE_PRODUCT,
    payload: {
        form: {
            name: data.name,
            description: data.description || "",
            categoryId: categoryId,
            targetMeasures: targetMeasures || [],
            imageSrc: data.imageSrc,
        },
    },
});

export const updateProduct = ({ data, categoryId, targetMeasures }) => ({
    type: UPDATE_PRODUCT,
    payload: {
        id: data.id,
        form: {
            name: data.name,
            description: data.description || "",
            categoryId: categoryId,
            targetMeasures: targetMeasures,
            imageSrc: data.imageSrc,
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

export const setProductInvalidAbv = (enabled) => ({
    type: INVALID_ABV,
    payload: {
        invalidAbv: enabled,
    },
});

export const setProductInvalidDescription = (enabled) => ({
    type: INVALID_DESCRIPTION,
    payload: {
        invalidDescription: enabled,
    },
});

export const setProductInvalidImageFile = (value) => ({
    type: INVALID_IMAGE_FILE,
    payload: value,
});

export const resetProductDetails = (success) => ({
    type: RESET_PRODUCT_DETAILS,
    payload: success,
});
