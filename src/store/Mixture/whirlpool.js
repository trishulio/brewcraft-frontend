import {
    ADD_WHIRLPOOL_MIXTURE_REQUEST,
    ADD_WHIRLPOOL_MIXTURE_FAILURE,
    EDIT_WHIRLPOOL_MIXTURE_REQUEST,
    EDIT_WHIRLPOOL_MIXTURE_SUCCESS,
    ADD_WHIRLPOOL_MIXTURE_SUCCESS,
    SET_WHIRLPOOL_MIXTURE_DETAILS,
    RESET_WHIRLPOOL_MIXTURE_DETAILS,
} from "./actionTypes";
import { initialState } from "./initial";

const WhirlpoolMixture = (state = initialState, { type, payload } = {}) => {
    switch (type) {
        case SET_WHIRLPOOL_MIXTURE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_WHIRLPOOL_MIXTURE_REQUEST:
        case EDIT_WHIRLPOOL_MIXTURE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_WHIRLPOOL_MIXTURE_SUCCESS:
        case EDIT_WHIRLPOOL_MIXTURE_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_WHIRLPOOL_MIXTURE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_WHIRLPOOL_MIXTURE_DETAILS:
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

export default WhirlpoolMixture;
