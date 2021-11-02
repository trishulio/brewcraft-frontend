import {
    FETCH_MATERIAL_PORTION_BY_ID_REQUEST,
    FETCH_MATERIAL_PORTION_BY_BREW_ID_REQUEST,
    FETCH_MATERIAL_PORTIONS_BY_MIXTURE_ID_REQUEST,
    SET_MASH_MATERIAL_PORTION_DETAILS,
    ADD_MASH_MATERIAL_PORTION_REQUEST,
    EDIT_MASH_MATERIAL_PORTION_REQUEST,
    DELETE_MASH_MATERIAL_PORTION_REQUEST,
    RESET_MASH_MATERIAL_PORTION_DETAILS,
} from "./actionTypes";

export const fetchMaterialPortionById = id => ({
    type: FETCH_MATERIAL_PORTION_BY_ID_REQUEST,
    payload: { id },
});

export const fetchMaterialPortionsByBrewId = id => ({
    type: FETCH_MATERIAL_PORTION_BY_BREW_ID_REQUEST,
    payload: { id },
});

export const fetchMaterialPortionsByMixtureId = id => ({
    type: FETCH_MATERIAL_PORTIONS_BY_MIXTURE_ID_REQUEST,
    payload: { id },
});

export const setMashMaterialPortionDetails = payload => ({
    type: SET_MASH_MATERIAL_PORTION_DETAILS,
    payload: payload
});

export const resetMashMaterialPortionDetails = () => ({
    type: RESET_MASH_MATERIAL_PORTION_DETAILS,
    payload: null
});

export const saveMashMaterialPortion = payload => ({
    type: ADD_MASH_MATERIAL_PORTION_REQUEST,
    payload: payload,
});

export const editMashMaterialPortion = payload => ({
    type: EDIT_MASH_MATERIAL_PORTION_REQUEST,
    payload: payload,
});

export const deleteMashMaterialPortion = payload => ({
    type: DELETE_MASH_MATERIAL_PORTION_REQUEST,
    payload: payload,
});