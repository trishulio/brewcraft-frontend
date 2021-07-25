import {
    FETCH_PACKAGING_REQUEST,
    FETCH_ALL_PACKAGING_REQUEST,
    SET_PACKAGING_DETAILS,
    SET_PACKAGING_PAGE_INDEX,
    SET_PACKAGING_PAGE_SIZE
} from "./actionTypes";

export const fetchPackaging = params => ({
    type: FETCH_PACKAGING_REQUEST,
    payload: { params },
});

export const fetchAllPackaging = () => ({
    type: FETCH_ALL_PACKAGING_REQUEST,
});

export const setPackagingSelectedCategory = category => ({
    type: SET_PACKAGING_DETAILS,
    payload: {
        selectedCategory: category
    }
});

export const setPackagingPageIndex = index => ({
    type: SET_PACKAGING_PAGE_INDEX,
    payload: {
        pageIndex: index
    }
});

export const setPackagingPageSize = size => ({
    type: SET_PACKAGING_PAGE_SIZE,
    payload: {
        pageSize: size
    }
});