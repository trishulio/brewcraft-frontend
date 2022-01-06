import {
    FETCH_FINISHED_GOODS,
    FETCH_FERMENT_FINISHED_GOODS,
    SAVE_FERMENT_FINISHED_GOODS,
    SET_CONDITION_FINISHED_GOODS,
    SET_FERMENT_FINISHED_GOODS,
} from "./actionTypes";

export const fetchFinishedGoods = (params) => ({
    type: FETCH_FINISHED_GOODS,
    payload: { params },
});

export const fetchFermentFinishedGoods = (payload) => ({
    type: FETCH_FERMENT_FINISHED_GOODS,
    payload: { ...payload },
});

export const saveFermentFinishedGoods = (payload) => ({
    type: SAVE_FERMENT_FINISHED_GOODS,
    payload: { ...payload },
});

export const setFermentFinishedGoodsDetails = (payload) => ({
    type: SET_FERMENT_FINISHED_GOODS,
    payload: { ...payload },
});

export const setConditionFinishedGoodsDetails = (payload) => ({
    type: SET_CONDITION_FINISHED_GOODS,
    payload: { ...payload },
});
