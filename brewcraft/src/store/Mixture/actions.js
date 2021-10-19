import {
    FETCH_MIXTURE_BY_ID_REQUEST,
    FETCH_MIXTURE_BY_BREW_ID_REQUEST,
    SET_MIXTURE_DETAILS,
    ADD_MIXTURE_REQUEST,
    EDIT_MIXTURE_REQUEST,
    DELETE_MIXTURE_REQUEST,
    RESET_MIXTURE_DETAILS,
    SET_MIXTURE_INVALID_NAME,
    SET_MIXTURE_INVALID_CATEGORY
} from "./actionTypes";

export const fetchMixtureById = id => ({
    type: FETCH_MIXTURE_BY_ID_REQUEST,
    payload: { id },
});

export const fetchMixturesByBrewId = id => ({
    type: FETCH_MIXTURE_BY_BREW_ID_REQUEST,
    payload: { id },
});

export const setMixtureDetails = payload => ({
    type: SET_MIXTURE_DETAILS,
    payload: payload
});

export const resetMixtureDetails = () => ({
    type: RESET_MIXTURE_DETAILS,
    payload: null
});

export const saveMixture = payload => ({
    type: ADD_MIXTURE_REQUEST,
    payload: payload,
});

export const editMixture = payload => ({
    type: EDIT_MIXTURE_REQUEST,
    payload: payload,
});

export const deleteMixture = payload => ({
    type: DELETE_MIXTURE_REQUEST,
    payload: payload,
});

export const setMixtureInvalidName = value => ({
    type: SET_MIXTURE_INVALID_NAME,
    payload: value
});

export const setMixtureInvalidCategory = value => ({
    type: SET_MIXTURE_INVALID_CATEGORY,
    payload: value
});

export const setMixtureInvalidBaseQuantityUnit = value => ({
    type: SET_MIXTURE_INVALID_CATEGORY,
    payload: value
});