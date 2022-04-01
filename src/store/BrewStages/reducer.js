import {
    RESET_BATCH_STAGES,
    SET_BATCH_STAGES,
    EDIT_BATCH_STAGES,
    EDIT_BATCH_STAGES_SUCCESS,
    EDIT_BATCH_STAGES_FAILURE,
    FETCH_BATCH_STAGES_SUCCESS,
    FETCH_BATCH_STAGES_FAILURE,
} from "./actionTypes";

const initialState = {
    content: [],
    initial: [],
    loading: true,
    error: false,
};

const Stages = (state = initialState, { type, payload }) => {
    switch (type) {
        case EDIT_BATCH_STAGES:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BATCH_STAGES_SUCCESS:
        case EDIT_BATCH_STAGES_SUCCESS:
        case SET_BATCH_STAGES:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_BATCH_STAGES_FAILURE:
        case EDIT_BATCH_STAGES_FAILURE:
            return {
                ...state,
                loading: false,
                error: { ...payload },
            };
        case RESET_BATCH_STAGES:
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
