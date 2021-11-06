import {
    ADD_TRANSFER_STAGE_REQUEST,
    ADD_TRANSFER_STAGE_FAILURE,
    EDIT_TRANSFER_STAGE_REQUEST,
    EDIT_TRANSFER_STAGE_SUCCESS,
    ADD_TRANSFER_STAGE_SUCCESS,
    SET_TRANSFER_STAGE_DETAILS,
    RESET_TRANSFER_STAGE_DETAILS
} from "./actionTypes";
import { initialState } from "./initial";

const TransferStage = (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_TRANSFER_STAGE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_TRANSFER_STAGE_REQUEST:
        case EDIT_TRANSFER_STAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_TRANSFER_STAGE_SUCCESS:
        case EDIT_TRANSFER_STAGE_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_TRANSFER_STAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case RESET_TRANSFER_STAGE_DETAILS:
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

export default TransferStage;