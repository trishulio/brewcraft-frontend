import {
    FETCH_PACKAGING_REQUEST,
    FETCH_PACKAGING_SUCCESS,
    FETCH_PACKAGING_FAILURE,
    FETCH_ALL_PACKAGING_SUCCESS,
    FETCH_ALL_PACKAGING_FAILURE,
    FETCH_ALL_PACKAGING_REQUEST,
    SET_PACKAGING_DETAILS,
    SET_PACKAGING_PAGE_INDEX,
    SET_PACKAGING_PAGE_SIZE,
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

const Packaging = (state = initialState, { type, payload, data }) => {
    switch (type) {
        case FETCH_PACKAGING_REQUEST:
            return {
                ...state,
                data: null,
                loading: true,
                error: null,
            };
        case FETCH_PACKAGING_SUCCESS:
            return {
                ...state,
                ...data.data,
                loading: false,
                error: null,
            };
        case FETCH_PACKAGING_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case FETCH_ALL_PACKAGING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ALL_PACKAGING_SUCCESS:
            return {
                ...state,
                all: data.data.content,
                loading: false,
                error: null,
            };
        case FETCH_ALL_PACKAGING_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case SET_PACKAGING_PAGE_INDEX:
        case SET_PACKAGING_PAGE_SIZE:
        case SET_PACKAGING_DETAILS:
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

export default Packaging;
