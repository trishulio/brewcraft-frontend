import {
    FETCH_FINISHED_GOODS_INVENTORY_REQUEST,
    FETCH_FINISHED_GOODS_INVENTORY_SUCCESS,
    FETCH_FINISHED_GOODS_INVENTORY_ERROR,
    FETCH_ALL_FINISHED_GOODS_INVENTORY_SUCCESS,
    FETCH_ALL_FINISHED_GOODS_INVENTORY_REQUEST,
    SET_FINISHED_GOODS_INVENTORY_PAGE_INDEX,
    SET_FINISHED_GOODS_INVENTORY_PAGE_SIZE,
} from "./actionTypes";

const initialState = {
    content: [],
    all: [],
    loading: false,
    error: null,
    totalElements: 0,
    totalItems: 0,
    pageIndex: 0,
    pageSize: 20
};

const FinishedGoodsInventory = (state = initialState, { type, payload, data }) => {
    switch (type) {
        case FETCH_FINISHED_GOODS_INVENTORY_REQUEST:
            return {
                ...state,
                data: null,
                loading: true,
                error: null,
            };
        case FETCH_ALL_FINISHED_GOODS_INVENTORY_SUCCESS:
        case FETCH_FINISHED_GOODS_INVENTORY_SUCCESS:
            return {
                ...state,
                ...data.data,
                loading: false,
                error: null,
            };
        case FETCH_FINISHED_GOODS_INVENTORY_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case FETCH_ALL_FINISHED_GOODS_INVENTORY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SET_FINISHED_GOODS_INVENTORY_PAGE_INDEX:
        case SET_FINISHED_GOODS_INVENTORY_PAGE_SIZE:
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

export default FinishedGoodsInventory;