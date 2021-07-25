import {
    FETCH_INGREDIENT_BY_ID_REQUEST,
    SET_INGREDIENT_DETAILS,
    ADD_INGREDIENT_REQUEST,
    EDIT_INGREDIENT_REQUEST,
    DELETE_INGREDIENT_REQUEST,
    ADD_INGREDIENT_SUCCESS,
    RESET_INGREDIENT_DETAILS,
    SET_INGREDIENT_INVALID_CATEGORY
} from "./actionTypes";

export const fetchIngredientById = (payload) => ({
    type: FETCH_INGREDIENT_BY_ID_REQUEST,
    payload: payload,
  });

export const setIngredientDetails = payload => ({
    type: SET_INGREDIENT_DETAILS,
    payload: payload
});

export const resetIngredientDetails = () => ({
    type: RESET_INGREDIENT_DETAILS,
    payload: null
});

export const saveIngredient = payload => ({
    type: ADD_INGREDIENT_REQUEST,
    payload: payload,
});

export const editIngredient = payload => ({
    type: EDIT_INGREDIENT_REQUEST,
    payload: payload,
});

export const deleteIngredient = payload => ({
    type: DELETE_INGREDIENT_REQUEST,
    payload: payload,
});

export const setIngredientInvalidCategory = value => ({
    type: SET_INGREDIENT_INVALID_CATEGORY,
    payload: value
});

export const setIngredientInvalidBaseQuantityUnit = value => ({
    type: SET_INGREDIENT_INVALID_CATEGORY,
    payload: value
});