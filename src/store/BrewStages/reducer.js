import {
    FETCH_BREW_STAGE_BY_BREW_ID_REQUEST,
    FETCH_BREW_STAGES_BY_BREW_ID_SUCCESS,
    FETCH_BREW_STAGES_BY_BREW_ID_FAILURE,
    RESET_BREW_STAGES,
    SET_BREW_STAGES,
    EDIT_BREW_STAGES_REQUEST,
    EDIT_BREW_STAGES_SUCCESS,
    EDIT_BREW_STAGES_FAILURE,
} from "./actionTypes";

const initialState = {
    content: [],
    initial: [],
    loading: true,
    error: false,
};

const Stages = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_BREW_STAGE_BY_BREW_ID_REQUEST:
        case EDIT_BREW_STAGES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BREW_STAGES_BY_BREW_ID_SUCCESS:
        case EDIT_BREW_STAGES_SUCCESS:
        case SET_BREW_STAGES:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_BREW_STAGES_BY_BREW_ID_FAILURE:
        case EDIT_BREW_STAGES_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
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
