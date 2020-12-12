import {
FETCH_VENDOR_REQUEST,
ADD_VENDOR_REQUEST
} from "./actionTypes";

export const fetchVendor = (payload) => ({
  type: FETCH_VENDOR_REQUEST,
  payload: payload,
});
export const createVendorAction = (payload) => ({
  type: ADD_VENDOR_REQUEST,
  payload: payload,
});



