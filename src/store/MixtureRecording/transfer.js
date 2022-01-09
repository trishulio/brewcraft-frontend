import {
    ADD_TRANSFER_MIXTURE_RECORDING_REQUEST,
    ADD_TRANSFER_MIXTURE_RECORDING_FAILURE,
    EDIT_TRANSFER_MIXTURE_RECORDING_REQUEST,
    EDIT_TRANSFER_MIXTURE_RECORDING_SUCCESS,
    ADD_TRANSFER_MIXTURE_RECORDING_SUCCESS,
    SET_TRANSFER_MIXTURE_RECORDING_DETAILS,
    RESET_TRANSFER_MIXTURE_RECORDING_DETAILS,
    FETCH_MIXTURE_RECORDING_BY_BREW_ID_REQUEST,
    DELETE_TRANSFER_MIXTURE_RECORDING_REQUEST,
} from "./actionTypes";
import { initialState } from "./initial";

const TransferMixtureRecordings = (
    state = initialState,
    { type, payload } = {}
) => {
    switch (type) {
        case SET_TRANSFER_MIXTURE_RECORDING_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_MIXTURE_RECORDING_BY_BREW_ID_REQUEST:
        case ADD_TRANSFER_MIXTURE_RECORDING_REQUEST:
        case EDIT_TRANSFER_MIXTURE_RECORDING_REQUEST:
        case DELETE_TRANSFER_MIXTURE_RECORDING_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_TRANSFER_MIXTURE_RECORDING_SUCCESS:
        case EDIT_TRANSFER_MIXTURE_RECORDING_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_TRANSFER_MIXTURE_RECORDING_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_TRANSFER_MIXTURE_RECORDING_DETAILS:
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

export default TransferMixtureRecordings;
