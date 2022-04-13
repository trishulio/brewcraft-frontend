import {
    SET_USER_DETAILS,
    RESET_USER_DETAILS,
    SET_USER_DETAILS_ERROR,
    SET_USER_INVALID_USERNAME,
    SET_USER_INVALID_FIRSTNAME,
    SET_USER_INVALID_LASTNAME,
    SET_USER_INVALID_DISPLAYNAME,
    SET_USER_INVALID_EMAIL,
    SET_USER_INVALID_PHONENUMBER,
    SET_USER_INVALID_ROLES,
    SET_USER_INVALID_IMAGE_FILE,
} from "./actionTypes";

const initialState = {
    data: {
        id: null,
        userName: null,
        displayName: null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        imageSrc: null, //key for image file in S3
        objectStoreFile: null,
        imageFile: null, //user uploaded image to persist
        status: null,
        salutation: null,
        roles: null,
        version: null,
    },
    initial: {
        id: null,
        userName: null,
        displayName: null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        imageSrc: null, //key for image file in S3
        objectStoreFile: null,
        imageFile: null, //user uploaded image to persist
        status: null,
        salutation: null,
        roles: null,
        version: null,
    },
    invalidUserName: false,
    invalidDisplayName: false,
    invalidFirstName: false,
    invalidLastName: false,
    invalidEmail: false,
    invalidPhoneNumber: false,
    invalidRoles: false,
    invalidImageFile: false,
    loading: true,
    error: null,
};

const User = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_USER_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case RESET_USER_DETAILS:
            return {
                ...initialState,
                loading: false,
                error: null,
            };
        case SET_USER_DETAILS_ERROR:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case SET_USER_INVALID_USERNAME:
            return {
                ...state,
                invalidUserName: payload,
                loading: false,
                error: true,
            };
        case SET_USER_INVALID_FIRSTNAME:
            return {
                ...state,
                invalidFirstName: payload,
                loading: false,
                error: true,
            };
        case SET_USER_INVALID_LASTNAME:
            return {
                ...state,
                invalidLastName: payload,
                loading: false,
                error: true,
            };
        case SET_USER_INVALID_DISPLAYNAME:
            return {
                ...state,
                invalidDisplayName: payload,
                loading: false,
                error: true,
            };
        case SET_USER_INVALID_EMAIL:
            return {
                ...state,
                invalidEmail: payload,
                loading: false,
                error: true,
            };
        case SET_USER_INVALID_PHONENUMBER:
            return {
                ...state,
                invalidPhoneNumber: payload,
                loading: false,
                error: true,
            };
        case SET_USER_INVALID_ROLES:
            return {
                ...state,
                invalidRoles: payload,
                loading: false,
                error: true,
            };
        case SET_USER_INVALID_IMAGE_FILE:
            return {
                ...state,
                invalidImageFile: payload.invalidImageFile,
                loading: false,
                error: payload.error,
            };
        default:
            return {
                ...state,
                loading: true,
                error: null,
            };
    }
};

export default User;
