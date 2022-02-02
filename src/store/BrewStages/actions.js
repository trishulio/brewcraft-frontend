import {
    FETCH_ALL_BREW_STAGE_REQUEST,
    SET_MASH_STAGE_DETAILS,
    RESET_MASH_STAGE_DETAILS,
    SET_KETTLE_STAGE_DETAILS,
    RESET_KETTLE_STAGE_DETAILS,
    SET_WHIRLPOOL_STAGE_DETAILS,
    RESET_WHIRLPOOL_STAGE_DETAILS,
    SET_TRANSFER_STAGE_DETAILS,
    FETCH_FERMENT_STAGE_BY_ID_REQUEST,
    SET_FERMENT_STAGE_DETAILS,
    ADD_FERMENT_STAGE_REQUEST,
    EDIT_FERMENT_STAGE_REQUEST,
    DELETE_FERMENT_STAGE_REQUEST,
    RESET_FERMENT_STAGE_DETAILS,
    FETCH_CONDITION_STAGE_BY_ID_REQUEST,
    SET_CONDITION_STAGE_DETAILS,
    ADD_CONDITION_STAGE_REQUEST,
    EDIT_CONDITION_STAGE_REQUEST,
    DELETE_CONDITION_STAGE_REQUEST,
    RESET_CONDITION_STAGE_DETAILS,
    FETCH_BRITE_TANK_STAGE_BY_ID_REQUEST,
    SET_BRITE_TANK_STAGE_DETAILS,
    ADD_BRITE_TANK_STAGE_REQUEST,
    EDIT_BRITE_TANK_STAGE_REQUEST,
    DELETE_BRITE_TANK_STAGE_REQUEST,
    RESET_BRITE_TANK_STAGE_DETAILS,
    EDIT_BREW_STAGES_REQUEST,
    SET_BREW_STAGES,
    ADD_BREW_STAGE_REQUEST,
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

export const fetchFermentStageById = (id) => ({
    type: FETCH_FERMENT_STAGE_BY_ID_REQUEST,
    payload: { id },
});

export const setFermentStageDetails = (payload) => ({
    type: SET_FERMENT_STAGE_DETAILS,
    payload: payload,
});

export const resetFermentStageDetails = () => ({
    type: RESET_FERMENT_STAGE_DETAILS,
    payload: null,
});

export const saveFermentStage = (payload) => ({
    type: ADD_FERMENT_STAGE_REQUEST,
    payload: payload,
});

export const editFermentStage = (payload) => ({
    type: EDIT_FERMENT_STAGE_REQUEST,
    payload: payload,
});

export const deleteFermentStage = (payload) => ({
    type: DELETE_FERMENT_STAGE_REQUEST,
    payload: payload,
});

export const fetchConditionStageById = (id) => ({
    type: FETCH_CONDITION_STAGE_BY_ID_REQUEST,
    payload: { id },
});

export const setConditionStageDetails = (payload) => ({
    type: SET_CONDITION_STAGE_DETAILS,
    payload: payload,
});

export const resetConditionStageDetails = () => ({
    type: RESET_CONDITION_STAGE_DETAILS,
    payload: null,
});

export const saveConditionStage = (payload) => ({
    type: ADD_CONDITION_STAGE_REQUEST,
    payload: payload,
});

export const editConditionStage = (payload) => ({
    type: EDIT_CONDITION_STAGE_REQUEST,
    payload: payload,
});

export const deleteConditionStage = (payload) => ({
    type: DELETE_CONDITION_STAGE_REQUEST,
    payload: payload,
});

export const fetchBriteTankStageById = (id) => ({
    type: FETCH_BRITE_TANK_STAGE_BY_ID_REQUEST,
    payload: { id },
});

export const setBriteTankStageDetails = (payload) => ({
    type: SET_BRITE_TANK_STAGE_DETAILS,
    payload: payload,
});

export const resetBriteTankStageDetails = () => ({
    type: RESET_BRITE_TANK_STAGE_DETAILS,
    payload: null,
});

export const saveBriteTankStage = (payload) => ({
    type: ADD_BRITE_TANK_STAGE_REQUEST,
    payload: payload,
});

export const editBriteTankStage = (payload) => ({
    type: EDIT_BRITE_TANK_STAGE_REQUEST,
    payload: payload,
});

export const deleteBriteTankStage = (payload) => ({
    type: DELETE_BRITE_TANK_STAGE_REQUEST,
    payload: payload,
});
