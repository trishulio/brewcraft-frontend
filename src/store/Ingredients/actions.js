import {
    FETCH_INGREDIENTS_REQUEST,
    FETCH_ALL_INGREDIENTS_REQUEST,
    SET_INGREDIENTS_PAGE_INDEX,
    SET_INGREDIENTS_PAGE_SIZE,
} from "./actionTypes";

export const fetchIngredients = (params) => ({
    type: FETCH_INGREDIENTS_REQUEST,
    payload: { params },
});

export const fetchAllIngredients = () => ({
    type: FETCH_ALL_INGREDIENTS_REQUEST,
});

export const setIngredientsPageIndex = (index) => ({
    type: SET_INGREDIENTS_PAGE_INDEX,
    payload: {
        pageIndex: index,
    },
});

export const setIngredientsPageSize = (size) => ({
    type: SET_INGREDIENTS_PAGE_SIZE,
    payload: {
        pageSize: size,
    },
});
