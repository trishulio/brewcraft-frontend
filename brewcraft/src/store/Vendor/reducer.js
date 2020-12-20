import {
  FETCH_VENDOR_REQUEST,
  FETCH_VENDOR_SUCCESS,
  FETCH_VENDOR_FAILURE,
  ADD_VENDOR_REQUEST,
  ADD_VENDOR_SUCCESS,
  ADD_VENDOR_FAILURE,
  EDIT_VENDOR_REQUEST,
  EDIT_VENDOR_SUCCESS,
  EDIT_VENDOR_FAILURE,
  DELETE_VENDOR_REQUEST,
  DELETE_VENDOR_SUCCESS,
  DELETE_VENDOR_FAILURE,
  ADD_VENDOR_CONTACT_REQUEST,
  ADD_VENDOR_CONTACT_SUCCESS,
  ADD_VENDOR_CONTACT_FAILURE,
  EDIT_VENDOR_CONTACT_REQUEST,
  EDIT_VENDOR_CONTACT_SUCCESS,
  EDIT_VENDOR_CONTACT_FAILURE,
  DELETE_VENDOR_CONTACT_REQUEST,
  DELETE_VENDOR_CONTACT_SUCCESS,
  DELETE_VENDOR_CONTACT_FAILURE,
} from "./actionTypes";
import { cloneDeep } from "lodash";

const initialState = {
  data: {},
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
      return {
        ...state,
        loading: false,
        error: true,
        message: payload,
      };
    case ADD_VENDOR_REQUEST:
    case EDIT_VENDOR_REQUEST:
    case DELETE_VENDOR_REQUEST:
    case ADD_VENDOR_CONTACT_REQUEST:
    case EDIT_VENDOR_CONTACT_REQUEST:
    case DELETE_VENDOR_CONTACT_REQUEST:
      return {
        ...state,
        formLoading: { ...state.formLoading, loading: true, error: false },
      };
    case ADD_VENDOR_SUCCESS: {
      const stateOld = cloneDeep(state.data);
      console.log(stateOld);
      return {
        ...state,
      };
    }
    case EDIT_VENDOR_SUCCESS: {
      const stateOld = cloneDeep(state.data);
      console.log(EDIT_VENDOR_SUCCESS);
      return {
        ...state,
      };
    }
    case DELETE_VENDOR_SUCCESS: {
      const stateOld = cloneDeep(state.data);
      console.log(DELETE_VENDOR_SUCCESS);
      return {
        ...state,
      };
    }
    case ADD_VENDOR_CONTACT_SUCCESS: {
      console.log(payload);
      return {
        ...state,
        formLoading: { ...state.formLoading, loading: true, error: false },
      };
    }
    case EDIT_VENDOR_CONTACT_SUCCESS: {
      console.log("EDIT_VENDOR_CONTACT_SUCCESS");
      return {
        ...state,
        formLoading: { ...state.formLoading, loading: false, error: false },
      };
    }
    case DELETE_VENDOR_CONTACT_SUCCESS: {
      console.log("DELETE_VENDOR_CONTACT_SUCCESS");
      return {
        ...state,
        formLoading: { ...state.formLoading, loading: false, error: false },
      };
    }
    case ADD_VENDOR_FAILURE:
    case EDIT_VENDOR_FAILURE:
    case DELETE_VENDOR_FAILURE:
    case ADD_VENDOR_CONTACT_FAILURE:
    case EDIT_VENDOR_CONTACT_FAILURE:
    case DELETE_VENDOR_CONTACT_FAILURE:
      return {
        ...state,
        formLoading: {
          ...state.formLoading,
          loading: false,
          error: true,
          message: payload,
        },
      };
    default:
      state = { ...state };
      break;
  }
  return state;
};
export default Vendor;
