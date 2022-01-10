import {
    SET_PRODUCTS,
    SET_PRODUCTS_PAGE_INDEX,
    SET_PRODUCTS_PAGE_SIZE,
    SET_PRODUCTS_CLASS,
    SET_PRODUCTS_TYPE,
    SET_PRODUCTS_STYLE,
    FETCH_ALL_PRODUCTS,
    FETCH_PRODUCTS,
} from "./actionTypes";

const initialState = {
    content: [],
    all: [],
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20,
    loading: true,
};

const Products = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_PRODUCTS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case SET_PRODUCTS_CLASS:
        case SET_PRODUCTS_TYPE:
        case SET_PRODUCTS_STYLE:
        case SET_PRODUCTS_PAGE_INDEX:
        case SET_PRODUCTS_PAGE_SIZE:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case FETCH_ALL_PRODUCTS:
        case FETCH_PRODUCTS:
            return {
                ...state,
                loading: true,
                error: null,
            };
        default:
            return {
                ...state,
                error: null,
            };
    }
};

export default Products;
