import {
FETCH_VENDOR_REQUEST,
ADD_VENDOR_REQUEST,
EDIT_VENDOR_REQUEST,
DELETE_VENDOR_REQUEST,
ADD_VENDOR_CONTACT_REQUEST,
EDIT_VENDOR_CONTACT_REQUEST,
DELETE_VENDOR_CONTACT_REQUEST
} from "./actionTypes";

export const fetchVendor = (payload) => ({
  type: FETCH_VENDOR_REQUEST,
  payload: payload,
});
export const addVendor = (payload) => ({
  type: ADD_VENDOR_REQUEST,
  payload: payload,
});
export const editVendor = (payload) => ({
  type: EDIT_VENDOR_REQUEST,
  payload: payload,
});
export const deleteVendor = (payload) => ({
  type: DELETE_VENDOR_REQUEST,
  payload: payload,
});
export const addVendorContact = (payload) => ({
  type: ADD_VENDOR_CONTACT_REQUEST,
  payload: payload,
});
export const editVendorContact = (payload) => ({
  type: EDIT_VENDOR_CONTACT_REQUEST,
  payload: payload,
});
export const deleteVendorContact = (payload) => ({
  type: DELETE_VENDOR_CONTACT_REQUEST,
  payload: payload,
});
