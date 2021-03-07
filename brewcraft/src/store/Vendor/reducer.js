import {
  FETCH_SUPPLIER_REQUEST,
  FETCH_SUPPLIER_SUCCESS,
  FETCH_SUPPLIER_FAILURE,
  FETCH_SUPPLIERS_REQUEST,
  FETCH_SUPPLIERS_SUCCESS,
  FETCH_SUPPLIERS_FAILURE,
  UPDATE_SUPPLIER_REQUEST,
  UPDATE_SUPPLIER_SUCCESS,
  UPDATE_SUPPLIER_FAILURE,
  DELETE_SUPPLIER_REQUEST,
  DELETE_SUPPLIER_SUCCESS,
  DELETE_SUPPLIER_FAILURE,
  FETCH_COMPANIES_REQUEST,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_FAILURE
} from "./actionTypes";
import { cloneDeep, findIndex, get, omit } from "lodash";

const initialState = {
  suppliers: [],
  supplier: null,
  companies: [],
  loading: false
};

const Supplier = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_SUPPLIER_REQUEST:
    case FETCH_SUPPLIERS_REQUEST:
    case UPDATE_SUPPLIER_REQUEST:
    case DELETE_SUPPLIER_REQUEST:
    case FETCH_COMPANIES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_SUPPLIER_SUCCESS:
    case FETCH_SUPPLIER_FAILURE:
      return {
        ...state,
        supplier: { ...payload },
        loading: false
      };
    case FETCH_SUPPLIERS_SUCCESS:
    case FETCH_SUPPLIERS_FAILURE:
      return {
        ...state,
        suppliers: { ...payload },
        loading: false
      };
    case UPDATE_SUPPLIER_SUCCESS:
    case UPDATE_SUPPLIER_FAILURE:
      return {
        ...state,
        supplier: { ...payload },
        loading: false
      };
    case DELETE_SUPPLIER_SUCCESS:
    case DELETE_SUPPLIER_FAILURE:
      return {
        ...state,
        loading: false
      };
    case FETCH_COMPANIES_SUCCESS:
    case FETCH_COMPANIES_FAILURE:
      return {
        ...state,
        companies: { ...payload },
        loading: false
      }
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Supplier;
