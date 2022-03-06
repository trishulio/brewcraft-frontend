import {
    DELETE_BREW_MATERIAL_PORTIONS_REQUEST,
    EDIT_BREW_MATERIAL_PORTIONS_REQUEST,
    FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_REQUEST,
    SET_BREW_MATERIAL_PORTIONS,
} from "./actionTypes";

export const fetchMaterialPortionsByBrewId = (id) => ({
    type: FETCH_BREW_MATERIAL_PORTIONS_BY_BREW_ID_REQUEST,
    payload: { id },
});

export const setBrewMaterialPortions = ({ content }) => ({
    type: SET_BREW_MATERIAL_PORTIONS,
    payload: {
        content,
    },
});

export const editBrewMaterialPortions = (payload) => ({
    type: EDIT_BREW_MATERIAL_PORTIONS_REQUEST,
    payload: { ...payload },
});

export const deleteBrewMaterialPortions = (payload) => ({
    type: DELETE_BREW_MATERIAL_PORTIONS_REQUEST,
    payload: { ...payload },
});
