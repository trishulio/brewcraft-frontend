import {
    FETCH_MINI_CARD_BREWS_MIXTURES_FAILURE,
    FETCH_MINI_CARD_BREWS_MIXTURES_REQUEST,
    FETCH_MINI_CARD_BREWS_MIXTURES_SUCCESS,
    SET_MINI_CARD_DETAILS,
} from "./actionTypes";

const initialState = {
    brewsMixtures: [],
    loading: true,
    error: null,
};

const MiniCards = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_MINI_CARD_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case FETCH_MINI_CARD_BREWS_MIXTURES_REQUEST:
            return {
                state,
                loading: true,
            };
        case FETCH_MINI_CARD_BREWS_MIXTURES_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_MINI_CARD_BREWS_MIXTURES_FAILURE:
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
