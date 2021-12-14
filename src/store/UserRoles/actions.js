import {
    FETCH_USER_ROLES,
    FETCH_ALL_USER_ROLES,
    SET_USER_ROLES,
    SET_USER_ROLES_PAGE_INDEX,
    SET_USER_ROLES_PAGE_SIZE
} from "./actionTypes";

export const setUserRoles = userRoles => ({
    type: SET_USER_ROLES,
    payload: userRoles
});

export const fetchUserRoles = ({pageIndex, pageSize, ids, success}) => ({
    type: FETCH_USER_ROLES,
    payload: {pageIndex, pageSize, ids, success}
});

export const fetchAllUserRoles = params => ({
    type: FETCH_ALL_USER_ROLES,
    payload: {
        success: params?.success
    }
});

export const setUserRolesPageIndex = index => ({
    type: SET_USER_ROLES_PAGE_INDEX,
    payload: {
        pageIndex: index
    }
});

export const setUserRolesPageSize = size => ({
    type: SET_USER_ROLES_PAGE_SIZE,
    payload: {
        pageSize: size
    }
});