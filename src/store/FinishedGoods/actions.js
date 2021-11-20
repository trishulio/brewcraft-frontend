import {
    FETCH_FINISHED_GOODS,
    SET_BRITE_TANK_FINISHED_GOODS,
    SET_CONDITION_FINISHED_GOODS,
    SET_FERMENT_FINISHED_GOODS,
    SET_FINISHED_GOODS,
    SET_FINISHED_GOODS_PAGE_INDEX,
    SET_FINISHED_GOODS_PAGE_SIZE
} from "./actionTypes";

export const setFinishedGoodsDetails = payload => ({
    type: SET_FINISHED_GOODS,
    payload: { ...payload }
});

export const setFermentFinishedGoodsDetails = payload => ({
    type: SET_FERMENT_FINISHED_GOODS,
    payload: { ...payload }
});

export const setConditionFinishedGoodsDetails = payload => ({
    type: SET_CONDITION_FINISHED_GOODS,
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

export const fetchFinishedGoods = payload => ({
    type: FETCH_FINISHED_GOODS,
    payload: { ...payload }
});