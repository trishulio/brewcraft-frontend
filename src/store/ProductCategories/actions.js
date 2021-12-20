import {
    FETCH_PRODUCT_CATEGORIES,
    FETCH_ALL_PRODUCT_CATEGORIES,
    SET_PRODUCT_CATEGORIES,
    SET_PRODUCT_CATEGORIES_PAGE_INDEX,
    SET_PRODUCT_CATEGORIES_PAGE_SIZE,
} from "./actionTypes";

export const setProductCategories = (productTypes) => ({
    type: SET_PRODUCT_CATEGORIES,
    payload: productTypes,
});

export const fetchProductCategories = ({
    pageIndex,
    pageSize,
    parentCategoryId,
    success,
}) => ({
    type: FETCH_PRODUCT_CATEGORIES,
    payload: { pageIndex, pageSize, parentCategoryId, success },
});

export const fetchAllProductCategories = (params) => ({
    type: FETCH_ALL_PRODUCT_CATEGORIES,
    payload: {
        success: params?.success,
    },
});

export const setProductCategoriesPageIndex = (index) => ({
    type: SET_PRODUCT_CATEGORIES_PAGE_INDEX,
    payload: {
        pageIndex: index,
    },
});

export const setProductCategoriesPageSize = (size) => ({
    type: SET_PRODUCT_CATEGORIES_PAGE_SIZE,
    payload: {
        pageSize: size,
    },
});
