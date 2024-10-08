import {
    FETCH_MATERIAL_CATEGORIES_REQUEST,
    FETCH_MATERIAL_CATEGORIES_SUCCESS,
    FETCH_MATERIAL_CATEGORIES_FAILURE,
    FETCH_ALL_MATERIAL_CATEGORIES_SUCCESS,
    FETCH_ALL_MATERIAL_CATEGORIES_FAILURE,
    FETCH_ALL_MATERIAL_CATEGORIES_REQUEST,
    SET_MATERIAL_CATEGORIES_DETAILS,
    SET_MATERIAL_CATEGORIES_PAGE_INDEX,
    SET_MATERIAL_CATEGORIES_PAGE_SIZE,
} from "./actionTypes";

const initialState = {
    content: [],
    all: [],
    loading: false,
    error: null,
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20,
};

const MaterialCategories = (state = initialState, { type, payload, data }) => {
    switch (type) {
        case FETCH_MATERIAL_CATEGORIES_REQUEST:
            return {
                ...state,
                data: null,
                loading: true,
                error: null,
            };
        case FETCH_MATERIAL_CATEGORIES_SUCCESS:
            return {
                ...state,
                ...data.data,
                loading: false,
                error: null,
            };
        case FETCH_MATERIAL_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case FETCH_ALL_MATERIAL_CATEGORIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ALL_MATERIAL_CATEGORIES_SUCCESS:
            return {
                ...state,
                all: data.data.content,
                loading: false,
                error: null,
            };
        case FETCH_ALL_MATERIAL_CATEGORIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case SET_MATERIAL_CATEGORIES_DETAILS:
        case SET_MATERIAL_CATEGORIES_PAGE_INDEX:
        case SET_MATERIAL_CATEGORIES_PAGE_SIZE:
            return {
                ...state,
                ...payload,
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

export default MaterialCategories;
