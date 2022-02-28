import { FETCH_MIXTURES_REQUEST, FETCH_MIXTURES_ERROR } from "./actionTypes";

export const fetchMixtures = (params) => ({
    type: FETCH_MIXTURES_REQUEST,
    payload: { params },
});

export const fetchMixturesError = (error) => ({
    type: FETCH_MIXTURES_ERROR,
    payload: {
        ...error,
    },
});
