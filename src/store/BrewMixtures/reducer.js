import {
    EDIT_BREW_MIXTURE_SUCCESS,
    FETCH_MIXTURE_BY_BREW_ID_REQUEST,
    FETCH_MIXTURE_BY_BREW_ID_SUCCESS,
    FETCH_MIXTURE_BY_BREW_ID_FAILURE,
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
        case FETCH_MIXTURE_BY_BREW_ID_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_MIXTURE_BY_BREW_ID_SUCCESS:
        case EDIT_BREW_MIXTURE_SUCCESS:
        case SET_BREW_MIXTURE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_MIXTURE_BY_BREW_ID_FAILURE:
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
