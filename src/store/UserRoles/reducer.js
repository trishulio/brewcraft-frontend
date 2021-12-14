import {
    SET_USER_ROLES,
    SET_ALL_USER_ROLES,
    SET_USER_ROLES_PAGE_INDEX,
    SET_USER_ROLES_PAGE_SIZE
  } from "./actionTypes";

  const initialState = {
    content: [],
    data: [],
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20,
    loading: true,
    error: null
  };

  const UserRoles = (state = initialState, { type, payload }) => {
    switch (type) {
      case SET_USER_ROLES_PAGE_INDEX:
      case SET_USER_ROLES_PAGE_SIZE:
        return {
          ...state,
          ...payload,
          loading: false,
          error: null
        };
      case SET_USER_ROLES:
        return {
          ...state,
          ...payload,
          loading: false,
          error: null,
        };
      case SET_ALL_USER_ROLES:
        return {
          ...state,
          ...payload,
          loading: false,
          error: null
        }
      default:
        return {
          ...state,
          loading: true,
          error: null,
        };
    }
  };

  export default UserRoles;