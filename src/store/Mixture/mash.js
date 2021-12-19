import {
    ADD_MASH_MIXTURE_REQUEST,
    ADD_MASH_MIXTURE_FAILURE,
    EDIT_MASH_MIXTURE_REQUEST,
    EDIT_MASH_MIXTURE_SUCCESS,
    ADD_MASH_MIXTURE_SUCCESS,
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
        case ADD_MASH_MIXTURE_REQUEST:
        case EDIT_MASH_MIXTURE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_MASH_MIXTURE_SUCCESS:
        case EDIT_MASH_MIXTURE_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_MASH_MIXTURE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
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
