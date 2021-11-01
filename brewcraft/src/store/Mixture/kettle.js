import {
    ADD_KETTLE_MIXTURE_REQUEST,
    ADD_KETTLE_MIXTURE_FAILURE,
    EDIT_KETTLE_MIXTURE_REQUEST,
    EDIT_KETTLE_MIXTURE_SUCCESS,
    ADD_KETTLE_MIXTURE_SUCCESS,
    SET_KETTLE_MIXTURE_DETAILS,
    RESET_KETTLE_MIXTURE_DETAILS
} from "./actionTypes";
import { initialState } from "./initial";

const KettleMixture = (state = initialState, { type, payload } = {}) => {
    switch(type) {
        case SET_KETTLE_MIXTURE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_KETTLE_MIXTURE_REQUEST:
        case EDIT_KETTLE_MIXTURE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_KETTLE_MIXTURE_SUCCESS:
        case EDIT_KETTLE_MIXTURE_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_KETTLE_MIXTURE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case RESET_KETTLE_MIXTURE_DETAILS:
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

export default KettleMixture;