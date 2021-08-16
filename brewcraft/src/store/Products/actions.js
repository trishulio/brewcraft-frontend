import {
    FETCH_PRODUCTS,
    FETCH_ALL_PRODUCTS,
    SET_PRODUCTS_PAGE_INDEX,
    SET_PRODUCTS_PAGE_SIZE
} from "./actionTypes";

export const fetchProducts = ({pageIndex, pageSize}) => ({
    type: FETCH_PRODUCTS,
    payload: {pageIndex, pageSize}
});

export const fetchAllProducts = () => ({
    type: FETCH_ALL_PRODUCTS,
    payload: {}
});

export const fetchProductsByCategory = params => ({
    type: FETCH_PRODUCTS,
    payload: params
});

export const setProductsPageIndex = index => ({
    type: SET_PRODUCTS_PAGE_INDEX,
    payload: {
        pageIndex: index
    }
});

export const setProductsPageSize = size => ({
    type: SET_PRODUCTS_PAGE_SIZE,
    payload: {
        pageSize: size
    }
});