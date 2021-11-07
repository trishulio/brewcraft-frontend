import {
  SET_SKUS,
  SET_SKUS_PAGE_INDEX,
  SET_SKUS_PAGE_SIZE
} from "./actionTypes";

const initialState = {
  content: [],
  all: [],
  totalElements: 0,
  totalPages: 0,
  pageIndex: 0,
  pageSize: 20
};

const Skus = (state = initialState, { type, payload }) => {
    switch (type) {
      case SET_SKUS:
        return {
          ...state,
          ...payload,
          loading: false,
          error: null,
        };
      case SET_SKUS_PAGE_INDEX:
      case SET_SKUS_PAGE_SIZE:
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

export default Skus;