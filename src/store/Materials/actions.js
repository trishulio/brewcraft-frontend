import {
    FETCH_MATERIALS_REQUEST,
    FETCH_ALL_MATERIALS_REQUEST,
    SET_MATERIALS_PAGE_INDEX,
    SET_MATERIALS_PAGE_SIZE,
} from "./actionTypes";

export const fetchMaterials = (params) => ({
    type: FETCH_MATERIALS_REQUEST,
    payload: { params },
});

export const fetchAllMaterials = () => ({
    type: FETCH_ALL_MATERIALS_REQUEST,
});

export const setMaterialsPageIndex = (index) => ({
    type: SET_MATERIALS_PAGE_INDEX,
    payload: {
        pageIndex: index,
    },
});

export const setMaterialsPageSize = (size) => ({
    type: SET_MATERIALS_PAGE_SIZE,
    payload: {
        pageSize: size,
    },
});
