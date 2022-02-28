import {
    FETCH_MATERIAL_PORTION_BY_ID_REQUEST,
    FETCH_MATERIAL_PORTION_BY_BREW_ID_REQUEST,
    FETCH_MATERIAL_PORTIONS_BY_MIXTURE_ID_REQUEST,
    SET_MASH_MATERIAL_PORTION_DETAILS,
    RESET_MASH_MATERIAL_PORTION_DETAILS,
    SET_KETTLE_MATERIAL_PORTION_DETAILS,
    RESET_KETTLE_MATERIAL_PORTION_DETAILS,
    SET_FERMENT_MATERIAL_PORTION_DETAILS,
    ADD_FERMENT_MATERIAL_PORTION_REQUEST,
    EDIT_FERMENT_MATERIAL_PORTION_REQUEST,
    DELETE_FERMENT_MATERIAL_PORTION_REQUEST,
    RESET_FERMENT_MATERIAL_PORTION_DETAILS,
    EDIT_MATERIAL_PORTIONS_REQUEST,
    DELETE_MATERIAL_PORTIONS_REQUEST,
    SET_BREW_MATERIAL_PORTIONS_DETAILS,
} from "./actionTypes";

export const fetchMaterialPortionById = (id) => ({
    type: FETCH_MATERIAL_PORTION_BY_ID_REQUEST,
    payload: { id },
});

export const fetchMaterialPortionsByBrewId = (id) => ({
    type: FETCH_MATERIAL_PORTION_BY_BREW_ID_REQUEST,
    payload: { id },
});

export const fetchMaterialPortionsByMixtureId = (id) => ({
    type: FETCH_MATERIAL_PORTIONS_BY_MIXTURE_ID_REQUEST,
    payload: { id },
});

export const setBrewMaterialPortions = (materialPortions) => ({
    type: SET_BREW_MATERIAL_PORTIONS_DETAILS,
    payload: {
        content: [...materialPortions],
    },
});

export const editMaterialPortions = (payload) => ({
    type: EDIT_MATERIAL_PORTIONS_REQUEST,
    payload: { ...payload },
});

export const deleteMaterialPortions = (payload) => ({
    type: DELETE_MATERIAL_PORTIONS_REQUEST,
    payload: { ...payload },
});

export const setMashMaterialPortionDetails = (payload) => ({
    type: SET_MASH_MATERIAL_PORTION_DETAILS,
    payload: payload,
});

export const resetMashMaterialPortionDetails = () => ({
    type: RESET_MASH_MATERIAL_PORTION_DETAILS,
    payload: null,
});

export const setKettleMaterialPortionDetails = (payload) => ({
    type: SET_KETTLE_MATERIAL_PORTION_DETAILS,
    payload: payload,
});

export const resetKettleMaterialPortionDetails = () => ({
    type: RESET_KETTLE_MATERIAL_PORTION_DETAILS,
    payload: null,
});

export const setFermentMaterialPortionDetails = (payload) => ({
    type: SET_FERMENT_MATERIAL_PORTION_DETAILS,
    payload: payload,
});

export const resetFermentMaterialPortionDetails = () => ({
    type: RESET_FERMENT_MATERIAL_PORTION_DETAILS,
    payload: null,
});

export const saveFermentMaterialPortion = (payload) => ({
    type: ADD_FERMENT_MATERIAL_PORTION_REQUEST,
    payload: payload,
});

export const editFermentMaterialPortion = (payload) => ({
    type: EDIT_FERMENT_MATERIAL_PORTION_REQUEST,
    payload: payload,
});

export const deleteFermentMaterialPortion = (payload) => ({
    type: DELETE_FERMENT_MATERIAL_PORTION_REQUEST,
    payload: payload,
});
