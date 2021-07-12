import {
    SET_BATCHES,
    SET_BATCHES_PAGE_INDEX,
    SET_BATCHES_PAGE_SIZE
} from "./actionTypes";

const initialState = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 10,
    loading: true,
    error: null
};

const Batches = (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_BATCHES:
        case SET_BATCHES_PAGE_INDEX:
        case SET_BATCHES_PAGE_SIZE:
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
            };
    }
};

export default Batches;