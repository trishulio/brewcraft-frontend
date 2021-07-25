import {
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANIES_SUCCESS,
    FETCH_COMPANIES_FAILURE,
    FETCH_ALL_COMPANIES_SUCCESS,
    FETCH_ALL_COMPANIES_FAILURE,
    FETCH_ALL_COMPANIES_REQUEST,
    SET_COMPANIES_DETAILS
} from "./actionTypes";

const initialState = {
    content: [],
    all: [],
    loading: false,
    error: null,
    selectedCategory: { id: 1, name: "Ingredients" },
    totalItems: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 10
};

const Companies = (state = initialState, { type, payload, data }) => {
    switch (type) {
      case FETCH_COMPANIES_REQUEST:
        return {
          ...state,
          data: null,
          loading: true,
          error: null,
        };
      case FETCH_COMPANIES_SUCCESS:
        return {
          ...state,
          ...data.data,
          loading: false,
          error: null,
        };
      case FETCH_COMPANIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload,
        };
    case FETCH_ALL_COMPANIES_REQUEST:
        return {
            ...state,
            loading: true,
            error: null,
        };
    case FETCH_ALL_COMPANIES_SUCCESS:
        return {
            ...state,
            all: data,
            loading: false,
            error: null,
        };
    case FETCH_ALL_COMPANIES_FAILURE:
        return {
            ...state,
            loading: false,
            error: payload,
        };
    case SET_COMPANIES_DETAILS:
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

export default Companies;