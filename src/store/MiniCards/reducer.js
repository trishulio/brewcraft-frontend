import {
    FETCH_MINI_CARD_BREWS_MIXTURES_FAILURE,
    FETCH_MINI_CARD_BREWS_MIXTURES_REQUEST,
    FETCH_MINI_CARD_BREWS_MIXTURES_SUCCESS,
    FETCH_MINI_CARD_FINISHED_GOODS_FAILURE,
    FETCH_MINI_CARD_FINISHED_GOODS_REQUEST,
    FETCH_MINI_CARD_FINISHED_GOODS_SUCCESS,
    SET_MINI_CARD_DETAILS,
} from "./actionTypes";

const initialState = {
    brewsMixtures: [],
    finishedGoods: [],
    loading: true,
    error: null,
};

const MiniCards = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_MINI_CARD_DETAILS:
            return {
                ...state,
                ...payload,
            };
        case FETCH_MINI_CARD_BREWS_MIXTURES_REQUEST:
        case FETCH_MINI_CARD_FINISHED_GOODS_REQUEST:
            return {
                state,
                loading: true,
                error: null,
            };
        case FETCH_MINI_CARD_BREWS_MIXTURES_SUCCESS:
        case FETCH_MINI_CARD_FINISHED_GOODS_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_MINI_CARD_BREWS_MIXTURES_FAILURE:
        case FETCH_MINI_CARD_FINISHED_GOODS_FAILURE:
            return {
                state,
                ...payload,
                loading: false,
                error: true,
            };
        default: {
            return {
                ...state,
                error: null,
            };
        }
    }
};

export default MiniCards;
