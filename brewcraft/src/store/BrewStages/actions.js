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