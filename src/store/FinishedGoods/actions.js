import {
    DELETE_FINISHED_GOODS_REQUEST,
    FETCH_FINISHED_GOODS_BY_BREW_ID_REQUEST,
    FETCH_FINISHED_GOODS_BY_MIXTURE_ID_REQUEST,
    FETCH_FINISHED_GOODS_REQUEST,
    FETCH_FINISHED_GOOD_BY_ID_REQUEST,
    SAVE_FINISHED_GOODS_REQUEST,
    SET_FINISHED_GOODS,
    SET_FINISHED_GOODS_PAGE_INDEX,
    SET_FINISHED_GOODS_PAGE_SIZE,
} from "./actionTypes";

export const fetchFinishedGoods = (id) => ({
    type: FETCH_FINISHED_GOODS_REQUEST,
    payload: { id },
});

export const fetchFinishedGoodById = (id) => ({
    type: FETCH_FINISHED_GOOD_BY_ID_REQUEST,
    payload: { id },
});

export const fetchFinishedGoodsByBrewId = (id) => ({
    type: FETCH_FINISHED_GOODS_BY_BREW_ID_REQUEST,
    payload: { id },
});

export const fetchFinishedGoodsByMixtureId = (id) => ({
    type: FETCH_FINISHED_GOODS_BY_MIXTURE_ID_REQUEST,
    payload: { id },
});

export const saveFinishedGoods = (payload) => ({
    type: SAVE_FINISHED_GOODS_REQUEST,
    payload: { ...payload },
});

export const deleteFinishedGoods = (payload) => ({
    type: DELETE_FINISHED_GOODS_REQUEST,
    payload: { ...payload },
});

export const setFinishedGoods = (payload) => ({
    type: SET_FINISHED_GOODS,
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
