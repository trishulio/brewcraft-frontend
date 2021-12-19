import {
    CREATE_USER,
    FETCH_USER,
    UPDATE_USER,
    SET_USER_DETAILS,
    SET_USER_DETAILS_ERROR,
    RESET_USER_DETAILS,
    DELETE_USER,
    SET_USER_INVALID_USERNAME,
    SET_USER_INVALID_DISPLAYNAME,
    SET_USER_INVALID_FIRSTNAME,
    SET_USER_INVALID_LASTNAME,
    SET_USER_INVALID_EMAIL,
    SET_USER_INVALID_PHONENUMBER,
    SET_USER_INVALID_ROLES,
} from "./actionTypes";

export const setUserDetails = (payload) => ({
    type: SET_USER_DETAILS,
    payload,
});

export const setUserDetailsError = (error) => ({
    type: SET_USER_DETAILS_ERROR,
    payload: {
        ...error,
    },
});

export const fetchUserById = (id) => ({
    type: FETCH_USER,
    payload: { id },
});

export const createUser = (payload) => ({
    type: CREATE_USER,
    payload,
});

export const updateUser = (payload) => ({
    type: UPDATE_USER,
    payload,
});

export const deleteUser = (id) => ({
    type: DELETE_USER,
    payload: { id },
});

export const resetUserDetails = () => ({
    type: RESET_USER_DETAILS,
    payload: null,
});

export const setUserInvalidUserName = (value) => ({
    type: SET_USER_INVALID_USERNAME,
    payload: value,
});

export const setUserInvalidDisplayName = (value) => ({
    type: SET_USER_INVALID_DISPLAYNAME,
    payload: value,
});

export const setUserInvalidFirstName = (value) => ({
    type: SET_USER_INVALID_FIRSTNAME,
    payload: value,
});

export const setUserInvalidLastName = (value) => ({
    type: SET_USER_INVALID_LASTNAME,
    payload: value,
});

export const setUserInvalidEmail = (value) => ({
    type: SET_USER_INVALID_EMAIL,
    payload: value,
});

export const setUserInvalidPhoneNumber = (value) => ({
    type: SET_USER_INVALID_PHONENUMBER,
    payload: value,
});

export const setUserInvalidRoles = (value) => ({
    type: SET_USER_INVALID_ROLES,
    payload: value,
});
