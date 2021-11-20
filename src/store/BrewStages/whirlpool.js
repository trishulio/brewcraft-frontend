import {
    ADD_WHIRLPOOL_STAGE_REQUEST,
    ADD_WHIRLPOOL_STAGE_FAILURE,
    EDIT_WHIRLPOOL_STAGE_REQUEST,
    EDIT_WHIRLPOOL_STAGE_SUCCESS,
    ADD_WHIRLPOOL_STAGE_SUCCESS,
    SET_WHIRLPOOL_STAGE_DETAILS,
    RESET_WHIRLPOOL_STAGE_DETAILS
} from "./actionTypes";
import { initialState } from "./initial";

const WhirlpoolStage = (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_WHIRLPOOL_STAGE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_WHIRLPOOL_STAGE_REQUEST:
        case EDIT_WHIRLPOOL_STAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_WHIRLPOOL_STAGE_SUCCESS:
        case EDIT_WHIRLPOOL_STAGE_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_WHIRLPOOL_STAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case RESET_WHIRLPOOL_STAGE_DETAILS:
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

export default WhirlpoolStage;