import { filter } from "lodash";
import {
    ADD_MATERIAL_PORTION_REQUEST,
    ADD_MATERIAL_PORTION_FAILURE,
    EDIT_MATERIAL_PORTION_REQUEST,
    EDIT_MATERIAL_PORTION_SUCCESS,
    DELETE_MATERIAL_PORTION_REQUEST,
    DELETE_MATERIAL_PORTION_SUCCESS,
    ADD_MATERIAL_PORTION_SUCCESS,
    SET_MATERIAL_PORTION_DETAILS,
    RESET_MATERIAL_PORTION_DETAILS,
    SET_MATERIAL_PORTION_INVALID_CATEGORY
} from "./actionTypes";

const initialState = {
    data: {
        id: "",
        name: "",
        description: "",
        category: null,
        baseQuantityUnit: null,
        upc: "",
        imageSrc: "",
        version: null
    },
    initial: {
        id: "",
        name: "",
        description: "",
        category: null,
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

const MaterialPortion = (state = initialState, { type, payload, data }) => {
    switch(type) {
        case SET_MATERIAL_PORTION_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_MATERIAL_PORTION_REQUEST:
        case EDIT_MATERIAL_PORTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_MATERIAL_PORTION_SUCCESS:
        case EDIT_MATERIAL_PORTION_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_MATERIAL_PORTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case DELETE_MATERIAL_PORTION_REQUEST:
        return {
            ...state,
            formLoading: { ...state.formLoading, loading: true },
        };
        case DELETE_MATERIAL_PORTION_SUCCESS:
        return {
            ...state,
            data: filter([...state.data], (instanceData) => {
                return (
                    payload.id!==instanceData.id
                    );
                }),
                formLoading: { ...state.formLoading, loading: false },
            };
        case RESET_MATERIAL_PORTION_DETAILS:
        return {
            ...initialState,
            loading: false,
            error: null
        };
        case SET_MATERIAL_PORTION_INVALID_CATEGORY:
            return {
                ...state,
                invalidCategory: payload,
                loading: false,
                error: null
            };
        default:
        return {
            ...state,
            loading: false,
            error: null
        };
    }
};

export default MaterialPortion;