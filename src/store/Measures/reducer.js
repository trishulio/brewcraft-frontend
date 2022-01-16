import {
    FETCH_MEASURES_SUCCESS,
    SET_MEASURE_DETAILS,
    SET_MEASURE_PAGE_INDEX,
    SET_MEASURE_PAGE_SIZE,
    FETCH_MEASURES_FAILURE,
} from "./actionTypes";

const initialState = {
    content: [],
    data: [],
    loading: false,
    error: null,
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20,
};

const Measures = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_MEASURES_SUCCESS:
        case SET_MEASURE_DETAILS:
        case SET_MEASURE_PAGE_INDEX:
        case SET_MEASURE_PAGE_SIZE:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_MEASURES_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        default:
            return {
                ...state,
                loading: true,
                error: null,
            };
    }
};

export default Measures;
