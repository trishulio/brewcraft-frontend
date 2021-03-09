import {
  FETCH_SUPPLIER_REQUEST,
  FETCH_SUPPLIERS_REQUEST,
  CREATE_SUPPLIER_REQUEST,
  UPDATE_SUPPLIER_REQUEST,
  DELETE_SUPPLIER_REQUEST
} from "./actionTypes";

export const fetchSupplier = payload => ({
  type: FETCH_SUPPLIER_REQUEST,
  payload: payload
});

export const fetchSuppliers = () => ({
  type: FETCH_SUPPLIERS_REQUEST
});

export const createSupplier = payload => ({
  type: CREATE_SUPPLIER_REQUEST,
  payload: payload
});

export const updateSupplier = payload => ({
  type: UPDATE_SUPPLIER_REQUEST,
  payload: payload
});

export const deleteSupplier = payload => ({
  type: DELETE_SUPPLIER_REQUEST,
  payload: payload
});