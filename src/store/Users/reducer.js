import {
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_ERROR,
    FETCH_ALL_USERS_SUCCESS,
    FETCH_ALL_USERS_REQUEST,
    SET_USERS_DETAILS,
    SET_USERS_PAGE_INDEX,
    SET_USERS_PAGE_SIZE,
    SET_USERS_SELECTED_COMPANY,
} from "./actionTypes";

const initialState = {
    content: [],
    all: [],
    loading: false,
    error: null,
    totalElements: 0,
    totalItems: 0,
    pageIndex: 0,
    pageSize: 20,
};

const Users = (state = initialState, { type, payload, data }) => {
    switch (type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                data: null,
                loading: true,
                error: null,
            };
        case FETCH_ALL_USERS_SUCCESS:
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                ...data.data,
                loading: false,
                error: null,
            };
        case FETCH_USERS_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case FETCH_ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SET_USERS_PAGE_INDEX:
        case SET_USERS_PAGE_SIZE:
        case SET_USERS_DETAILS:
        case SET_USERS_SELECTED_COMPANY:
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

export default Users;
