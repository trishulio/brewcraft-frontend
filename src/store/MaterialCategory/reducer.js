import { filter } from "lodash";
import {
    ADD_MATERIAL_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    EDIT_MATERIAL_CATEGORY_REQUEST,
    EDIT_MATERIAL_CATEGORY_SUCCESS,
    DELETE_MATERIAL_CATEGORY_REQUEST,
    DELETE_MATERIAL_CATEGORY_SUCCESS,
    FETCH_MATERIAL_CATEGORY_BY_ID_REQUEST,
    FETCH_MATERIAL_CATEGORY_BY_ID_SUCCESS,
    FETCH_MATERIAL_CATEGORY_BY_ID_FAILURE,
    SET_MATERIAL_CATEGORY_DETAILS,
    RESET_MATERIAL_CATEGORY_DETAILS,
    INVALID_MATERIAL_CATEGORY_NAME,
    INVALID_MATERIAL_CATEGORY_PARENT_CATEGORY,
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
    invalidName: false,
    invalidParentCategory: false,
    loading: true,
    error: null,
};

const MaterialCategory = (state = initialState, { type, payload, data }) => {
    switch (type) {
        case SET_MATERIAL_CATEGORY_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_MATERIAL_CATEGORY_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_MATERIAL_CATEGORY_BY_ID_SUCCESS:
            return {
                ...state,
                data: data,
                loading: false,
                error: null,
            };
        case FETCH_MATERIAL_CATEGORY_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case ADD_MATERIAL_CATEGORY_REQUEST:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case ADD_CATEGORY_SUCCESS:
        case EDIT_MATERIAL_CATEGORY_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_CATEGORY_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case EDIT_MATERIAL_CATEGORY_REQUEST:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case DELETE_MATERIAL_CATEGORY_REQUEST:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case DELETE_MATERIAL_CATEGORY_SUCCESS:
            return {
                ...state,
                data: filter([...state.data], (instanceData) => {
                    return payload.id !== instanceData.id;
                }),
                loading: false,
                error: null,
            };
        case RESET_MATERIAL_CATEGORY_DETAILS:
            return {
                ...initialState,
                loading: false,
                error: null,
            };
        case INVALID_MATERIAL_CATEGORY_NAME:
        case INVALID_MATERIAL_CATEGORY_PARENT_CATEGORY:
            return {
                ...state,
                ...payload,
                loading: false,
                error: true,
            };
        default:
            return {
                ...state,
                loading: true,
                error: null,
            };
    }
};

export default MaterialCategory;
