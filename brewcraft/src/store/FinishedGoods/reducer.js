import {
    SET_FINISHED_GOODS,
    SET_FINISHED_GOODS_PAGE_INDEX,
    SET_FINISHED_GOODS_PAGE_SIZE
} from "./actionTypes";

const initialState = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20,
    loading: true,
    error: null
};

const FinishedGoods = (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_FINISHED_GOODS:
        case SET_FINISHED_GOODS_PAGE_INDEX:
        case SET_FINISHED_GOODS_PAGE_SIZE:
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

export default FinishedGoods;