import {
    FETCH_MEASURE_REQUEST,
    FETCH_MEASURE_SUCCESS,
    FETCH_MEASURE_FAILURE,
    SET_MEASURE_DETAILS,
    SET_MEASURE_PAGE_INDEX,
    SET_MEASURE_PAGE_SIZE
} from "./actionTypes";

const initialState = {
    content: [],
    loading: false,
    error: null,
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20
};

const Measures = (state = initialState, { type, payload, data }) => {
    switch (type) {
      case FETCH_MEASURE_REQUEST:
        return {
          ...state,
          data: null,
          loading: true,
          error: null,
        };
      case FETCH_MEASURE_SUCCESS:
        return {
          ...state,
          ...data.data,
          loading: false,
          error: null,
        };
      case FETCH_MEASURE_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload,
        };
    case SET_MEASURE_DETAILS:
    case SET_MEASURE_PAGE_INDEX:
    case SET_MEASURE_PAGE_SIZE:
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

export default Measures;