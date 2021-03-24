import { call, put, takeLatest } from "redux-saga/effects";
import { get } from "lodash";
import {
  FETCH_CONTACTS_REQUEST,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILURE,
  ADD_CONTACTS_REQUEST,
  ADD_CONTACTS_SUCCESS,
  ADD_CONTACTS_FAILURE,
  EDIT_CONTACTS_REQUEST,
  EDIT_CONTACTS_SUCCESS,
  EDIT_CONTACTS_FAILURE,
  DELETE_CONTACTS_REQUEST,
  DELETE_CONTACTS_SUCCESS,
  FETCH_CONTACT_REQUEST,
  FETCH_CONTACT_FAILURE,
  FETCH_CONTACT_SUCCESS,
  DELETE_CONTACTS_FAILURE,
} from "./actionTypes";

import {
  fetchContactRequest,
  fetchContactsRequest,
  createContactRequest,
  updateContactRequest,
  deleteContactRequest
} from "./api";
import { snackFailure, snackSuccess } from "../Snackbar/actions";



function* fetchContacts() {
    try {
      const data = yield call(fetchContactsRequest);
      yield put({ type: FETCH_CONTACTS_SUCCESS, payload: data.data });
    } catch (e) {
      yield put ({ type: FETCH_CONTACTS_FAILURE, payload: null });
      yield put(snackFailure());
    }
}


function* fetchContact(action) {
  try {
    const data = yield call(fetchContactRequest,get(action, "payload.id"));
    yield put({ type: FETCH_CONTACT_SUCCESS, payload: data.data });
    action.payload.success && action.payload.success(data.data);
  } catch (e) {
    yield put ({ type: FETCH_CONTACT_FAILURE, payload: null });
    yield put(snackFailure());
  }
}

function* addContact(action) {
  try {
    const data = {
      firstName: action.payload.firstName,
      lastName: action.payload.lastName,
      position: action.payload.position || "",
      email: action.payload.email,
      phoneNumber: action.payload.phoneNumber
    };
    yield call(createContactRequest, data);
    yield put({ type: ADD_CONTACTS_SUCCESS });
    action.payload.success && action.payload.success();
    yield put(snackSuccess());
  } catch (e) {
    yield put ({ type: ADD_CONTACTS_FAILURE });
    yield put(snackFailure());
  }
}

function* editContact(action) {
  const address = action.payload.address || {};
  const data = {
      address: {
          addressLine1: address.addressLine1,
          addressLine2: address.addressLine2,
          country: address.country,
          province: address.province,
          city: address.city,
          postalCode: address.postalCode
      },
      contacts: action.payload.contacts || [],
      name: action.payload.name,
      version: action.payload.version
  };
  try {
      yield call(updateContactRequest, action.payload.id, data);
      yield put({ type: EDIT_CONTACTS_SUCCESS });
      action.payload.success && action.payload.success();
      yield put(snackSuccess());
  } catch (e) {
      yield put ({ type: EDIT_CONTACTS_FAILURE });
      yield put(snackFailure());
  }
}

function* deleteContact(action) {
  try {
    yield call(deleteContactRequest, action.payload.id);
    yield put({ type: DELETE_CONTACTS_SUCCESS });
    action.payload.success && action.payload.success();
    yield put(snackSuccess());
} catch (e) {
    yield put ({ type: DELETE_CONTACTS_FAILURE });
    yield put(snackFailure());
}

}

export default function* Customers() {
  yield takeLatest(FETCH_CONTACTS_REQUEST, fetchContacts);
  yield takeLatest(FETCH_CONTACT_REQUEST, fetchContact);
  yield takeLatest(ADD_CONTACTS_REQUEST, addContact);
  yield takeLatest(EDIT_CONTACTS_REQUEST, editContact);
  yield takeLatest(DELETE_CONTACTS_REQUEST, deleteContact);
}
