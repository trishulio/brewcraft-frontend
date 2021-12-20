import {
    ADD_WHIRLPOOL_MIXTURE_PORTION_REQUEST,
    ADD_WHIRLPOOL_MIXTURE_PORTION_FAILURE,
    EDIT_WHIRLPOOL_MIXTURE_PORTION_REQUEST,
    EDIT_WHIRLPOOL_MIXTURE_PORTION_SUCCESS,
    ADD_WHIRLPOOL_MIXTURE_PORTION_SUCCESS,
    SET_WHIRLPOOL_MIXTURE_PORTION_DETAILS,
    RESET_WHIRLPOOL_MIXTURE_PORTION_DETAILS,
} from "./actionTypes";
import { initialState } from "./initial";

const WhirlpoolMixturePortions = (
    state = initialState,
    { type, payload } = {}
) => {
    switch (type) {
        case SET_WHIRLPOOL_MIXTURE_PORTION_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_WHIRLPOOL_MIXTURE_PORTION_REQUEST:
        case EDIT_WHIRLPOOL_MIXTURE_PORTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_WHIRLPOOL_MIXTURE_PORTION_SUCCESS:
        case EDIT_WHIRLPOOL_MIXTURE_PORTION_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_WHIRLPOOL_MIXTURE_PORTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_WHIRLPOOL_MIXTURE_PORTION_DETAILS:
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

export default WhirlpoolMixturePortions;
