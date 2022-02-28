import {
    SET_CONDITION_STAGE_DETAILS,
    RESET_CONDITION_STAGE_DETAILS,
} from "./actionTypes";
import { initialState } from "./initial";

const ConditionStage = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_CONDITION_STAGE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case RESET_CONDITION_STAGE_DETAILS:
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

export default ConditionStage;
