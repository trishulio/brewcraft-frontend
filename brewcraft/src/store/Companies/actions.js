import {
    FETCH_COMPANIES_REQUEST,
    FETCH_ALL_COMPANIES_REQUEST,
    SET_COMPANIES_DETAILS,
    SET_COMPANIES_PAGE_INDEX,
    SET_COMPANIES_PAGE_SIZE
} from "./actionTypes";

export const fetchCompanies = params => ({
    type: FETCH_COMPANIES_REQUEST,
    payload: params,
});

export const fetchAllCompanies = () => ({
    type: FETCH_ALL_COMPANIES_REQUEST,
});

export const setCompaniesSelectedCategory = category => ({
    type: SET_COMPANIES_DETAILS,
    payload: {
        selectedCategory: category
    }
});

export const setCompaniesPageIndex = index => ({
    type: SET_COMPANIES_PAGE_INDEX,
    payload: {
        pageIndex: index
    }
});

export const setCompaniesPageSize = size => ({
    type: SET_COMPANIES_PAGE_SIZE,
    payload: {
        pageSize: size
    }
});