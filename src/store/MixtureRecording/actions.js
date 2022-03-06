import {
    SET_BREW_MIXTURE_RECORDINGS,
    EDIT_BREW_MIXTURE_RECORDINGS_REQUEST,
    DELETE_BREW_MIXTURE_RECORDINGS_REQUEST,
    FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_REQUEST,
} from "./actionTypes";

export const fetchMixtureRecordingsByBrewId = (id) => ({
    type: FETCH_MIXTURE_RECORDINGS_BY_BREW_ID_REQUEST,
    payload: { id },
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
