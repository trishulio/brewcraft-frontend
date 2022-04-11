import {
    FETCH_BATCH_MIXTURE_RECORDINGS_REQUEST,
    FETCH_BATCH_MIXTURE_RECORDINGS_SUCCESS,
    FETCH_BATCH_MIXTURE_RECORDINGS_FAILURE,
    SET_BATCH_MIXTURE_RECORDINGS,
    RESET_BATCH_MIXTURE_RECORDINGS,
    EDIT_BATCH_MIXTURE_RECORDINGS,
    DELETE_BATCH_MIXTURE_RECORDINGS_REQUEST,
} from "./actionTypes";

const initialState = {
    content: [],
    initial: [],
    loading: true,
    error: false,
};
const MixtureRecordings = (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_BATCH_MIXTURE_RECORDINGS_REQUEST:
        case EDIT_BATCH_MIXTURE_RECORDINGS:
        case DELETE_BATCH_MIXTURE_RECORDINGS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_BATCH_MIXTURE_RECORDINGS_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case SET_BATCH_MIXTURE_RECORDINGS:
            return {
                ...state,
                ...payload,
                error: null,
            };
        case FETCH_BATCH_MIXTURE_RECORDINGS_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    ...payload,
                },
            };
        case RESET_BATCH_MIXTURE_RECORDINGS:
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
