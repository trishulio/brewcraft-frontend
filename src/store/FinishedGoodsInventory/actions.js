import {
    FETCH_FINISHED_GOODS_INVENTORY_AGGREGATION_REQUEST,
    FETCH_FINISHED_GOODS_INVENTORY_AGGREGATION_ERROR,
    SET_FINISHED_GOODS_INVENTORY_AGGREGATION_PAGE_INDEX,
    SET_FINISHED_GOODS_INVENTORY_AGGREGATION_PAGE_SIZE,
    FETCH_FINISHED_GOODS_INVENTORY_REQUEST,
    FETCH_FINISHED_GOODS_INVENTORY_ERROR,
    SET_FINISHED_GOODS_INVENTORY_PAGE_INDEX,
    SET_FINISHED_GOODS_INVENTORY_PAGE_SIZE,
    RESET_FINISHED_GOODS_INVENTORY,
} from "./actionTypes";

export const fetchFinishedGoodsInventoryAggregation = (params) => ({
    type: FETCH_FINISHED_GOODS_INVENTORY_AGGREGATION_REQUEST,
    payload: { params },
});

export const fetchFinishedGoodsInventoryAggregationError = (error) => ({
    type: FETCH_FINISHED_GOODS_INVENTORY_AGGREGATION_ERROR,
    payload: {
        ...error,
    },
});

export const setFinishedGoodsInventoryAggregationPageIndex = (index) => ({
    type: SET_FINISHED_GOODS_INVENTORY_AGGREGATION_PAGE_INDEX,
    payload: {
        pageIndex: index,
    },
});

export const setFinishedGoodsInventoryAggregationPageSize = (size) => ({
    type: SET_FINISHED_GOODS_INVENTORY_AGGREGATION_PAGE_SIZE,
    payload: {
        pageSize: size,
    },
});

export const fetchFinishedGoodsInventory = (params) => ({
    type: FETCH_FINISHED_GOODS_INVENTORY_REQUEST,
    payload: { params },
});

export const fetchFinishedGoodsInventoryError = (error) => ({
    type: FETCH_FINISHED_GOODS_INVENTORY_ERROR,
    payload: {
        ...error,
    },
});

export const setFinishedGoodsInventoryPageIndex = (index) => ({
    type: SET_FINISHED_GOODS_INVENTORY_PAGE_INDEX,
    payload: {
        pageIndex: index,
    },
});

export const setFinishedGoodsInventoryPageSize = (size) => ({
    type: SET_FINISHED_GOODS_INVENTORY_PAGE_SIZE,
    payload: {
        pageSize: size,
    },
});

export const resetFinishedGoodsInventory = () => ({
    type: RESET_FINISHED_GOODS_INVENTORY,
    payload: null,
});
