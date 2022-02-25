import {
    FETCH_FINISHED_GOODS_BY_BREW_ID_FAILURE,
    FETCH_FINISHED_GOODS_BY_BREW_ID_REQUEST,
    FETCH_FINISHED_GOODS_BY_BREW_ID_SUCCESS,
    RESET_FINISHED_GOODS_DETAILS,
    SET_FINISHED_GOODS,
    SET_FINISHED_GOODS_PAGE_INDEX,
    SET_FINISHED_GOODS_PAGE_SIZE,
} from "./actionTypes";

const initialState = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20,
    loading: true,
    error: null,
};

const FinishedGoods = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_FINISHED_GOODS_BY_BREW_ID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_FINISHED_GOODS_BY_BREW_ID_SUCCESS:
        case SET_FINISHED_GOODS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_FINISHED_GOODS_BY_BREW_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_FINISHED_GOODS_DETAILS:
            return {
                ...initialState,
                loading: false,
                error: null,
            };
        case SET_FINISHED_GOODS_PAGE_INDEX:
        case SET_FINISHED_GOODS_PAGE_SIZE:
            return {
                ...state,
                ...payload,
            };
        default:
            return {
                ...state,
            };
    }
};

export { FinishedGoods };
