import {
    ADD_MASH_STAGE_REQUEST,
    ADD_MASH_STAGE_FAILURE,
    EDIT_MASH_STAGE_REQUEST,
    EDIT_MASH_STAGE_SUCCESS,
    ADD_MASH_STAGE_SUCCESS,
    SET_MASH_STAGE_DETAILS,
    RESET_MASH_STAGE_DETAILS,
} from "./actionTypes";
import { initialState } from "./initial";

const MashStage = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_MASH_STAGE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_MASH_STAGE_REQUEST:
        case EDIT_MASH_STAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_MASH_STAGE_SUCCESS:
        case EDIT_MASH_STAGE_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_MASH_STAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case RESET_MASH_STAGE_DETAILS:
            return {
                ...initialState,
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
                loading: false,
                error: null,
            };
    }
};

export default MashStage;
