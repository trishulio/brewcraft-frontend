import {
    FETCH_BREW_STAGE_BY_ID_REQUEST,
    SET_BREW_STAGE_DETAILS,
    ADD_BREW_STAGE_REQUEST,
    EDIT_BREW_STAGE_REQUEST,
    DELETE_BREW_STAGE_REQUEST,
    RESET_BREW_STAGE_DETAILS,
    SET_BREW_STAGE_INVALID_NAME,
    SET_BREW_STAGE_INVALID_CATEGORY,
    FETCH_ALL_BREW_STAGE_REQUEST
} from "./actionTypes";

export const fetchAllBrewStages = id => ({
    type: FETCH_ALL_BREW_STAGE_REQUEST,
    payload: { id }
});

export const fetchBrewStageById = id => ({
    type: FETCH_BREW_STAGE_BY_ID_REQUEST,
    payload: { id },
  });

export const setBrewStageDetails = payload => ({
    type: SET_BREW_STAGE_DETAILS,
    payload: payload
});

export const resetBrewStageDetails = () => ({
    type: RESET_BREW_STAGE_DETAILS,
    payload: null
});

export const saveBrewStage = payload => ({
    type: ADD_BREW_STAGE_REQUEST,
    payload: payload,
});

export const editBrewStage = payload => ({
    type: EDIT_BREW_STAGE_REQUEST,
    payload: payload,
});

export const deleteBrewStage = payload => ({
    type: DELETE_BREW_STAGE_REQUEST,
    payload: payload,
});

export const setBrewStageInvalidName = value => ({
    type: SET_BREW_STAGE_INVALID_NAME,
    payload: value
});

export const setBrewStageInvalidCategory = value => ({
    type: SET_BREW_STAGE_INVALID_CATEGORY,
    payload: value
});

export const setBrewStageInvalidBaseQuantityUnit = value => ({
    type: SET_BREW_STAGE_INVALID_CATEGORY,
    payload: value
});