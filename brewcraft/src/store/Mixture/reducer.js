import { filter } from "lodash";
import {
    ADD_MIXTURE_REQUEST,
    ADD_MIXTURE_FAILURE,
    EDIT_MIXTURE_REQUEST,
    EDIT_MIXTURE_SUCCESS,
    DELETE_MIXTURE_REQUEST,
    DELETE_MIXTURE_SUCCESS,
    ADD_MIXTURE_SUCCESS,
    SET_MIXTURE_DETAILS,
    RESET_MIXTURE_DETAILS,
    SET_MIXTURE_INVALID_CATEGORY
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

const Mixture = (state = initialState, { type, payload, data } = {}) => {
    switch(type) {
        case SET_MIXTURE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_MIXTURE_REQUEST:
        case EDIT_MIXTURE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_MIXTURE_SUCCESS:
        case EDIT_MIXTURE_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_MIXTURE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case DELETE_MIXTURE_REQUEST:
            return {
                ...state,
                formLoading: { ...state.formLoading, loading: true },
            };
        case DELETE_MIXTURE_SUCCESS:
            return {
                ...state,
                data: filter([...state.data], (instanceData) => {
                    return (
                        payload.id!==instanceData.id
                        );
                    }),
                    formLoading: { ...state.formLoading, loading: false },
                };
        case RESET_MIXTURE_DETAILS:
            return {
                ...initialState,
                loading: false,
                error: null
            };
        case SET_MIXTURE_INVALID_CATEGORY:
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

export default Mixture;