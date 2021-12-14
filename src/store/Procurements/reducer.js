import {
    FETCH_PROCUREMENTS_REQUEST,
    FETCH_PROCUREMENTS_SUCCESS,
    FETCH_PROCUREMENTS_FAILURE,
    FETCH_ALL_PROCUREMENTS_SUCCESS,
    FETCH_ALL_PROCUREMENTS_FAILURE,
    FETCH_ALL_PROCUREMENTS_REQUEST,
    SET_PROCUREMENTS_DETAILS,
    SET_PROCUREMENTS_PAGE_INDEX,
    SET_PROCUREMENTS_PAGE_SIZE
} from "./actionTypes";

const initialState = {
    content: [],
    all: [],
    loading: false,
    error: null,
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20
};

const Procurements = (state = initialState, { type, payload, data }) => {
    switch (type) {
      case FETCH_PROCUREMENTS_REQUEST:
        return {
          ...state,
          data: null,
          loading: true,
          error: null,
        };
      case FETCH_PROCUREMENTS_SUCCESS:
        return {
          ...state,
          ...data.data,
          loading: false,
          error: null,
        };
      case FETCH_PROCUREMENTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload,
        };
    case FETCH_ALL_PROCUREMENTS_REQUEST:
        return {
            ...state,
            loading: true,
            error: null,
        };
    case FETCH_ALL_PROCUREMENTS_SUCCESS:
        return {
            ...state,
            all: data.data.content,
            loading: false,
            error: null,
        };
    case FETCH_ALL_PROCUREMENTS_FAILURE:
        return {
            ...state,
            loading: false,
            error: payload,
        };
    case SET_PROCUREMENTS_DETAILS:
    case SET_PROCUREMENTS_PAGE_INDEX:
    case SET_PROCUREMENTS_PAGE_SIZE:
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

export default Procurements;