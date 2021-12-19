import {
    FETCH_MATERIAL_CATEGORIES_REQUEST,
    FETCH_ALL_MATERIAL_CATEGORIES_REQUEST,
    SET_MATERIAL_CATEGORIES_PAGE_INDEX,
    SET_MATERIAL_CATEGORIES_PAGE_SIZE,
} from "./actionTypes";

export const fetchMaterialCategories = (params) => ({
    type: FETCH_MATERIAL_CATEGORIES_REQUEST,
    payload: { params },
});

export const fetchAllMaterialCategories = () => ({
    type: FETCH_ALL_MATERIAL_CATEGORIES_REQUEST,
});

export const setMaterialCategoriesPageIndex = (index) => ({
    type: SET_MATERIAL_CATEGORIES_PAGE_INDEX,
    payload: {
        pageIndex: index,
    },
});

export const setMaterialCategoriesPageSize = (size) => ({
    type: SET_MATERIAL_CATEGORIES_PAGE_SIZE,
    payload: {
        pageSize: size,
    },
});
