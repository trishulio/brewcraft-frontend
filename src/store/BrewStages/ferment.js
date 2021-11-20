import {
    ADD_FERMENT_STAGE_REQUEST,
    ADD_FERMENT_STAGE_FAILURE,
    EDIT_FERMENT_STAGE_REQUEST,
    EDIT_FERMENT_STAGE_SUCCESS,
    ADD_FERMENT_STAGE_SUCCESS,
    SET_FERMENT_STAGE_DETAILS,
    RESET_FERMENT_STAGE_DETAILS
} from "./actionTypes";
import { initialState } from "./initial";

const FermentStage = (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_FERMENT_STAGE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_FERMENT_STAGE_REQUEST:
        case EDIT_FERMENT_STAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case ADD_FERMENT_STAGE_SUCCESS:
        case EDIT_FERMENT_STAGE_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        case ADD_FERMENT_STAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true
            };
        case RESET_FERMENT_STAGE_DETAILS:
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

export default FermentStage;