import {
    FETCH_BATCH_MIXTURES_REQUEST,
    SET_BATCH_MIXTURES,
    EDIT_BREW_MIXTURES_REQUEST,
    DELETE_BREW_MIXTURES_REQUEST,
} from "./actionTypes";

export const fetchBrewMixtures = (params) => ({
    type: FETCH_BATCH_MIXTURES_REQUEST,
    payload: { ...params },
});

export const editBrewMixtures = (payload) => ({
    type: EDIT_BREW_MIXTURES_REQUEST,
    payload: { ...payload },
});

export const setBrewMixtureDetails = (payload) => ({
    type: SET_BATCH_MIXTURES,
    payload: { ...payload },
});

export const deleteBrewMixtures = (mixtures) => ({
    type: DELETE_BREW_MIXTURES_REQUEST,
    payload: { mixtures },
});
