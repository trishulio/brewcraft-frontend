import {
    FETCH_SUPPLIERS_REQUEST,
    FETCH_SUPPLIERS_SUCCESS,
    FETCH_SUPPLIERS_FAILURE,
    FETCH_ALL_SUPPLIERS_SUCCESS,
    FETCH_ALL_SUPPLIERS_FAILURE,
    FETCH_ALL_SUPPLIERS_REQUEST,
    SET_SUPPLIERS_DETAILS
} from "./actionTypes";

const initialState = {
    content: [],
    all: [],
    loading: false,
    error: null,
    selectedCompany: "",
    totalElements: 0,
    totalItems: 0,
    pageIndex: 0,
    pageSize: 10
};

const Suppliers = (state = initialState, { type, payload, data }) => {
    switch (type) {
      case FETCH_SUPPLIERS_REQUEST:
        return {
          ...state,
          data: null,
          loading: true,
          error: null,
        };
      case FETCH_ALL_SUPPLIERS_SUCCESS:
      case FETCH_SUPPLIERS_SUCCESS:
        return {
          ...state,
          ...data.data,
          loading: false,
          error: null,
        };
      case FETCH_SUPPLIERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload,
        };
    case FETCH_ALL_SUPPLIERS_REQUEST:
        return {
            ...state,
            loading: true,
            error: null,
        };
    case FETCH_ALL_SUPPLIERS_FAILURE:
        return {
            ...state,
            loading: false,
            error: payload,
        };
    case SET_SUPPLIERS_DETAILS:
      return {
        ...state,
        ...payload,
        loading: false,
        error: null
      };
    default:
        return {
            ...state,
            loading: true,
            error: null
        }
    }
}

export default Suppliers;