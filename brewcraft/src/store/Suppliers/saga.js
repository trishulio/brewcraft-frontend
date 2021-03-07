import { call, put, takeLatest } from "redux-saga/effects";
import AxiosInstance from "../../helpers/axiosInstance";
import { get } from "lodash";
import { apiResponse, SUCCESS, ERROR } from "../../helpers/snackHelper";
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
  DELETE_SUPPLIER_FAILURE,
  FETCH_COMPANIES_REQUEST,
  FETCH_COMPANIES_SUCCESS,
  FETCH_COMPANIES_FAILURE
} from "./actionTypes";

async function fetchSuppliersRequest() {
  // API refers to companies as suppliers
  return await AxiosInstance.get("/api/suppliers/contacts");
}

function* fetchSuppliers() {
  try {
    let response = yield call(fetchSuppliersRequest);
    yield put({ type: FETCH_SUPPLIERS_SUCCESS, payload: response.data.supplierContacts });
  } catch (e) {
    yield put ({ type: FETCH_SUPPLIERS_FAILURE, payload: [] });
  }
}

const fetchSupplierRequest = async (id) => {
  return await AxiosInstance.get(`/api/suppliers/contacts/${id}`);
};

function* fetchSupplier(action) {
  try {
    const data = yield call(fetchSupplierRequest, get(action, "payload.id"));
    yield put({ type: FETCH_SUPPLIER_SUCCESS, payload: data.data });
    action.payload.success && action.payload.success(data.data);
  } catch (e) {
    yield put ({ type: FETCH_SUPPLIER_FAILURE, payload: null });
  }
}

const createSupplierRequest = async (companyId, data) => {
  // API refers to companies as suppliers
  return await AxiosInstance.post(`/api/suppliers/${companyId}/contacts`, data);
};

function* createSupplier(action) {
  debugger;
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

const updateSupplierRequest = async (companyId, contactId, data) => {
  // API refers to companies as suppliers
  return await AxiosInstance.put(`/api/suppliers/${companyId}/contacts/${contactId}`, data);
};

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
    yield call(updateSupplierRequest, action.payload.supplier, action.payload.id, data);
    yield put({ type: UPDATE_SUPPLIER_SUCCESS });
    action.payload.success && action.payload.success();
  } catch (e) {
    yield put ({ type: UPDATE_SUPPLIER_FAILURE });
  }
}



async function deleteSupplierRequest(contactId) {
  // API refers to companies as suppliers
  return await AxiosInstance.delete("/api/suppliers/contacts/" + contactId);
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

async function fetchCompaniesRequest() {
  // API refers to companies as suppliers
  return await AxiosInstance.get("/api/suppliers");
}

function* fetchCompanies() {
  try {
    const response = yield call(fetchCompaniesRequest);
    yield put({ type: FETCH_COMPANIES_SUCCESS, payload: response.data.suppliers });
  } catch (e) {
    yield put ({ type: FETCH_COMPANIES_FAILURE, payload: [] });
  }
}

export default function* Suppliers() {
  yield takeLatest(FETCH_SUPPLIER_REQUEST, fetchSupplier);
  yield takeLatest(FETCH_SUPPLIERS_REQUEST, fetchSuppliers);
  yield takeLatest(CREATE_SUPPLIER_REQUEST, createSupplier);
  yield takeLatest(UPDATE_SUPPLIER_REQUEST, updateSupplier);
  yield takeLatest(DELETE_SUPPLIER_REQUEST, deleteSupplier);
  yield takeLatest(FETCH_COMPANIES_REQUEST, fetchCompanies);
}
