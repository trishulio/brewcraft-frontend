import {
    FETCH_ALL_BREW_STAGE_REQUEST,
    SET_MASH_STAGE_DETAILS,
    RESET_MASH_STAGE_DETAILS,
    SET_KETTLE_STAGE_DETAILS,
    RESET_KETTLE_STAGE_DETAILS,
    SET_WHIRLPOOL_STAGE_DETAILS,
    RESET_WHIRLPOOL_STAGE_DETAILS,
    SET_TRANSFER_STAGE_DETAILS,
    SET_FERMENT_STAGE_DETAILS,
    RESET_FERMENT_STAGE_DETAILS,
    SET_CONDITION_STAGE_DETAILS,
    RESET_CONDITION_STAGE_DETAILS,
    SET_BRITE_TANK_STAGE_DETAILS,
    RESET_BRITE_TANK_STAGE_DETAILS,
    EDIT_BREW_STAGES_REQUEST,
    SET_BREW_STAGES,
    ADD_BREW_STAGE_REQUEST,
    TRANSFER_TO_FERMENT_STAGE_REQUEST,
} from "./actionTypes";

export const fetchAllBrewStages = (id) => ({
    type: FETCH_ALL_BREW_STAGE_REQUEST,
    payload: { id },
});

export const addBrewStage = ({ parentMixtureIds, form }) => ({
    type: ADD_BREW_STAGE_REQUEST,
    payload: { parentMixtureIds, form },
});

export const editBrewStages = ({ id, form }) => ({
    type: EDIT_BREW_STAGES_REQUEST,
    payload: {
        id,
        form: { ...form },
    },
});

export const setBrewStageDetails = (payload) => ({
    type: SET_BREW_STAGES,
    payload: {
        ...payload,
    },
});

export const setMashStageDetails = (payload) => ({
    type: SET_MASH_STAGE_DETAILS,
    payload: {
        ...payload,
    },
});

export const resetMashStageDetails = () => ({
    type: RESET_MASH_STAGE_DETAILS,
    payload: null,
});

export const setKettleStageDetails = (payload) => ({
    type: SET_KETTLE_STAGE_DETAILS,
    payload: payload,
});

export const resetKettleStageDetails = () => ({
    type: RESET_KETTLE_STAGE_DETAILS,
    payload: null,
});

export const setWhirlpoolStageDetails = (payload) => ({
    type: SET_WHIRLPOOL_STAGE_DETAILS,
    payload: payload,
});

export const resetWhirlpoolStageDetails = () => ({
    type: RESET_WHIRLPOOL_STAGE_DETAILS,
    payload: null,
});

export const setTransferStageDetails = (payload) => ({
    type: SET_TRANSFER_STAGE_DETAILS,
    payload: {
        ...payload,
    },
});

export const setFermentStageDetails = (payload) => ({
    type: SET_FERMENT_STAGE_DETAILS,
    payload: payload,
});

export const resetFermentStageDetails = () => ({
    type: RESET_FERMENT_STAGE_DETAILS,
    payload: null,
});

export const setConditionStageDetails = (payload) => ({
    type: SET_CONDITION_STAGE_DETAILS,
    payload: payload,
});

export const resetConditionStageDetails = () => ({
    type: RESET_CONDITION_STAGE_DETAILS,
    payload: null,
});

export const setBriteTankStageDetails = (payload) => ({
    type: SET_BRITE_TANK_STAGE_DETAILS,
    payload: payload,
});

export const resetBriteTankStageDetails = () => ({
    type: RESET_BRITE_TANK_STAGE_DETAILS,
    payload: null,
});

export const transferToFermentStage = (fermentMixtureId) => ({
    type: TRANSFER_TO_FERMENT_STAGE_REQUEST,
    payload: {
        fermentMixtureId,
    },
});
