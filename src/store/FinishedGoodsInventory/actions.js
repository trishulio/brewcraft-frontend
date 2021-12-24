import {
    FETCH_FINISHED_GOODS_INVENTORY_REQUEST,
    FETCH_FINISHED_GOODS_INVENTORY_ERROR,
    FETCH_ALL_FINISHED_GOODS_INVENTORY_REQUEST,
    SET_FINISHED_GOODS_INVENTORY_PAGE_INDEX,
    SET_FINISHED_GOODS_INVENTORY_PAGE_SIZE
} from "./actionTypes";

export const fetchFinishedGoodsInventory = params => ({
    type: FETCH_FINISHED_GOODS_INVENTORY_REQUEST,
    payload: { params },
});

export const fetchFinishedGoodsInventoryError = error => ({
    type: FETCH_FINISHED_GOODS_INVENTORY_ERROR,
    payload: {
        ...error
    }
});

export const fetchAllFinishedGoodsInventory = () => ({
    type: FETCH_ALL_FINISHED_GOODS_INVENTORY_REQUEST,
});

export const setFinishedGoodsInventoryPageIndex = index => ({
    type: SET_FINISHED_GOODS_INVENTORY_PAGE_INDEX,
    payload: {
        pageIndex: index
    }
});

export const setFinishedGoodsInventoryPageSize = size => ({
    type: SET_FINISHED_GOODS_INVENTORY_PAGE_SIZE,
    payload: {
        pageSize: size
    }
});