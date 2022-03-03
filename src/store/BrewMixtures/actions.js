import {
    FETCH_BREW_MIXTURES_REQUEST,
    SET_BREW_MIXTURE_DETAILS,
    EDIT_BREW_MIXTURES_REQUEST,
    DELETE_BREW_MIXTURES_REQUEST,
} from "./actionTypes";

export const fetchBrewMixtures = (params) => ({
    type: FETCH_BREW_MIXTURES_REQUEST,
    payload: { ...params },
});

export const editBrewMixtures = (payload) => ({
    type: EDIT_BREW_MIXTURES_REQUEST,
    payload: { ...payload },
});

export const setBrewMixtureDetails = (payload) => ({
    type: SET_BREW_MIXTURE_DETAILS,
    payload: { ...payload },
});

export const deleteBrewMixtures = (mixtures) => ({
    type: DELETE_BREW_MIXTURES_REQUEST,
    payload: { mixtures },
});
