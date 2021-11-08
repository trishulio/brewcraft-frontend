import {
    ADD_FERMENT_MIXTURE_RECORDING_REQUEST,
    ADD_FERMENT_MIXTURE_RECORDING_FAILURE,
    EDIT_FERMENT_MIXTURE_RECORDING_REQUEST,
    EDIT_FERMENT_MIXTURE_RECORDING_SUCCESS,
    DELETE_FERMENT_MIXTURE_RECORDING_REQUEST,
    DELETE_FERMENT_MIXTURE_RECORDING_SUCCESS,
    ADD_FERMENT_MIXTURE_RECORDING_SUCCESS,
    SET_FERMENT_MIXTURE_RECORDING_DETAILS,
    RESET_FERMENT_MIXTURE_RECORDING_DETAILS
} from "./actionTypes";
import { initialState } from "./initial";

const FermenmtMixtureRecordings = (state = initialState, { type, payload } = {}) => {
    switch(type) {
        case SET_FERMENT_MIXTURE_RECORDING_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_FERMENT_MIXTURE_RECORDING_REQUEST:
        case EDIT_FERMENT_MIXTURE_RECORDING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_FERMENT_MIXTURE_RECORDING_SUCCESS:
        case EDIT_FERMENT_MIXTURE_RECORDING_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_FERMENT_MIXTURE_RECORDING_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case RESET_FERMENT_MIXTURE_RECORDING_DETAILS:
        return {
            ...initialState,
            loading: false,
            error: null
        };
        default:
        return {
            ...state,
            loading: false,
            error: null
        };
    }
};

export default FermenmtMixtureRecordings;