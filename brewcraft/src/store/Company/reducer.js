import {
  FETCH_COMPANY_REQUEST,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY_FAILURE,
  ADD_COMPANY_REQUEST,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAILURE
} from "./actionTypes";

const initialState = {
  data: [
    {
      cname: "Tiger Nixon",
      id:121,
     
    },
    {
      cname: "Tiger Nixon 1",
      id:1212,
     
    },
    {
      cname: "Tiger Nixon 2",
      id:1213,
     
    },
    {
      cname: "Tiger Nixon 3",
      id:1214,
     
    },
    {
      cname: "Tiger Nixon 4",
      id:1215,
     
    },
    {
      cname: "Tiger Nixon 5",
      id:1216,
     
    }
  ],
  loading: false,
  error: null,
  formLoading: {
    loading: false,
    error: false,
    message: "",
  },
};

const Company = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_COMPANY_REQUEST:
    case ADD_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...payload },
      };
    case FETCH_COMPANY_FAILURE:
    case ADD_COMPANY_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: payload,
      };
    case ADD_COMPANY_SUCCESS:
      return {
        ...state,
        loading: true,
      };
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Company;
