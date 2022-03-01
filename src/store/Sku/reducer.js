import {
    SET_SKU_DETAILS,
    RESET_SKU_DETAILS,
    INVALID_DESCRIPTION,
    SET_SKU_DETAILS_SUCCESS,
    SET_SKU_DETAILS_FAILED,
    INVALID_NUMBER,
    INVALID_NAME,
    INVALID_PRODUCT,
    INVALID_VOLUME,
    INVALID_QUANTITY_UNIT,
} from "./actionTypes";

const initialState = {
    data: {
        id: "",
        number: "",
        name: "",
        description: "",
        product: {},
        materials: [],
        quantity: {
            value: "",
            symbol: "",
        },
        version: null,
    },
    initial: {
        id: "",
        number: "",
        name: "",
        description: "",
        product: {},
        materials: [],
        quantity: {
            value: "",
            symbol: "",
        },
        version: null,
    },
    loading: true,
    error: null,
    invalidName: null,
    invalidProduct: null,
    invalidVolume: null,
    invalidBaseQuantityUnit: null,
};

const Sku = (state = initialState, { type, payload }) => {
    switch (type) {
        case INVALID_NUMBER:
        case INVALID_NAME:
        case INVALID_DESCRIPTION:
        case INVALID_VOLUME:
            return {
                ...state,
                ...payload,
                loading: false,
                error: true,
            };
        case INVALID_QUANTITY_UNIT:
            return {
                ...state,
                ...payload,
                loading: false,
                error: true,
            };
        case INVALID_PRODUCT:
            return {
                ...state,
                ...payload,
                loading: false,
                error: true,
            };
        case SET_SKU_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case SET_SKU_DETAILS_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case SET_SKU_DETAILS_FAILED:
            return {
                ...state,
                ...payload,
                loading: false,
                error: true,
            };
        case RESET_SKU_DETAILS:
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

export default Sku;
