import { filter } from "lodash";
import {
    ADD_PACKAGING_ITEM_REQUEST,
    ADD_PACKAGING_ITEM_FAILURE,
    EDIT_PACKAGING_ITEM_REQUEST,
    EDIT_PACKAGING_ITEM_SUCCESS,
    DELETE_PACKAGING_ITEM_REQUEST,
    DELETE_PACKAGING_ITEM_SUCCESS,
    ADD_PACKAGING_ITEM_SUCCESS,
    SET_PACKAGING_ITEM_DETAILS,
    RESET_PACKAGING_ITEM_DETAILS,
    PACKAGING_ITEM_INVALID_NAME,
    PACKAGING_ITEM_INVALID_CATEGORY,
    PACKAGING_ITEM_INVALID_BASE_QUANTITY_UNIT,
    PACKAGING_ITEM_INVALID_UPC
} from "./actionTypes";

const initialState = {
    data: {
        id: "",
        name: "",
        description: "",
        category: "",
        baseQuantityUnit: null,
        upc: "",
        imageSrc: "",
        version: null
    },
    initial: {
        id: "",
        name: "",
        description: "",
        category: "",
        baseQuantityUnit: null,
        upc: "",
        imageSrc: "",
        version: null
    },
    invalidName: false,
    invalidDescription: false,
    invalidClass: false,
    invalidCategory: false,
    invalidBaseQuantityUnit: false,
    invalidUpc: false,
    loading: true,
    error: null
};

const PackagingItem = (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_PACKAGING_ITEM_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_PACKAGING_ITEM_REQUEST:
        case EDIT_PACKAGING_ITEM_REQUEST:
        case DELETE_PACKAGING_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_PACKAGING_ITEM_SUCCESS:
        case EDIT_PACKAGING_ITEM_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_PACKAGING_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case DELETE_PACKAGING_ITEM_SUCCESS:
        return {
            ...state,
            data: filter([...state.data], (instanceData) => {
                return (
                    payload.id!==instanceData.id
                    );
                }),
                formLoading: { ...state.formLoading, loading: false },
            };
        case RESET_PACKAGING_ITEM_DETAILS:
        return {
            ...initialState,
            loading: false,
            error: null
        };
        case PACKAGING_ITEM_INVALID_NAME:
        case PACKAGING_ITEM_INVALID_CATEGORY:
        case PACKAGING_ITEM_INVALID_BASE_QUANTITY_UNIT:
        case PACKAGING_ITEM_INVALID_UPC:
            return {
                ...state,
                ...payload,
                loading: false,
                error: true
            };
        default:
        return {
            ...state,
            loading: false,
            error: null
        };
    }
};

export default PackagingItem;