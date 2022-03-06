import {
    EDIT_BREW_MIXTURE_SUCCESS,
    FETCH_BREW_MIXTURES_FAILURE,
    FETCH_BREW_MIXTURES_SUCCESS,
    FETCH_BREW_MIXTURES_REQUEST,
    SET_BREW_MIXTURE_DETAILS,
    RESET_BREW_MIXTURE_DETAILS,
} from "./actionTypes";

const initialState = {
    content: [],
    initial: [],
    loading: true,
    error: false,
};
const Mixtures = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_BREW_MIXTURES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BREW_MIXTURES_SUCCESS:
        case EDIT_BREW_MIXTURE_SUCCESS:
        case SET_BREW_MIXTURE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_BREW_MIXTURES_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    ...payload,
                },
            };
        case RESET_BREW_MIXTURE_DETAILS:
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

export { Mixtures as BrewMixtures };
