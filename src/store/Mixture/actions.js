import {
    FETCH_MIXTURE_BY_BREW_ID_REQUEST,
    SET_MASH_MIXTURE_DETAILS,
    RESET_MASH_MIXTURE_DETAILS,
    SET_KETTLE_MIXTURE_DETAILS,
    RESET_KETTLE_MIXTURE_DETAILS,
    SET_WHIRLPOOL_MIXTURE_DETAILS,
    RESET_WHIRLPOOL_MIXTURE_DETAILS,
    SET_TRANSFER_MIXTURE_DETAILS,
    RESET_TRANSFER_MIXTURE_DETAILS,
    SET_FERMENT_MIXTURE_DETAILS,
    RESET_FERMENT_MIXTURE_DETAILS,
    SET_BREW_MIXTURE_DETAILS,
    EDIT_BREW_MIXTURES_REQUEST,
    DELETE_BREW_MIXTURES_REQUEST,
} from "./actionTypes";

export const fetchMixturesByBrewId = (id) => ({
    type: FETCH_MIXTURE_BY_BREW_ID_REQUEST,
    payload: { id },
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

export const setMashMixtureDetails = (payload) => ({
    type: SET_MASH_MIXTURE_DETAILS,
    payload: payload,
});

export const resetMashMixtureDetails = () => ({
    type: RESET_MASH_MIXTURE_DETAILS,
    payload: null,
});

export const setKettleMixtureDetails = (payload) => ({
    type: SET_KETTLE_MIXTURE_DETAILS,
    payload: payload,
});

export const resetKettleMixtureDetails = () => ({
    type: RESET_KETTLE_MIXTURE_DETAILS,
    payload: null,
});

export const setWhirlpoolMixtureDetails = (payload) => ({
    type: SET_WHIRLPOOL_MIXTURE_DETAILS,
    payload: payload,
});

export const resetWhirlpoolMixtureDetails = () => ({
    type: RESET_WHIRLPOOL_MIXTURE_DETAILS,
    payload: null,
});

export const setTransferMixtureDetails = (payload) => ({
    type: SET_TRANSFER_MIXTURE_DETAILS,
    payload: payload,
});

export const resetTransferMixtureDetails = () => ({
    type: RESET_TRANSFER_MIXTURE_DETAILS,
    payload: null,
});

export const setFermentMixtureDetails = (payload) => ({
    type: SET_FERMENT_MIXTURE_DETAILS,
    payload: payload,
});

export const resetFermentMixtureDetails = () => ({
    type: RESET_FERMENT_MIXTURE_DETAILS,
    payload: null,
});
