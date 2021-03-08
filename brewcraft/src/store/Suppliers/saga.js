import { call, put, takeLatest } from "redux-saga/effects";
import { get } from "lodash";
import {
  FETCH_SUPPLIER_REQUEST,
  FETCH_SUPPLIER_SUCCESS,
  FETCH_SUPPLIER_FAILURE,
  FETCH_SUPPLIERS_REQUEST,
  FETCH_SUPPLIERS_SUCCESS,
  FETCH_SUPPLIERS_FAILURE,
  CREATE_SUPPLIER_REQUEST,
  CREATE_SUPPLIER_SUCCESS,
  CREATE_SUPPLIER_FAILURE,
  UPDATE_SUPPLIER_REQUEST,
  UPDATE_SUPPLIER_SUCCESS,
  UPDATE_SUPPLIER_FAILURE,
  DELETE_SUPPLIER_REQUEST,
  DELETE_SUPPLIER_SUCCESS,
  DELETE_SUPPLIER_FAILURE
} from "./actionTypes";
import {
  fetchSupplierRequest,
  fetchSuppliersRequest,
  createSupplierRequest,
  updateSupplierRequest,
  deleteSupplierRequest
} from "./api";

function* fetchSuppliers() {
  try {
    let response = yield call(fetchSuppliersRequest);
    yield put({ type: FETCH_SUPPLIERS_SUCCESS, payload: response.data.supplierContacts });
  } catch (e) {
    yield put ({ type: FETCH_SUPPLIERS_FAILURE, payload: [] });
  }
}

function* fetchSupplier(action) {
  try {
    const data = yield call(fetchSupplierRequest, get(action, "payload.id"));
    yield put({ type: FETCH_SUPPLIER_SUCCESS, payload: data.data });
    action.payload.success && action.payload.success(data.data);
  } catch (e) {
    yield put ({ type: FETCH_SUPPLIER_FAILURE, payload: null });
  }
}

function* createSupplier(action) {
  try {
    const data = {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      position: action.payload.position || "",
      email: action.payload.email,
      phoneNumber: action.payload.phoneNumber
    };
    yield call(createSupplierRequest, action.payload.supplier, data);
    yield put({ type: CREATE_SUPPLIER_SUCCESS });
    action.payload.success && action.payload.success();
  } catch (e) {
    yield put ({ type: CREATE_SUPPLIER_FAILURE });
  }
}

function* updateSupplier(action) {
  try {
    const data = {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      position: action.payload.position || "",
      email: action.payload.email,
      phoneNumber: action.payload.phoneNumber,
      version: action.payload.version,
    };
    yield call(updateSupplierRequest, action.payload.supplier.id, action.payload.id, data);
    yield put({ type: UPDATE_SUPPLIER_SUCCESS });
    action.payload.success && action.payload.success();
  } catch (e) {
    yield put ({ type: UPDATE_SUPPLIER_FAILURE });
  }
}

function* deleteSupplier(action) {
  try {
    yield call(deleteSupplierRequest, action.payload.id);
    yield put({ type: DELETE_SUPPLIER_SUCCESS });
    action.payload.success && action.payload.success();
  } catch (e) {
    yield put ({ type: DELETE_SUPPLIER_FAILURE });
  }
}

export default function* Suppliers() {
  yield takeLatest(FETCH_SUPPLIER_REQUEST, fetchSupplier);
  yield takeLatest(FETCH_SUPPLIERS_REQUEST, fetchSuppliers);
  yield takeLatest(CREATE_SUPPLIER_REQUEST, createSupplier);
  yield takeLatest(UPDATE_SUPPLIER_REQUEST, updateSupplier);
  yield takeLatest(DELETE_SUPPLIER_REQUEST, deleteSupplier);
}
