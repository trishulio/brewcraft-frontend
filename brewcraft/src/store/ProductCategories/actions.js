import {
    CREATE_PRODUCT_CATEGORIES,
    FETCH_PRODUCT_CATEGORIES,
    FETCH_ALL_PRODUCT_CATEGORIES,
    SET_PRODUCT_CATEGORIES,
    SET_PRODUCT_CATEGORIES_CLASS,
    SET_PRODUCT_CATEGORIES_TYPE,
    SET_PRODUCT_CATEGORIES_STYLE,
    SET_PRODUCT_CATEGORIES_PAGE_INDEX,
    SET_PRODUCT_CATEGORIES_PAGE_SIZE
} from "./actionTypes";

export const setProductCategories = productTypes => ({
    type: SET_PRODUCT_CATEGORIES,
    payload: productTypes
});

export const fetchProductCategories = ({pageIndex, pageSize, parentCategoryId, success}) => ({
    type: FETCH_PRODUCT_CATEGORIES,
    payload: {pageIndex, pageSize, parentCategoryId, success}
});

export const fetchAllProductCategories = params => ({
    type: FETCH_ALL_PRODUCT_CATEGORIES,
    payload: {
        success: params?.success
    }
});

export const setProductCategoriesSelectedClass = selectedClass => ({
    type: SET_PRODUCT_CATEGORIES_CLASS,
    payload: { selectedClass, selectedType: "", selectedStyle: "" }
});

export const setProductCategoriesSelectedType = selectedType => ({
    type: SET_PRODUCT_CATEGORIES_TYPE,
    payload: { selectedType, selectedStyle: "" }
});

export const setProductCategoriesSelectedStyle = selectedStyle => ({
    type: SET_PRODUCT_CATEGORIES_STYLE,
    payload: { selectedStyle }
});

export const setProductCategoriesPageIndex = index => ({
    type: SET_PRODUCT_CATEGORIES_PAGE_INDEX,
    payload: {
        pageIndex: index
    }
});

export const setProductCategoriesPageSize = size => ({
    type: SET_PRODUCT_CATEGORIES_PAGE_SIZE,
    payload: {
        pageSize: size
    }
});