import {
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANY_REQUEST,
    CREATE_COMPANY_REQUEST,
    UPDATE_COMPANY_REQUEST,
    DELETE_COMPANY_REQUEST
} from "./actionTypes";

export const fetchCompanies = () => ({
    type: FETCH_COMPANIES_REQUEST
});

export const fetchCompany = payload => ({
    type: FETCH_COMPANY_REQUEST,
    payload: payload
});

export const createCompany = payload => ({
    type: CREATE_COMPANY_REQUEST,
    payload: payload
});

export const updateCompany = payload => ({
    type: UPDATE_COMPANY_REQUEST,
    payload: payload
});

export const deleteCompany = payload => ({
    type: DELETE_COMPANY_REQUEST,
    payload: payload
});