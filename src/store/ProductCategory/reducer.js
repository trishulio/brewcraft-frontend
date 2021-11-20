import {
  INVALID_NAME,
  INVALID_CLASS,
  INVALID_TYPE,
  INVALID_STYLE,
  INVALID_DESCRIPTION,
  SET_PRODUCT_CATEGORY_DETAILS
} from "./actionTypes";

const initialState = {
  data: {
    id: null,
    name: "",
    parentCategoryId: null,
    version: null
  },
  initial: {
    id: null,
    name: "",
    parentCategoryId: null,
    version: null
  },
  status: null,
  color: "info",
  type: null,
  invalidName: false,
  invalidClass: false,
  invalidType: false,
  invalidDescription: false,
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
    case SET_PRODUCT_CATEGORY_DETAILS:
      return {
        ...state,
        ...payload,
        data: {
          ...state.data,
          ...payload.data
        },
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

export default Product;