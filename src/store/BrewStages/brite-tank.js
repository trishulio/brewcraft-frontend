import {
    ADD_BRITE_TANK_STAGE_REQUEST,
    ADD_BRITE_TANK_STAGE_FAILURE,
    EDIT_BRITE_TANK_STAGE_REQUEST,
    EDIT_BRITE_TANK_STAGE_SUCCESS,
    ADD_BRITE_TANK_STAGE_SUCCESS,
    SET_BRITE_TANK_STAGE_DETAILS,
    RESET_BRITE_TANK_STAGE_DETAILS,
    FETCH_ALL_BREW_STAGE_REQUEST,
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
        case FETCH_ALL_BREW_STAGE_REQUEST:
        case ADD_BRITE_TANK_STAGE_REQUEST:
        case EDIT_BRITE_TANK_STAGE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ADD_BRITE_TANK_STAGE_SUCCESS:
        case EDIT_BRITE_TANK_STAGE_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case ADD_BRITE_TANK_STAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
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
