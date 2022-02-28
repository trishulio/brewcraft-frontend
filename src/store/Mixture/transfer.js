import {
    SET_TRANSFER_MIXTURE_DETAILS,
    RESET_TRANSFER_MIXTURE_DETAILS,
} from "./actionTypes";
import { initialState } from "./initial";

const TransferMixture = (state = initialState, { type, payload } = {}) => {
    switch (type) {
        case SET_TRANSFER_MIXTURE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case RESET_TRANSFER_MIXTURE_DETAILS:
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

export default TransferMixture;
