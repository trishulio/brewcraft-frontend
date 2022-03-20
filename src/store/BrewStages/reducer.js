import {
    RESET_BREW_STAGES,
    SET_BREW_STAGES,
    EDIT_BREW_STAGES_REQUEST,
    EDIT_BREW_STAGES_SUCCESS,
    EDIT_BREW_STAGES_FAILURE,
    FETCH_BREW_STAGES_SUCCESS,
    FETCH_BREW_STAGES_FAILURE,
} from "./actionTypes";

const initialState = {
    content: [],
    initial: [],
    loading: true,
    error: false,
};

const Stages = (state = initialState, { type, payload }) => {
    switch (type) {
        case EDIT_BREW_STAGES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BREW_STAGES_SUCCESS:
        case EDIT_BREW_STAGES_SUCCESS:
        case SET_BREW_STAGES:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_BREW_STAGES_FAILURE:
        case EDIT_BREW_STAGES_FAILURE:
            return {
                ...state,
                loading: false,
                error: { ...payload },
            };
        case RESET_BREW_STAGES:
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

export { Stages };
