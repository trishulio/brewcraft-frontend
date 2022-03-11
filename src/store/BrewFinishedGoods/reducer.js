import {
    SET_BREW_FINISHED_GOODS,
    RESET_BREW_FINISHED_GOODS,
    EDIT_BREW_FINISHED_GOODS_REQUEST,
    DELETE_BREW_FINISHED_GOODS_REQUEST,
    FETCH_BREW_FINISHED_GOODS_REQUEST,
    FETCH_BREW_FINISHED_GOODS_SUCCESS,
    FETCH_BREW_FINISHED_GOODS_FAILURE,
} from "./actionTypes";

const initialState = {
    content: [],
    initial: [],
    loading: true,
    error: false,
};
const BrewFinishedGoods = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_BREW_FINISHED_GOODS_REQUEST:
        case EDIT_BREW_FINISHED_GOODS_REQUEST:
        case DELETE_BREW_FINISHED_GOODS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BREW_FINISHED_GOODS_SUCCESS:
        case SET_BREW_FINISHED_GOODS:
            debugger;
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_BREW_FINISHED_GOODS_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_BREW_FINISHED_GOODS:
            return {
                ...initialState,
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
            };
    }
};

export { BrewFinishedGoods };
