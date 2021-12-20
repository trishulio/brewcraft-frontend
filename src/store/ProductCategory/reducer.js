import {
    INVALID_NAME,
    INVALID_CLASS,
    INVALID_TYPE,
    INVALID_STYLE,
    INVALID_DESCRIPTION,
    SET_PRODUCT_CATEGORY_DETAILS,
    SET_PRODUCT_CATEGORY_DETAILS_FAILED,
    RESET_PRODUCT_CATEGORY,
} from "./actionTypes";

const initialState = {
    data: {
        id: null,
        name: "",
        parentCategoryId: null,
        version: null,
    },
    initial: {
        id: null,
        name: "",
        parentCategoryId: null,
        version: null,
    },
    status: null,
    color: "info",
    type: null,
    invalidName: false,
    invalidClass: false,
    invalidType: false,
    invalidDescription: false,
    loading: true,
    error: null,
    testValue: true,
};

const Product = (state = initialState, { type, payload }) => {
    switch (type) {
        case INVALID_NAME:
        case INVALID_CLASS:
        case INVALID_TYPE:
        case INVALID_STYLE:
        case INVALID_DESCRIPTION:
        case SET_PRODUCT_CATEGORY_DETAILS:
            console.log(`error sukses`, state)
            return {
                ...state,
                ...payload,
                data: {
                    ...state.data,
                    ...payload.data,
                },
                loading: false,
                error: null,
            };
        case SET_PRODUCT_CATEGORY_DETAILS_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_PRODUCT_CATEGORY:
            return {
                ...state,
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
                loading: true,
                error: null,
            };
    }
};

export default Product;
