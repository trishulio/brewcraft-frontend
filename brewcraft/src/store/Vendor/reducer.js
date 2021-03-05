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
import { cloneDeep, findIndex, get, omit } from "lodash";

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
        data: { ...payload },
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
      const suppliers = cloneDeep(get(state, "data.suppliers", []));
      suppliers.push(payload);
      return {
        ...state,
        data: {
          ...state.data,
          suppliers: [...suppliers],
        },
      };
    }
    case EDIT_VENDOR_SUCCESS: {
      const stateOld = cloneDeep(state.data);
      return {
        ...state,
      };
    }
    case DELETE_VENDOR_SUCCESS: {
      const stateOld = cloneDeep(state.data);
      return {
        ...state,
      };
    }
    case ADD_VENDOR_CONTACT_SUCCESS: {
      const suppliers = cloneDeep(get(state, "data.suppliers", []));
      const indexOf = findIndex(
        get(state, "data.suppliers"),
        (o) => o.id === parseInt(get(payload, "supplier"))
      );
      if (indexOf !== -1) {
        suppliers[indexOf]["contacts"].push(omit(payload, "supplier"));
      }
      return {
        ...state,
        data: {
          ...state.data,
          suppliers: [...suppliers],
        },
        formLoading: { ...state.formLoading, loading: false, error: false },
      };
    }
    case EDIT_VENDOR_CONTACT_SUCCESS: {
      return {
        ...state,
        formLoading: { ...state.formLoading, loading: false, error: false },
      };
    }
    case DELETE_VENDOR_CONTACT_SUCCESS: {
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
