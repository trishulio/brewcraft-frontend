import {
    DELETE_BREW_FINISHED_GOODS_REQUEST,
    EDIT_BREW_FINISHED_GOODS_REQUEST,
    FETCH_BREW_FINISHED_GOODS_REQUEST,
    SET_BREW_FINISHED_GOODS,
    SET_FINISHED_GOODS_PAGE_INDEX,
    SET_FINISHED_GOODS_PAGE_SIZE,
} from "./actionTypes";

export const setBrewFinishedGoods = (payload) => ({
    type: SET_BREW_FINISHED_GOODS,
    payload: { ...payload },
});

export const fetchFinishedGoods = (params) => ({
    type: FETCH_BREW_FINISHED_GOODS_REQUEST,
    payload: { params },
});

export const editBrewMixtures = (payload) => ({
    type: EDIT_BREW_FINISHED_GOODS_REQUEST,
    payload: { ...payload },
});

export const deleteFinishedGoods = (payload) => ({
    type: DELETE_BREW_FINISHED_GOODS_REQUEST,
    payload: { ...payload },
});

export const setFinishedGoodsPageIndex = (index) => ({
    type: SET_FINISHED_GOODS_PAGE_INDEX,
    payload: {
        pageIndex: index,
    },
});

export const setFinishedGoodsPageSize = (size) => ({
    type: SET_FINISHED_GOODS_PAGE_SIZE,
    payload: {
        pageSize: size,
    },
});
