import {
    INVALID_NAME,
    INVALID_CLASS,
    INVALID_TYPE,
    INVALID_STYLE,
    INVALID_DESCRIPTION,
    SET_PRODUCT_DETAILS,
    SET_INITIAL_PRODUCT_DETAILS,
    RESET_PRODUCT_DETAILS,
    SET_PRODUCT_DETAILS_FAILED,
} from "./actionTypes";

const initialState = {
    data: {
        id: null,
        name: "",
        description: "",
        targetMeasures: [],
        productClass: "",
        type: "",
        style: "",
        version: null,
    },
    initialProduct: {
        id: null,
        name: "",
        description: "",
        targetMeasures: [],
        productClass: "",
        type: "",
        style: "",
        version: null,
    },
    status: null,
    color: "info",
    type: null,
    invalidName: false,
    invalidClass: false,
    invalidType: false,
    invalidStyle: false,
    invalidDescription: false,
    redirect: "",
    loading: true,
    error: null,
};

const Product = (state = initialState, { type, payload }) => {
    switch (type) {
        case INVALID_NAME:
        case INVALID_CLASS:
        case INVALID_TYPE:
        case INVALID_STYLE:
        case INVALID_DESCRIPTION:
            return {
                ...state,
                ...payload,
                loading: false,
                error: true,
            };
        case SET_PRODUCT_DETAILS:
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
        case SET_PRODUCT_DETAILS_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case SET_INITIAL_PRODUCT_DETAILS:
            return {
                ...state,
                ...payload,
                initialProduct: {
                    ...initialState,
                    ...payload.data,
                },
                loading: false,
                error: null,
            };
        case RESET_PRODUCT_DETAILS:
            return {
                ...initialState,
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
