import {
    ADD_FERMENT_MIXTURE_REQUEST,
    ADD_FERMENT_MIXTURE_FAILURE,
    EDIT_FERMENT_MIXTURE_REQUEST,
    EDIT_FERMENT_MIXTURE_SUCCESS,
    ADD_FERMENT_MIXTURE_SUCCESS,
    SET_FERMENT_MIXTURE_DETAILS,
    RESET_FERMENT_MIXTURE_DETAILS,
} from "./actionTypes";
import { initialState } from "./initial";

const FermentMixture = (state = initialState, { type, payload } = {}) => {
    switch (type) {
        case SET_FERMENT_MIXTURE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_FERMENT_MIXTURE_REQUEST:
        case EDIT_FERMENT_MIXTURE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_FERMENT_MIXTURE_SUCCESS:
        case EDIT_FERMENT_MIXTURE_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_FERMENT_MIXTURE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_FERMENT_MIXTURE_DETAILS:
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

export default FermentMixture;
