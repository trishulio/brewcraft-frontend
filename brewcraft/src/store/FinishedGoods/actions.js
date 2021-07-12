import {
    FETCH_FINISHED_GOODS,
    FETCH_ALL_FINISHED_GOODS,
    SET_FINISHED_GOODS,
    SET_FINISHED_GOODS_PAGE_INDEX,
    SET_FINISHED_GOODS_PAGE_SIZE
} from "./actionTypes";

export const setFinishedGoodsDetails = (payload) => ({
    type: SET_FINISHED_GOODS,
    payload: { ...payload }
});

export const setFinishedGoodsPageIndex = index => ({
    type: SET_FINISHED_GOODS_PAGE_INDEX,
    payload: {
        pageIndex: index
    }
});

export const setFinishedGoodsPageSize = size => ({
    type: SET_FINISHED_GOODS_PAGE_SIZE,
    payload: {
        pageSize: size
    }
});

export const fetchFinishedGoods = ({pageIndex, pageSize, parentCategoryId, success}) => ({
    type: FETCH_FINISHED_GOODS,
    payload: {pageIndex, pageSize, parentCategoryId, success}
});

export const fetchAllFinishedGoods = params => ({
    type: FETCH_ALL_FINISHED_GOODS,
    payload: {
        success: params?.success
    }
});