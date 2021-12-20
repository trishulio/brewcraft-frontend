import {
    ADD_TRANSFER_MIXTURE_PORTION_REQUEST,
    ADD_TRANSFER_MIXTURE_PORTION_FAILURE,
    EDIT_TRANSFER_MIXTURE_PORTION_REQUEST,
    EDIT_TRANSFER_MIXTURE_PORTION_SUCCESS,
    ADD_TRANSFER_MIXTURE_PORTION_SUCCESS,
    SET_TRANSFER_MIXTURE_PORTION_DETAILS,
    RESET_TRANSFER_MIXTURE_PORTION_DETAILS,
} from "./actionTypes";
import { initialState } from "./initial";

const TransferMixturePortions = (
    state = initialState,
    { type, payload } = {}
) => {
    switch (type) {
        case SET_TRANSFER_MIXTURE_PORTION_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_TRANSFER_MIXTURE_PORTION_REQUEST:
        case EDIT_TRANSFER_MIXTURE_PORTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_TRANSFER_MIXTURE_PORTION_SUCCESS:
        case EDIT_TRANSFER_MIXTURE_PORTION_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_TRANSFER_MIXTURE_PORTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_TRANSFER_MIXTURE_PORTION_DETAILS:
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

export default TransferMixturePortions;
