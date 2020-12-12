import {
  FETCH_VENDOR_REQUEST,
  FETCH_VENDOR_SUCCESS,
  FETCH_VENDOR_FAILURE,
  ADD_VENDOR_REQUEST,
  ADD_VENDOR_SUCCESS,
  ADD_VENDOR_FAILURE,
} from "./actionTypes";
import {cloneDeep} from "lodash"; 

const initialState = {
  data: [
    {
      cname: "Tiger Nixon",
      contact: "System Architect",
      email: "Edinburgh",
      phone: "2011/04/25",
      id:1,
      address: "Product 1 description Product 1 description ",
      c_id:1
    },
    {
      cname: "Garrett Winters",
      contact: "Accountant",
      email: "Tokyo",
      phone: "2011/07/25",
      id:2,
      address: "Product 1 description Product 1 description ",
      c_id:2
    },
    {
      cname: "Ashton Cox",
      contact: "Junior Technical Author",
      email: "San Francisco",
      phone: "2009/01/12",
      id:3,
      address: "Product 1 description Product 1 description ",
      c_id:3
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
      {
        const stateOld =  cloneDeep(state.data);
        stateOld.push(payload);
        console.log(stateOld);
        return {
          ...state,
          data:[...stateOld],
          loading: true,
        };
      }
      
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Vendor;
