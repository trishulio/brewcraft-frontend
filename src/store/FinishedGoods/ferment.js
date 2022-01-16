import {
    SAVE_FERMENT_FINISHED_GOODS,
    SET_FERMENT_FINISHED_GOODS,
    SAVE_FERMENT_FINISHED_GOODS_ERROR,
    DELETE_FERMENT_FINISHED_GOODS_ERROR,
    FETCH_FINISHED_GOODS_BY_BREW_ID,
    DELETE_FERMENT_FINISHED_GOODS,
    RESET_FERMENT_FINISHED_GOODS_DETAILS,
} from "./actionTypes";
import { initialState } from "./initial";

const FermentFinishedGoods = (state = initialState, { type, payload }) => {
    switch (type) {
        case RESET_FERMENT_FINISHED_GOODS_DETAILS:
            return {
                ...initialState,
                loading: false,
                error: null,
            };
        case SET_FERMENT_FINISHED_GOODS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_FINISHED_GOODS_BY_BREW_ID:
        case SAVE_FERMENT_FINISHED_GOODS:
        case DELETE_FERMENT_FINISHED_GOODS:
            return {
                ...state,
                loading: true,
            };
        case SAVE_FERMENT_FINISHED_GOODS_ERROR:
        case DELETE_FERMENT_FINISHED_GOODS_ERROR:
            return {
                ...state,
                loading: false,
                error: payload.error,
            };
        default:
            return {
                ...state,
            };
    }
};

export default FermentFinishedGoods;
