import {
    SET_TRANSFER_STAGE_DETAILS,
    RESET_TRANSFER_STAGE_DETAILS,
} from "./actionTypes";
import { initialState } from "./initial";

const TransferStage = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_TRANSFER_STAGE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case RESET_TRANSFER_STAGE_DETAILS:
            return {
                ...initialState,
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
                error: null,
            };
    }
};

export default TransferStage;
