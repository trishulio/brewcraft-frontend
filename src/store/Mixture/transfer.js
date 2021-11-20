import {
    ADD_TRANSFER_MIXTURE_REQUEST,
    ADD_TRANSFER_MIXTURE_FAILURE,
    EDIT_TRANSFER_MIXTURE_REQUEST,
    EDIT_TRANSFER_MIXTURE_SUCCESS,
    ADD_TRANSFER_MIXTURE_SUCCESS,
    SET_TRANSFER_MIXTURE_DETAILS,
    RESET_TRANSFER_MIXTURE_DETAILS
} from "./actionTypes";
import { initialState } from "./initial";

const TransferMixture = (state = initialState, { type, payload } = {}) => {
    switch(type) {
        case SET_TRANSFER_MIXTURE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_TRANSFER_MIXTURE_REQUEST:
        case EDIT_TRANSFER_MIXTURE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_TRANSFER_MIXTURE_SUCCESS:
        case EDIT_TRANSFER_MIXTURE_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_TRANSFER_MIXTURE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case RESET_TRANSFER_MIXTURE_DETAILS:
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

export default TransferMixture;