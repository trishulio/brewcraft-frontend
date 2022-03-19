import {
    SET_BREW_MIXTURE_RECORDINGS,
    EDIT_BREW_MIXTURE_RECORDINGS_REQUEST,
    DELETE_BREW_MIXTURE_RECORDINGS_REQUEST,
    FETCH_BREW_MIXTURE_RECORDINGS_REQUEST,
} from "./actionTypes";

export const fetchBrewMixtureRecordings = ({ batchId }) => ({
    type: FETCH_BREW_MIXTURE_RECORDINGS_REQUEST,
    payload: { batchId },
});

export const setBrewMixtureRecordings = (payload) => ({
    type: SET_BREW_MIXTURE_RECORDINGS,
    payload: payload,
});

export const saveBrewMixtureRecordings = (mixtureRecordings) => ({
    type: EDIT_BREW_MIXTURE_RECORDINGS_REQUEST,
    payload: {
        mixtureRecordings,
    },
});

export const deleteBrewMixtureRecordings = ({ form }) => ({
    type: DELETE_BREW_MIXTURE_RECORDINGS_REQUEST,
    payload: {
        form,
    },
});
