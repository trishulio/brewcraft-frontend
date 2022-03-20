import {
    FETCH_BREW_MIXTURE_RECORDINGS_REQUEST,
    FETCH_BREW_MIXTURE_RECORDINGS_SUCCESS,
    FETCH_BREW_MIXTURE_RECORDINGS_FAILURE,
    SET_BREW_MIXTURE_RECORDINGS,
    RESET_BREW_MIXTURE_RECORDINGS,
    EDIT_BREW_MIXTURE_RECORDINGS_REQUEST,
    DELETE_BREW_MIXTURE_RECORDINGS_REQUEST,
} from "./actionTypes";

const initialState = {
    content: [],
    initial: [],
    loading: true,
    error: false,
};
const MixtureRecordings = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_BREW_MIXTURE_RECORDINGS_REQUEST:
        case EDIT_BREW_MIXTURE_RECORDINGS_REQUEST:
        case DELETE_BREW_MIXTURE_RECORDINGS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BREW_MIXTURE_RECORDINGS_SUCCESS:
        case SET_BREW_MIXTURE_RECORDINGS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_BREW_MIXTURE_RECORDINGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_BREW_MIXTURE_RECORDINGS:
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

export { MixtureRecordings };
