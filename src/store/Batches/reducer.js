import {
    FETCH_BATCHES_REQUEST,
    FETCH_BATCHES_SUCCESS,
    FETCH_BATCHES_FAILURE,
    FETCH_ALL_BATCHES_SUCCESS,
    FETCH_ALL_BATCHES_FAILURE,
    FETCH_ALL_BATCHES_REQUEST,
    SET_BATCHES_DETAILS,
    SET_BATCHES_PAGE_INDEX,
    SET_BATCHES_PAGE_SIZE,
} from "./actionTypes";

const initialState = {
    content: [],
    all: [],
    loading: true,
    error: null,
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20,
};

const Batches = (state = initialState, { type, payload, data }) => {
    switch (type) {
        case FETCH_BATCHES_SUCCESS:
            return {
                ...state,
                ...data.data,
                loading: false,
                error: null,
            };
        case FETCH_BATCHES_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case FETCH_BATCHES_REQUEST:
        case FETCH_ALL_BATCHES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ALL_BATCHES_SUCCESS:
            return {
                ...state,
                all: data.data.content,
                loading: false,
                error: null,
            };
        case FETCH_ALL_BATCHES_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case SET_BATCHES_DETAILS:
        case SET_BATCHES_PAGE_INDEX:
        case SET_BATCHES_PAGE_SIZE:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
                error: null,
            };
    }
};

export default Batches;
