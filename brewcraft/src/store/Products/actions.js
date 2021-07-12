import {
    FETCH_PRODUCTS,
    FETCH_ALL_PRODUCTS,
    SET_PRODUCTS_PAGE_INDEX,
    SET_PRODUCTS_PAGE_SIZE,
    SET_PRODUCTS_CLASS,
    SET_PRODUCTS_TYPE,
    SET_PRODUCTS_STYLE
} from "./actionTypes";

export const fetchProducts = ({pageIndex, pageSize}) => ({
    type: FETCH_PRODUCTS,
    payload: {pageIndex, pageSize}
});

export const fetchAllProducts = () => ({
    type: FETCH_ALL_PRODUCTS,
    payload: {}
});

export const fetchProductsByCategory = ({pageIndex, pageSize, categoryId}) => ({
    type: FETCH_PRODUCTS,
    payload: {
        pageIndex, pageSize, categoryId
    }
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

export const setProductsSelectedClass = selectedClass => ({
    type: SET_PRODUCTS_CLASS,
    payload: { selectedClass, selectedType: "", selectedStyle: "" }
});

export const setProductsSelectedType = selectedType => ({
    type: SET_PRODUCTS_TYPE,
    payload: { selectedType, selectedStyle: "" }
});

export const setProductsSelectedStyle = selectedStyle => ({
    type: SET_PRODUCTS_STYLE,
    payload: { selectedStyle }
});