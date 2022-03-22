import {
    FETCH_BATCH_MIXTURES_REQUEST,
    SET_BATCH_MIXTURES,
    DELETE_BREW_MIXTURES_REQUEST,
} from "./actionTypes";

export const fetchBrewMixtures = (params) => ({
    type: FETCH_BATCH_MIXTURES_REQUEST,
    payload: { ...params },
});

export const setBrewMixtureDetails = (payload) => ({
    type: SET_BATCH_MIXTURES,
    payload: { ...payload },
});

export const deleteBrewMixtures = (mixtures) => ({
    type: DELETE_BREW_MIXTURES_REQUEST,
    payload: { mixtures },
});
