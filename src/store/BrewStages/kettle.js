import {
    SET_KETTLE_STAGE_DETAILS,
    RESET_KETTLE_STAGE_DETAILS,
} from "./actionTypes";
import { initialState } from "./initial";

const KettleStage = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_KETTLE_STAGE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case RESET_KETTLE_STAGE_DETAILS:
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

export default KettleStage;
