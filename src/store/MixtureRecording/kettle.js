import {
    ADD_KETTLE_MIXTURE_RECORDING_REQUEST,
    ADD_KETTLE_MIXTURE_RECORDING_FAILURE,
    EDIT_KETTLE_MIXTURE_RECORDING_REQUEST,
    EDIT_KETTLE_MIXTURE_RECORDING_SUCCESS,
    DELETE_KETTLE_MIXTURE_RECORDING_REQUEST,
    DELETE_KETTLE_MIXTURE_RECORDING_SUCCESS,
    ADD_KETTLE_MIXTURE_RECORDING_SUCCESS,
    SET_KETTLE_MIXTURE_RECORDING_DETAILS,
    RESET_KETTLE_MIXTURE_RECORDING_DETAILS
} from "./actionTypes";
import { initialState } from "./initial";

const KettleMixtureRecordings = (state = initialState, { type, payload } = {}) => {
    switch(type) {
        case SET_KETTLE_MIXTURE_RECORDING_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_KETTLE_MIXTURE_RECORDING_REQUEST:
        case EDIT_KETTLE_MIXTURE_RECORDING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_KETTLE_MIXTURE_RECORDING_SUCCESS:
        case EDIT_KETTLE_MIXTURE_RECORDING_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_KETTLE_MIXTURE_RECORDING_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case RESET_KETTLE_MIXTURE_RECORDING_DETAILS:
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

export default KettleMixtureRecordings;