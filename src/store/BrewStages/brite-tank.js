import {
    SET_BRITE_TANK_STAGE_DETAILS,
    RESET_BRITE_TANK_STAGE_DETAILS,
} from "./actionTypes";
import { initialState } from "./initial";

const BriteTankStage = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_BRITE_TANK_STAGE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case RESET_BRITE_TANK_STAGE_DETAILS:
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

export default BriteTankStage;
