import {
    ADD_KETTLE_STAGE_REQUEST,
    ADD_KETTLE_STAGE_FAILURE,
    EDIT_KETTLE_STAGE_REQUEST,
    EDIT_KETTLE_STAGE_SUCCESS,
    ADD_KETTLE_STAGE_SUCCESS,
    SET_KETTLE_STAGE_DETAILS,
    RESET_KETTLE_STAGE_DETAILS,
    FETCH_ALL_BREW_STAGE_REQUEST,
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
        case FETCH_ALL_BREW_STAGE_REQUEST:
        case ADD_KETTLE_STAGE_REQUEST:
        case EDIT_KETTLE_STAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_KETTLE_STAGE_SUCCESS:
        case EDIT_KETTLE_STAGE_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_KETTLE_STAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
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
