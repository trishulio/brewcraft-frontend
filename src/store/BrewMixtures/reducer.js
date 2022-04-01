import {
    FETCH_BATCH_MIXTURES_FAILURE,
    FETCH_BATCH_MIXTURES_SUCCESS,
    FETCH_BATCH_MIXTURES_REQUEST,
    SET_BATCH_MIXTURES,
    RESET_BATCH_MIXTURES,
    EDIT_BATCH_MIXTURES_FAILURE,
    EDIT_BATCH_MIXTURES_SUCCESS,
} from "./actionTypes";

const initialState = {
    content: [],
    initial: [],
    loading: true,
    error: false,
};
const Mixtures = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_BATCH_MIXTURES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BATCH_MIXTURES_SUCCESS:
        case EDIT_BATCH_MIXTURES_SUCCESS:
        case SET_BATCH_MIXTURES:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_BATCH_MIXTURES_FAILURE:
        case EDIT_BATCH_MIXTURES_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    ...payload,
                },
            };
        case RESET_BATCH_MIXTURES:
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
