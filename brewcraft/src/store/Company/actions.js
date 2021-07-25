import {
    FETCH_COMPANY_BY_ID_REQUEST,
    SET_COMPANY_DETAILS,
    ADD_COMPANY_REQUEST,
    EDIT_COMPANY_REQUEST,
    DELETE_COMPANY_REQUEST,
    ADD_COMPANY_SUCCESS,
    RESET_COMPANY_DETAILS,
    SET_COMPANY_INVALID_CATEGORY
} from "./actionTypes";

export const fetchCompanyById = (payload) => ({
    type: FETCH_COMPANY_BY_ID_REQUEST,
    payload: payload,
  });

export const setCompanyDetails = payload => ({
    type: SET_COMPANY_DETAILS,
    payload: payload
});

export const resetCompanyDetails = () => ({
    type: RESET_COMPANY_DETAILS,
    payload: null
});

export const saveCompany = payload => ({
    type: ADD_COMPANY_REQUEST,
    payload: payload,
});

export const editCompany = payload => ({
    type: EDIT_COMPANY_REQUEST,
    payload: payload,
});

export const deleteCompany = payload => ({
    type: DELETE_COMPANY_REQUEST,
    payload: payload,
});

export const setInvalidCompanyName = value => ({
    type: SET_COMPANY_DETAILS,
    payload: {
        invalidName: value
    }
});

export const setInvalidCompanyAddressLine1 = value => ({
    type: SET_COMPANY_DETAILS,
    payload: {
        invalidAddressLine1: value
    }
});

export const setInvalidCompanyCity = value => ({
    type: SET_COMPANY_DETAILS,
    payload: {
        city: value
    }
});

export const setInvalidCompanyProvince = value => ({
    type: SET_COMPANY_DETAILS,
    payload: {
        province: value
    }
});

export const setInvalidCompanyPostalCode = value => ({
    type: SET_COMPANY_DETAILS,
    payload: {
        postalCode: value
    }
});

export const setInvalidCompanyCountry = value => ({
    type: SET_COMPANY_DETAILS,
    payload: {
        country: value
    }
});