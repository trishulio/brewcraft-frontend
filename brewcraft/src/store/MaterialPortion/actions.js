import {
    FETCH_MATERIAL_PORTION_BY_ID_REQUEST,
    SET_MATERIAL_PORTION_DETAILS,
    ADD_MATERIAL_PORTION_REQUEST,
    EDIT_MATERIAL_PORTION_REQUEST,
    DELETE_MATERIAL_PORTION_REQUEST,
    RESET_MATERIAL_PORTION_DETAILS,
    SET_MATERIAL_PORTION_INVALID_NAME,
    SET_MATERIAL_PORTION_INVALID_CATEGORY
} from "./actionTypes";

export const fetchMaterialPortionById = id => ({
    type: FETCH_MATERIAL_PORTION_BY_ID_REQUEST,
    payload: { id },
  });

export const setMaterialPortionDetails = payload => ({
    type: SET_MATERIAL_PORTION_DETAILS,
    payload: payload
});

export const resetMaterialPortionDetails = () => ({
    type: RESET_MATERIAL_PORTION_DETAILS,
    payload: null
});

export const saveMaterialPortion = payload => ({
    type: ADD_MATERIAL_PORTION_REQUEST,
    payload: payload,
});

export const editMaterialPortion = payload => ({
    type: EDIT_MATERIAL_PORTION_REQUEST,
    payload: payload,
});

export const deleteMaterialPortion = payload => ({
    type: DELETE_MATERIAL_PORTION_REQUEST,
    payload: payload,
});

export const setMaterialPortionInvalidName = value => ({
    type: SET_MATERIAL_PORTION_INVALID_NAME,
    payload: value
});

export const setMaterialPortionInvalidCategory = value => ({
    type: SET_MATERIAL_PORTION_INVALID_CATEGORY,
    payload: value
});

export const setMaterialPortionInvalidBaseQuantityUnit = value => ({
    type: SET_MATERIAL_PORTION_INVALID_CATEGORY,
    payload: value
});