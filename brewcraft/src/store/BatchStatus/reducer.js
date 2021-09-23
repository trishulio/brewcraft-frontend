import {
    FETCH_BATCH_STATUS_REQUEST,
    FETCH_BATCH_STATUS_SUCCESS,
    FETCH_BATCH_STATUS_FAILURE,
    SET_BATCH_STATUS_DETAILS,
    SET_BATCH_STATUS_PAGE_INDEX,
    SET_BATCH_STATUS_PAGE_SIZE
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

const Statuses = (state = initialState, { type, payload, data }) => {
    switch (type) {
      case FETCH_BATCH_STATUS_REQUEST:
        return {
          ...state,
          data: null,
          loading: true,
          error: null,
        };
      case FETCH_BATCH_STATUS_SUCCESS:
        return {
          ...state,
          ...data.data,
          loading: false,
          error: null,
        };
      case FETCH_BATCH_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: payload,
        };
    case SET_BATCH_STATUS_DETAILS:
    case SET_BATCH_STATUS_PAGE_INDEX:
    case SET_BATCH_STATUS_PAGE_SIZE:
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

export default Statuses;