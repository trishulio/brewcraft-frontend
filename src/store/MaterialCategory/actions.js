import {
    FETCH_MATERIAL_CATEGORY_BY_ID_REQUEST,
    EDIT_MATERIAL_CATEGORY_REQUEST,
    DELETE_MATERIAL_CATEGORY_REQUEST,
    ADD_MATERIAL_CATEGORY_REQUEST,
    SET_MATERIAL_CATEGORY_DETAILS,
    RESET_MATERIAL_CATEGORY_DETAILS,
    INVALID_MATERIAL_CATEGORY_NAME,
    INVALID_MATERIAL_CATEGORY_PARENT_CATEGORY
} from "./actionTypes";

export const setMaterialCategoryDetails = payload => ({
    type: SET_MATERIAL_CATEGORY_DETAILS,
    payload: payload
});

export const resetMaterialCategoryDetails = () => ({
    type: RESET_MATERIAL_CATEGORY_DETAILS,
    payload: null
});

export const fetchMaterialCategoryById = (payload) => ({
    type: FETCH_MATERIAL_CATEGORY_BY_ID_REQUEST,
    payload: payload,
});
export const editMaterialCategory = (payload) => ({
    type: EDIT_MATERIAL_CATEGORY_REQUEST,
    payload: payload,
});

export const deleteMaterialCategory = id => ({
    type: DELETE_MATERIAL_CATEGORY_REQUEST,
    payload: { id },
});

export const saveMaterialCategory = payload => ({
    type: ADD_MATERIAL_CATEGORY_REQUEST,
    payload: payload
});

export const setInvalidMaterialCategoryName = enabled => ({
    type: INVALID_MATERIAL_CATEGORY_NAME,
    payload: {
        invalidName: enabled
    }
});

export const setInvalidMaterialCategoryParentCategory = enabled => ({
    type: INVALID_MATERIAL_CATEGORY_PARENT_CATEGORY,
    payload: {
        invalidParentCategory: enabled
    }
});