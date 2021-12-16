import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_ERROR,
    FETCH_ALL_USERS_REQUEST,
    SET_USERS_DETAILS,
    SET_USERS_PAGE_INDEX,
    SET_USERS_PAGE_SIZE
} from "./actionTypes";

export const fetchUsers = params => ({
    type: FETCH_USERS_REQUEST,
    payload: { params },
});

export const fetchUsersError = error => ({
    type: FETCH_USERS_ERROR,
    payload: {
        ...error
    }
});

export const fetchAllUsers = () => ({
    type: FETCH_ALL_USERS_REQUEST,
});

export const setUsersPageIndex = index => ({
    type: SET_USERS_PAGE_INDEX,
    payload: {
        pageIndex: index
    }
});

export const setUsersPageSize = size => ({
    type: SET_USERS_PAGE_SIZE,
    payload: {
        pageSize: size
    }
});

export const setInvalidUserFirstName = value => ({
    type: SET_USERS_DETAILS,
    payload: {
        invalidUserFirstName: value
    }
});

export const setInvalidUserLastName = value => ({
    type: SET_USERS_DETAILS,
    payload: {
        invalidUserLastName: value
    }
});

export const setInvalidUserPosition = value => ({
    type: SET_USERS_DETAILS,
    payload: {
        invalidUserPosition: value
    }
});

export const setInvalidUserEmail = value => ({
    type: SET_USERS_DETAILS,
    payload: {
        invalidUserEmail: value
    }
});

export const setInvalidUserPhoneNumber = value => ({
    type: SET_USERS_DETAILS,
    payload: {
        invalidUserPhoneNumber: value
    }
});

export const setInvalidUserCompany = value => ({
    type: SET_USERS_DETAILS,
    payload: {
        invalidUserCompany: value
    }
});