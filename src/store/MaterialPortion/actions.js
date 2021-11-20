import {
    FETCH_MATERIAL_PORTION_BY_ID_REQUEST,
    FETCH_MATERIAL_PORTION_BY_BREW_ID_REQUEST,
    FETCH_MATERIAL_PORTIONS_BY_MIXTURE_ID_REQUEST,
    SET_MASH_MATERIAL_PORTION_DETAILS,
    ADD_MASH_MATERIAL_PORTION_REQUEST,
    EDIT_MASH_MATERIAL_PORTION_REQUEST,
    DELETE_MASH_MATERIAL_PORTION_REQUEST,
    RESET_MASH_MATERIAL_PORTION_DETAILS,
    SET_KETTLE_MATERIAL_PORTION_DETAILS,
    ADD_KETTLE_MATERIAL_PORTION_REQUEST,
    EDIT_KETTLE_MATERIAL_PORTION_REQUEST,
    DELETE_KETTLE_MATERIAL_PORTION_REQUEST,
    RESET_KETTLE_MATERIAL_PORTION_DETAILS,
    SET_FERMENT_MATERIAL_PORTION_DETAILS,
    ADD_FERMENT_MATERIAL_PORTION_REQUEST,
    EDIT_FERMENT_MATERIAL_PORTION_REQUEST,
    DELETE_FERMENT_MATERIAL_PORTION_REQUEST,
    RESET_FERMENT_MATERIAL_PORTION_DETAILS,
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

export const setKettleMaterialPortionDetails = payload => ({
    type: SET_KETTLE_MATERIAL_PORTION_DETAILS,
    payload: payload
});

export const resetKettleMaterialPortionDetails = () => ({
    type: RESET_KETTLE_MATERIAL_PORTION_DETAILS,
    payload: null
});

export const saveKettleMaterialPortion = payload => ({
    type: ADD_KETTLE_MATERIAL_PORTION_REQUEST,
    payload: payload,
});

export const editKettleMaterialPortion = payload => ({
    type: EDIT_KETTLE_MATERIAL_PORTION_REQUEST,
    payload: payload,
});

export const deleteKettleMaterialPortion = payload => ({
    type: DELETE_KETTLE_MATERIAL_PORTION_REQUEST,
    payload: payload,
});

export const setFermentMaterialPortionDetails = payload => ({
    type: SET_FERMENT_MATERIAL_PORTION_DETAILS,
    payload: payload
});

export const resetFermentMaterialPortionDetails = () => ({
    type: RESET_FERMENT_MATERIAL_PORTION_DETAILS,
    payload: null
});

export const saveFermentMaterialPortion = payload => ({
    type: ADD_FERMENT_MATERIAL_PORTION_REQUEST,
    payload: payload,
});

export const editFermentMaterialPortion = payload => ({
    type: EDIT_FERMENT_MATERIAL_PORTION_REQUEST,
    payload: payload,
});

export const deleteFermentMaterialPortion = payload => ({
    type: DELETE_FERMENT_MATERIAL_PORTION_REQUEST,
    payload: payload,
});