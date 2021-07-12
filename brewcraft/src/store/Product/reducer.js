import {
  INVALID_NAME,
  INVALID_CLASS,
  INVALID_TYPE,
  INVALID_STYLE,
  INVALID_DESCRIPTION,
  SET_PRODUCT_DETAILS,
  RESET_PRODUCT_DETAILS
} from "./actionTypes";

const initialState = {
  data: {
    id: null,
    name: "",
    description: "",
    productClass: null,
    style: null,
    type: null,
    targetMeasures: [],
    version: null
  },
  initialProduct: {
    id: null,
    name: "",
    description: "",
    productClass: null,
    style: null,
    type: null,
    targetMeasures: [],
    version: null
  },
  status: null,
  color: "info",
  type: null,
  invalidName: false,
  invalidClass: false,
  invalidType: false,
  invalidStyle: false,
  invalidDescription: false,
  redirect: false,
  loading: true,
  error: null
};

const Product = (state = initialState, { type, payload }) => {
  switch (type) {
    case INVALID_NAME:
    case INVALID_CLASS:
    case INVALID_TYPE:
    case INVALID_STYLE:
    case INVALID_DESCRIPTION:
    case SET_PRODUCT_DETAILS:
      return {
        ...state,
        ...payload,
        data: {
          ...state.data,
          ...payload.data
        },
        redirect: state.redirect,
        loading: false,
        error: null,
      };
    case RESET_PRODUCT_DETAILS:
      return {
        ...initialState,
        redirect: state.redirect,
        loading: false,
        error: null
      };
    default:
      return {
        ...state,
        redirect: false,
        loading: true,
        error: null,
      };
  }
};

export default Product;