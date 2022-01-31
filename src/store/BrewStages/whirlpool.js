import {
    SET_WHIRLPOOL_STAGE_DETAILS,
    RESET_WHIRLPOOL_STAGE_DETAILS,
} from "./actionTypes";
import { initialState } from "./initial";

const WhirlpoolStage = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_WHIRLPOOL_STAGE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case RESET_WHIRLPOOL_STAGE_DETAILS:
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

export default WhirlpoolStage;
