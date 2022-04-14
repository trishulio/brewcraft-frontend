import { SET_BATCH_MIXTURES } from "./actionTypes";

export const setBrewMixtureDetails = (payload) => ({
    type: SET_BATCH_MIXTURES,
    payload: { ...payload },
});
