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

export const fetchUserRoles = ({pageIndex, pageSize, ids}) => ({
    type: FETCH_USER_ROLES,
    payload: {pageIndex, pageSize, ids}
});

export const fetchAllUserRoles = () => ({
    type: FETCH_ALL_USER_ROLES,
    payload: { }
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