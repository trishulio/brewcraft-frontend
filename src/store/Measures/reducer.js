import {
    SET_MEASURES,
    SET_MEASURE_DETAILS,
    SET_MEASURE_PAGE_INDEX,
    SET_MEASURE_PAGE_SIZE,
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
        case SET_MEASURES:
        case SET_MEASURE_DETAILS:
        case SET_MEASURE_PAGE_INDEX:
        case SET_MEASURE_PAGE_SIZE:
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

export default Measures;
