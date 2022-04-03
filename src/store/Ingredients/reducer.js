import {
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_FAILURE,
    FETCH_ALL_INGREDIENTS_SUCCESS,
    FETCH_ALL_INGREDIENTS_FAILURE,
    FETCH_ALL_INGREDIENTS_REQUEST,
    SET_INGREDIENTS_DETAILS,
    SET_INGREDIENTS_PAGE_INDEX,
    SET_INGREDIENTS_PAGE_SIZE,
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

const Ingredients = (state = initialState, { type, payload, data }) => {
    switch (type) {
        case FETCH_INGREDIENTS_REQUEST:
            return {
                ...state,
                data: null,
                loading: true,
                error: null,
            };
        case FETCH_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ...data.data,
                loading: false,
                error: null,
            };
        case FETCH_INGREDIENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case FETCH_ALL_INGREDIENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ALL_INGREDIENTS_SUCCESS:
            return {
                ...state,
                all: data.data.content,
                loading: false,
                error: null,
            };
        case FETCH_ALL_INGREDIENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case SET_INGREDIENTS_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case SET_INGREDIENTS_PAGE_INDEX:
        case SET_INGREDIENTS_PAGE_SIZE:
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

export default Ingredients;
