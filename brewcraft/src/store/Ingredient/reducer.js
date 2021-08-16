import { filter } from "lodash";
import {
    ADD_INGREDIENT_REQUEST,
    ADD_INGREDIENT_FAILURE,
    EDIT_INGREDIENT_REQUEST,
    EDIT_INGREDIENT_SUCCESS,
    DELETE_INGREDIENT_REQUEST,
    DELETE_INGREDIENT_SUCCESS,
    ADD_INGREDIENT_SUCCESS,
    SET_INGREDIENT_DETAILS,
    RESET_INGREDIENT_DETAILS,
    SET_INGREDIENT_INVALID_CATEGORY
} from "./actionTypes";

const initialState = {
    data: {
        id: "",
        name: "",
        description: "",
        category: null,
        baseQuantityUnit: null,
        upc: "",
        version: null
    },
    initial: {
        id: "",
        name: "",
        description: "",
        category: null,
        baseQuantityUnit: null,
        upc: "",
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

const Ingredient = (state = initialState, { type, payload, data }) => {
    switch(type) {
        case SET_INGREDIENT_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_INGREDIENT_REQUEST:
        case EDIT_INGREDIENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_INGREDIENT_SUCCESS:
        case EDIT_INGREDIENT_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_INGREDIENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case DELETE_INGREDIENT_REQUEST:
        return {
            ...state,
            formLoading: { ...state.formLoading, loading: true },
        };
        case DELETE_INGREDIENT_SUCCESS:
        return {
            ...state,
            data: filter([...state.data], (instanceData) => {
                return (
                    payload.id!==instanceData.id
                    );
                }),
                formLoading: { ...state.formLoading, loading: false },
            };
        case RESET_INGREDIENT_DETAILS:
        return {
            ...initialState,
            loading: false,
            error: null
        };
        case SET_INGREDIENT_INVALID_CATEGORY:
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

export default Ingredient;