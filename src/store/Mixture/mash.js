import {
    SET_MASH_MIXTURE_DETAILS,
    RESET_MASH_MIXTURE_DETAILS,
} from "./actionTypes";
import { initialState } from "./initial";

const MashMixture = (state = initialState, { type, payload } = {}) => {
    switch (type) {
        case SET_MASH_MIXTURE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case RESET_MASH_MIXTURE_DETAILS:
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

export default MashMixture;
