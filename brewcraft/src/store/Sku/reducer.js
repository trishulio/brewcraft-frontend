import {
  SET_SKU_DETAILS,
  INVALID_DESCRIPTION
} from "./actionTypes";

const initialState = {
  data: {
    id: "",
    name: "",
    description: "",
    product: {},
    materials: [],
    quantity: {
      value: ""
    },
    version: null
  },
  initial: {
    id: "",
    name: "",
    description: "",
    product: {},
    materials: [],
    quantity: {
      value: ""
    },
    version: null
  },
  loading: true,
  error: null
};

const Sku = (state = initialState, { type, payload }) => {
  switch (type) {
    case INVALID_DESCRIPTION:
    case SET_SKU_DETAILS:
      return {
        ...state,
        ...payload,
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

export default Sku;