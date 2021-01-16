import { call, put, takeLatest } from "redux-saga/effects";
import AxiosInstance from "../../helpers/axiosInstance";
import { get, omit } from "lodash";
import { apiResponse, SUCCESS, ERROR } from "../../helpers/snackHelper";
import {
  commonResponseHanderlGet,
  commonResponseHanderlCreated,
} from "../../helpers/commonSagaUtility";
import { SUPPLIERS } from "../../helpers/url";
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

/**
 * @description FETCH VENDOR LIST
 *
 */
async function fetchVendorsRequest() {
  return await AxiosInstance.get(SUPPLIERS)
    .then((r) => r)
    .catch((error) => console.log(error));
}
function* fetchVendors() {
  let response = yield call(fetchVendorsRequest);
  yield call(
    commonResponseHanderlGet,
    response,
    { redux: FETCH_VENDOR_SUCCESS },
    { redux: FETCH_VENDOR_FAILURE, snack: ERROR }
  );
}

/**
 * @description ADD VENDOR
 */

async function addVendorRequest(payload) {
  return await AxiosInstance.post(SUPPLIERS, payload)
    .then((r) => r)
    .catch((error) => console.log(error));
}

function* addVendor(action) {
  yield call(
    commonResponseHanderlCreated,
    yield call(addVendorRequest, get(action, "payload.form")),
    {
      redux: ADD_VENDOR_SUCCESS,
      success: get(action, "payload.successFn"),
      snack: SUCCESS,
    },
    { redux: ADD_VENDOR_FAILURE, snack: ERROR }
  );
}

/**
 * @description ADD VENDOR  CONTACT
 */

async function addVendorContactRequest(payload) {
  return await AxiosInstance.post(
    `${SUPPLIERS}\\${get(payload, "supplier")}\\contacts`,
    omit(payload, "supplier")
  )
    .then((r) => r)
    .catch((error) => console.log(error));
}
function* addVendorContact(action) {
  let response = yield call(
    addVendorContactRequest,
    get(action, "payload.form")
  );
  yield call(
    commonResponseHanderlCreated,
    response,
    {
      redux: ADD_VENDOR_CONTACT_SUCCESS,
      success: get(action, "payload.successFn"),
      snack: SUCCESS,
    },
    { redux: ADD_VENDOR_CONTACT_FAILURE, snack: ERROR },
    { supplier: get(action, "payload.form.supplier") }
  );
}

export default function* Vendors() {
  yield takeLatest(FETCH_VENDOR_REQUEST, fetchVendors);
  yield takeLatest(ADD_VENDOR_REQUEST, addVendor);
  yield takeLatest(ADD_VENDOR_CONTACT_REQUEST, addVendorContact);
}
