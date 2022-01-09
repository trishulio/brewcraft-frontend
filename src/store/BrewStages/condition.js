import {
    ADD_CONDITION_STAGE_REQUEST,
    ADD_CONDITION_STAGE_FAILURE,
    EDIT_CONDITION_STAGE_REQUEST,
    EDIT_CONDITION_STAGE_SUCCESS,
    ADD_CONDITION_STAGE_SUCCESS,
    SET_CONDITION_STAGE_DETAILS,
    RESET_CONDITION_STAGE_DETAILS,
    FETCH_ALL_BREW_STAGE_REQUEST,
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
        case FETCH_ALL_BREW_STAGE_REQUEST:
        case ADD_CONDITION_STAGE_REQUEST:
        case EDIT_CONDITION_STAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_CONDITION_STAGE_SUCCESS:
        case EDIT_CONDITION_STAGE_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_CONDITION_STAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
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
