import {
    FETCH_RAW_MATERIALS_REQUEST,
    FETCH_ALL_RAW_MATERIALS_REQUEST,
    SET_RAW_MATERIALS_PAGE_INDEX,
    SET_RAW_MATERIALS_PAGE_SIZE
} from "./actionTypes";

export const fetchRawMaterials = params => ({
    type: FETCH_RAW_MATERIALS_REQUEST,
    payload: { params },
});

export const fetchAllRawMaterials = () => ({
    type: FETCH_ALL_RAW_MATERIALS_REQUEST,
});

export const setRawMaterialsPageIndex = index => ({
    type: SET_RAW_MATERIALS_PAGE_INDEX,
    payload: {
        pageIndex: index
    }
});

export const setRawMaterialsPageSize = size => ({
    type: SET_RAW_MATERIALS_PAGE_SIZE,
    payload: {
        pageSize: size
    }
});