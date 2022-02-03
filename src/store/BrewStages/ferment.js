import {
    SET_FERMENT_STAGE_DETAILS,
    RESET_FERMENT_STAGE_DETAILS,
} from "./actionTypes";
import { initialState } from "./initial";

const FermentStage = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_FERMENT_STAGE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case RESET_FERMENT_STAGE_DETAILS:
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

export default FermentStage;
