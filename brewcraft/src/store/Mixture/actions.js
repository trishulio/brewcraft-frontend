import {
    FETCH_MIXTURE_BY_BREW_ID_REQUEST,
    FETCH_MASH_MIXTURE_BY_ID_REQUEST,
    SET_MASH_MIXTURE_DETAILS,
    ADD_MASH_MIXTURE_REQUEST,
    EDIT_MASH_MIXTURE_REQUEST,
    DELETE_MASH_MIXTURE_REQUEST,
    RESET_MASH_MIXTURE_DETAILS,
    FETCH_KETTLE_MIXTURE_BY_ID_REQUEST,
    SET_KETTLE_MIXTURE_DETAILS,
    ADD_KETTLE_MIXTURE_REQUEST,
    EDIT_KETTLE_MIXTURE_REQUEST,
    DELETE_KETTLE_MIXTURE_REQUEST,
    RESET_KETTLE_MIXTURE_DETAILS,
    FETCH_WHIRLPOOL_MIXTURE_BY_ID_REQUEST,
    SET_WHIRLPOOL_MIXTURE_DETAILS,
    ADD_WHIRLPOOL_MIXTURE_REQUEST,
    EDIT_WHIRLPOOL_MIXTURE_REQUEST,
    DELETE_WHIRLPOOL_MIXTURE_REQUEST,
    RESET_WHIRLPOOL_MIXTURE_DETAILS
} from "./actionTypes";

export const fetchMixturesByBrewId = id => ({
    type: FETCH_MIXTURE_BY_BREW_ID_REQUEST,
    payload: { id },
});

export const fetchMashMixtureById = id => ({
    type: FETCH_MASH_MIXTURE_BY_ID_REQUEST,
    payload: { id },
});

export const saveMashMixture = payload => ({
    type: ADD_MASH_MIXTURE_REQUEST,
    payload: payload,
});

export const editMashMixture = payload => ({
    type: EDIT_MASH_MIXTURE_REQUEST,
    payload: payload,
});

export const deleteMashMixture = payload => ({
    type: DELETE_MASH_MIXTURE_REQUEST,
    payload: payload,
});

export const setMashMixtureDetails = payload => ({
    type: SET_MASH_MIXTURE_DETAILS,
    payload: payload
});

export const resetMashMixtureDetails = () => ({
    type: RESET_MASH_MIXTURE_DETAILS,
    payload: null
});

export const fetchKettleMixtureById = id => ({
    type: FETCH_KETTLE_MIXTURE_BY_ID_REQUEST,
    payload: { id },
});

export const saveKettleMixture = payload => ({
    type: ADD_KETTLE_MIXTURE_REQUEST,
    payload: payload,
});

export const editKettleMixture = payload => ({
    type: EDIT_KETTLE_MIXTURE_REQUEST,
    payload: payload,
});

export const deleteKettleMixture = payload => ({
    type: DELETE_KETTLE_MIXTURE_REQUEST,
    payload: payload,
});

export const setKettleMixtureDetails = payload => ({
    type: SET_KETTLE_MIXTURE_DETAILS,
    payload: payload
});

export const resetKettleMixtureDetails = () => ({
    type: RESET_KETTLE_MIXTURE_DETAILS,
    payload: null
});

export const fetchWhirlpoolMixtureById = id => ({
    type: FETCH_WHIRLPOOL_MIXTURE_BY_ID_REQUEST,
    payload: { id },
});

export const saveWhirlpoolMixture = payload => ({
    type: ADD_WHIRLPOOL_MIXTURE_REQUEST,
    payload: payload,
});

export const editWhirlpoolMixture = payload => ({
    type: EDIT_WHIRLPOOL_MIXTURE_REQUEST,
    payload: payload,
});

export const deleteWhirlpoolMixture = payload => ({
    type: DELETE_WHIRLPOOL_MIXTURE_REQUEST,
    payload: payload,
});

export const setWhirlpoolMixtureDetails = payload => ({
    type: SET_WHIRLPOOL_MIXTURE_DETAILS,
    payload: payload
});

export const resetWhirlpoolMixtureDetails = () => ({
    type: RESET_WHIRLPOOL_MIXTURE_DETAILS,
    payload: null
});