import {
    FETCH_INGREDIENT_BY_ID_REQUEST,
    SET_INGREDIENT_DETAILS,
    ADD_INGREDIENT_REQUEST,
    EDIT_INGREDIENT_REQUEST,
    DELETE_INGREDIENT_REQUEST,
    RESET_INGREDIENT_DETAILS,
    SET_INGREDIENT_INVALID_NAME,
    SET_INGREDIENT_INVALID_CATEGORY,
    SET_INGREDIENT_INVALID_UNIT,
    SET_INGREDIENT_INVALID_UPC,
} from "./actionTypes";

export const fetchIngredientById = (id) => ({
    type: FETCH_INGREDIENT_BY_ID_REQUEST,
    payload: { id },
});

export const setIngredientDetails = (payload) => ({
    type: SET_INGREDIENT_DETAILS,
    payload: payload,
});

export const resetIngredientDetails = () => ({
    type: RESET_INGREDIENT_DETAILS,
    payload: null,
});

export const saveIngredient = (payload) => ({
    type: ADD_INGREDIENT_REQUEST,
    payload: payload,
});

export const editIngredient = (payload) => ({
    type: EDIT_INGREDIENT_REQUEST,
    payload: payload,
});

export const deleteIngredient = (id) => ({
    type: DELETE_INGREDIENT_REQUEST,
    payload: { id },
});

export const setIngredientInvalidName = (value) => ({
    type: SET_INGREDIENT_INVALID_NAME,
    payload: value,
});

export const setIngredientInvalidCategory = (value) => ({
    type: SET_INGREDIENT_INVALID_CATEGORY,
    payload: value,
});

export const setIngredientInvalidBaseQuantityUnit = (value) => ({
    type: SET_INGREDIENT_INVALID_UNIT,
    payload: value,
});

export const setIngredientInvalidUpc = (value) => ({
    type: SET_INGREDIENT_INVALID_UPC,
    payload: value.length > 12,
});
