import { filter } from "lodash";
import {
    ADD_BREW_STAGE_REQUEST,
    ADD_BREW_STAGE_FAILURE,
    EDIT_BREW_STAGE_REQUEST,
    EDIT_BREW_STAGE_SUCCESS,
    DELETE_BREW_STAGE_REQUEST,
    DELETE_BREW_STAGE_SUCCESS,
    ADD_BREW_STAGE_SUCCESS,
    SET_BREW_STAGE_DETAILS,
    RESET_BREW_STAGE_DETAILS,
    SET_BREW_STAGE_INVALID_CATEGORY
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

const BrewStage = (state = initialState, { type, payload, data }) => {
    switch(type) {
        case SET_BREW_STAGE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_BREW_STAGE_REQUEST:
        case EDIT_BREW_STAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_BREW_STAGE_SUCCESS:
        case EDIT_BREW_STAGE_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_BREW_STAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case DELETE_BREW_STAGE_REQUEST:
        return {
            ...state,
            formLoading: { ...state.formLoading, loading: true },
        };
        case DELETE_BREW_STAGE_SUCCESS:
        return {
            ...state,
            data: filter([...state.data], (instanceData) => {
                return (
                    payload.id!==instanceData.id
                    );
                }),
                formLoading: { ...state.formLoading, loading: false },
            };
        case RESET_BREW_STAGE_DETAILS:
        return {
            ...initialState,
            loading: false,
            error: null
        };
        case SET_BREW_STAGE_INVALID_CATEGORY:
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

export default BrewStage;