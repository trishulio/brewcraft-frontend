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
      label: "Company Name",
      field: "cname",
      sort: "asc",
      width: 150,
    },
    {
      label: "Contact",
      field: "contact",
      sort: "asc",
      width: 270,
    },
    {
      label: "Phone",
      field: "phone",
      sort: "asc",
      width: 200,
    },
    {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 200,
    },
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
