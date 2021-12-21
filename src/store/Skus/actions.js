import {
    FETCH_SKUS,
    FETCH_ALL_SKUS,
    FETCH_SKUS_BY_PRODUCT_ID,
    SET_SKUS_PAGE_INDEX,
    SET_SKUS_PAGE_SIZE,
} from "./actionTypes";

export const fetchAllSkus = () => ({
    type: FETCH_ALL_SKUS,
    payload: {},
});

export const fetchSkus = (params) => ({
    type: FETCH_SKUS,
    payload: { ...params },
});

export const fetchSkusByProductId = (id) => ({
    type: FETCH_SKUS_BY_PRODUCT_ID,
    payload: { id },
});

export const setSkusPageIndex = (index) => ({
    type: SET_SKUS_PAGE_INDEX,
    payload: {
        pageIndex: index,
    },
});

export const setSkusPageSize = (size) => ({
    type: SET_SKUS_PAGE_SIZE,
    payload: {
        pageSize: size,
    },
});
