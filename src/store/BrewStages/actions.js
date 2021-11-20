import {
    FETCH_ALL_BREW_STAGE_REQUEST,
    FETCH_MASH_STAGE_BY_ID_REQUEST,
    SET_MASH_STAGE_DETAILS,
    ADD_MASH_STAGE_REQUEST,
    EDIT_MASH_STAGE_REQUEST,
    DELETE_MASH_STAGE_REQUEST,
    RESET_MASH_STAGE_DETAILS,
    FETCH_KETTLE_STAGE_BY_ID_REQUEST,
    SET_KETTLE_STAGE_DETAILS,
    ADD_KETTLE_STAGE_REQUEST,
    EDIT_KETTLE_STAGE_REQUEST,
    DELETE_KETTLE_STAGE_REQUEST,
    RESET_KETTLE_STAGE_DETAILS,
    FETCH_WHIRLPOOL_STAGE_BY_ID_REQUEST,
    SET_WHIRLPOOL_STAGE_DETAILS,
    ADD_WHIRLPOOL_STAGE_REQUEST,
    EDIT_WHIRLPOOL_STAGE_REQUEST,
    DELETE_WHIRLPOOL_STAGE_REQUEST,
    RESET_WHIRLPOOL_STAGE_DETAILS,
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
} from "./actionTypes";

export const fetchAllBrewStages = id => ({
    type: FETCH_ALL_BREW_STAGE_REQUEST,
    payload: { id }
});

export const fetchMashStageById = id => ({
    type: FETCH_MASH_STAGE_BY_ID_REQUEST,
    payload: { id },
  });

export const setMashStageDetails = payload => ({
    type: SET_MASH_STAGE_DETAILS,
    payload: payload
});

export const resetMashStageDetails = () => ({
    type: RESET_MASH_STAGE_DETAILS,
    payload: null
});

export const saveMashStage = payload => ({
    type: ADD_MASH_STAGE_REQUEST,
    payload: payload,
});

export const editMashStage = payload => ({
    type: EDIT_MASH_STAGE_REQUEST,
    payload: payload,
});

export const deleteMashStage = payload => ({
    type: DELETE_MASH_STAGE_REQUEST,
    payload: payload,
});

export const fetchKettleStageById = id => ({
    type: FETCH_KETTLE_STAGE_BY_ID_REQUEST,
    payload: { id },
  });

export const setKettleStageDetails = payload => ({
    type: SET_KETTLE_STAGE_DETAILS,
    payload: payload
});

export const resetKettleStageDetails = () => ({
    type: RESET_KETTLE_STAGE_DETAILS,
    payload: null
});

export const saveKettleStage = payload => ({
    type: ADD_KETTLE_STAGE_REQUEST,
    payload: payload,
});

export const editKettleStage = payload => ({
    type: EDIT_KETTLE_STAGE_REQUEST,
    payload: payload,
});

export const deleteKettleStage = payload => ({
    type: DELETE_KETTLE_STAGE_REQUEST,
    payload: payload,
});

export const fetchWhirlpoolStageById = id => ({
    type: FETCH_WHIRLPOOL_STAGE_BY_ID_REQUEST,
    payload: { id },
  });

export const setWhirlpoolStageDetails = payload => ({
    type: SET_WHIRLPOOL_STAGE_DETAILS,
    payload: payload
});

export const resetWhirlpoolStageDetails = () => ({
    type: RESET_WHIRLPOOL_STAGE_DETAILS,
    payload: null
});

export const saveWhirlpoolStage = payload => ({
    type: ADD_WHIRLPOOL_STAGE_REQUEST,
    payload: payload,
});

export const editWhirlpoolStage = payload => ({
    type: EDIT_WHIRLPOOL_STAGE_REQUEST,
    payload: payload,
});

export const deleteWhirlpoolStage = payload => ({
    type: DELETE_WHIRLPOOL_STAGE_REQUEST,
    payload: payload,
});

export const fetchFermentStageById = id => ({
    type: FETCH_FERMENT_STAGE_BY_ID_REQUEST,
    payload: { id },
  });

export const setFermentStageDetails = payload => ({
    type: SET_FERMENT_STAGE_DETAILS,
    payload: payload
});

export const resetFermentStageDetails = () => ({
    type: RESET_FERMENT_STAGE_DETAILS,
    payload: null
});

export const saveFermentStage = payload => ({
    type: ADD_FERMENT_STAGE_REQUEST,
    payload: payload,
});

export const editFermentStage = payload => ({
    type: EDIT_FERMENT_STAGE_REQUEST,
    payload: payload,
});

export const deleteFermentStage = payload => ({
    type: DELETE_FERMENT_STAGE_REQUEST,
    payload: payload,
});

export const fetchConditionStageById = id => ({
    type: FETCH_CONDITION_STAGE_BY_ID_REQUEST,
    payload: { id },
  });

export const setConditionStageDetails = payload => ({
    type: SET_CONDITION_STAGE_DETAILS,
    payload: payload
});

export const resetConditionStageDetails = () => ({
    type: RESET_CONDITION_STAGE_DETAILS,
    payload: null
});

export const saveConditionStage = payload => ({
    type: ADD_CONDITION_STAGE_REQUEST,
    payload: payload,
});

export const editConditionStage = payload => ({
    type: EDIT_CONDITION_STAGE_REQUEST,
    payload: payload,
});

export const deleteConditionStage = payload => ({
    type: DELETE_CONDITION_STAGE_REQUEST,
    payload: payload,
});

export const fetchBriteTankStageById = id => ({
    type: FETCH_BRITE_TANK_STAGE_BY_ID_REQUEST,
    payload: { id },
  });

export const setBriteTankStageDetails = payload => ({
    type: SET_BRITE_TANK_STAGE_DETAILS,
    payload: payload
});

export const resetBriteTankStageDetails = () => ({
    type: RESET_BRITE_TANK_STAGE_DETAILS,
    payload: null
});

export const saveBriteTankStage = payload => ({
    type: ADD_BRITE_TANK_STAGE_REQUEST,
    payload: payload,
});

export const editBriteTankStage = payload => ({
    type: EDIT_BRITE_TANK_STAGE_REQUEST,
    payload: payload,
});

export const deleteBriteTankStage = payload => ({
    type: DELETE_BRITE_TANK_STAGE_REQUEST,
    payload: payload,
});