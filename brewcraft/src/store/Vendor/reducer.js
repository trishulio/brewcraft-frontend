import {
  FETCH_VENDOR_REQUEST,
  FETCH_VENDOR_SUCCESS,
  FETCH_VENDOR_FAILURE,
  ADD_VENDOR_REQUEST,
  ADD_VENDOR_SUCCESS,
  ADD_VENDOR_FAILURE,
} from "./actionTypes";

const initialState = {
  data: [
    {
      id: 1,
      label: "Vendor 1",
      address: "Product 1 description Product 1 description ",
    },
    {
      id: 2,
      label: "Vendor 2",
      address: "Product 1 description Product 1 description ",
    },
    {
      id: 3,
      label: "Vendor 3",
      address: "Product 1 description Product 1 description ",
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

const Vendor = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_VENDOR_REQUEST:
    case ADD_VENDOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_VENDOR_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...payload },
      };
    case FETCH_VENDOR_FAILURE:
    case ADD_VENDOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: payload,
      };
    case ADD_VENDOR_SUCCESS:
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

export default Vendor;
