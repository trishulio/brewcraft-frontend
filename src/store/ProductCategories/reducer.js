import {
    SET_PRODUCT_CATEGORIES,
    SET_ALL_PRODUCT_CATEGORIES,
    SET_PRODUCT_CATEGORIES_CLASS,
    SET_PRODUCT_CATEGORIES_TYPE,
    SET_PRODUCT_CATEGORIES_STYLE,
    SET_PRODUCT_CATEGORIES_PAGE_INDEX,
    SET_PRODUCT_CATEGORIES_PAGE_SIZE,
} from "./actionTypes";

const initialState = {
    content: [],
    data: [],
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20,
    loading: true,
    error: null,
};

const ProductCategories = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_PRODUCT_CATEGORIES_CLASS:
        case SET_PRODUCT_CATEGORIES_TYPE:
        case SET_PRODUCT_CATEGORIES_STYLE:
        case SET_PRODUCT_CATEGORIES_PAGE_INDEX:
        case SET_PRODUCT_CATEGORIES_PAGE_SIZE:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case SET_PRODUCT_CATEGORIES:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case SET_ALL_PRODUCT_CATEGORIES:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
                loading: true,
                error: null,
            };
    }
};

export default ProductCategories;
