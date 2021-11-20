import {
  SET_PRODUCTS,
  SET_PRODUCTS_PAGE_INDEX,
  SET_PRODUCTS_PAGE_SIZE,
  SET_PRODUCTS_CLASS,
  SET_PRODUCTS_TYPE,
  SET_PRODUCTS_STYLE
} from "./actionTypes";

const initialState = {
  content: [],
  all: [],
  totalElements: 0,
  totalPages: 0,
  pageIndex: 0,
  pageSize: 20
};

const Products = (state = initialState, { type, payload }) => {
    switch (type) {
      case SET_PRODUCTS:
        return {
          ...state,
          ...payload,
          loading: false,
          error: null,
        };
      case SET_PRODUCTS_CLASS:
      case SET_PRODUCTS_TYPE:
      case SET_PRODUCTS_STYLE:
      case SET_PRODUCTS_PAGE_INDEX:
      case SET_PRODUCTS_PAGE_SIZE:
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

export default Products;