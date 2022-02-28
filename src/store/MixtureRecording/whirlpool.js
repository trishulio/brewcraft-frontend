import {
    ADD_WHIRLPOOL_MIXTURE_RECORDING_REQUEST,
    ADD_WHIRLPOOL_MIXTURE_RECORDING_FAILURE,
    EDIT_WHIRLPOOL_MIXTURE_RECORDING_REQUEST,
    EDIT_WHIRLPOOL_MIXTURE_RECORDING_SUCCESS,
    ADD_WHIRLPOOL_MIXTURE_RECORDING_SUCCESS,
    SET_WHIRLPOOL_MIXTURE_RECORDING_DETAILS,
    RESET_WHIRLPOOL_MIXTURE_RECORDING_DETAILS,
    FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_REQUEST,
    DELETE_WHIRLPOOL_MIXTURE_RECORDING_REQUEST,
} from "./actionTypes";
import { initialState } from "./initial";

const WhirlpoolMixtureRecordings = (
    state = initialState,
    { type, payload } = {}
) => {
    switch (type) {
        case SET_WHIRLPOOL_MIXTURE_RECORDING_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_REQUEST:
        case ADD_WHIRLPOOL_MIXTURE_RECORDING_REQUEST:
        case EDIT_WHIRLPOOL_MIXTURE_RECORDING_REQUEST:
        case DELETE_WHIRLPOOL_MIXTURE_RECORDING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_WHIRLPOOL_MIXTURE_RECORDING_SUCCESS:
        case EDIT_WHIRLPOOL_MIXTURE_RECORDING_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_WHIRLPOOL_MIXTURE_RECORDING_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_WHIRLPOOL_MIXTURE_RECORDING_DETAILS:
            return {
                ...initialState,
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
                loading: false,
                error: null,
            };
    }
};

export default WhirlpoolMixtureRecordings;
