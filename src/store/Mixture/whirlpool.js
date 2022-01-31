import {
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
