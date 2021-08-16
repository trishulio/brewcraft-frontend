import {
    FETCH_RAW_MATERIALS_REQUEST,
    FETCH_RAW_MATERIALS_SUCCESS,
    FETCH_RAW_MATERIALS_FAILURE,
    FETCH_ALL_RAW_MATERIALS_SUCCESS,
    FETCH_ALL_RAW_MATERIALS_FAILURE,
    FETCH_ALL_RAW_MATERIALS_REQUEST,
    SET_RAW_MATERIALS_DETAILS,
    SET_RAW_MATERIALS_PAGE_INDEX,
    SET_RAW_MATERIALS_PAGE_SIZE
} from "./actionTypes";

const initialState = {
    content: [],
    all: [],
    loading: false,
    error: null,
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20
};

const RawMaterials = (state = initialState, { type, payload, data }) => {
    switch (type) {
        case FETCH_RAW_MATERIALS_REQUEST:
            return {
                ...state,
                data: null,
                loading: true,
                error: null,
            };
        case FETCH_RAW_MATERIALS_SUCCESS:
            return {
                ...state,
                ...data.data,
                loading: false,
                error: null,
            };
        case FETCH_RAW_MATERIALS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case FETCH_ALL_RAW_MATERIALS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_ALL_RAW_MATERIALS_SUCCESS:
            return {
                ...state,
                all: data.data.content,
                loading: false,
                error: null,
            };
        case FETCH_ALL_RAW_MATERIALS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case SET_RAW_MATERIALS_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case SET_RAW_MATERIALS_PAGE_INDEX:
        case SET_RAW_MATERIALS_PAGE_SIZE:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        default:
            return {
                ...state,
                loading: true,
                error: null
            }
    }
}

export default RawMaterials;