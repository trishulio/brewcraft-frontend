import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_VENDOR_REQUEST,
  FETCH_VENDOR_SUCCESS,
  FETCH_VENDOR_FAILURE,
  ADD_VENDOR_REQUEST,
  ADD_VENDOR_SUCCESS,
  ADD_VENDOR_FAILURE
 } from "./actionTypes";
import AxiosInstance from "../../helpers/axiosInstance"
import {SUPPLIERS} from "../../helpers/url"
import {attempt,get, omit} from 'lodash'


function fetchVendorsRequest() {
  return AxiosInstance.get(SUPPLIERS)
}

function* fetchVendors() {
 
  let { Data, Message, error} = yield call(fetchVendorsRequest);
  console.log(error);

  // if(error){

  //     yield put({type:FETCH_VENDOR_SUCCESS, payload:"working"})

  // }else{

  //     yield put({type: FETCH_VENDOR_FAILURE, payload:"working"})

  // }
 
}

function addVendorRequest(payload) {
  return AxiosInstance.post(SUPPLIERS, payload)
}

function* addVendor(action) {
 
  let { Data, Message, Error} = yield call(addVendorRequest(action.payload));

  if(Error){

      yield put({type:ADD_VENDOR_SUCCESS, payload:Message})

  }else{

      yield put({type: ADD_VENDOR_FAILURE, payload:Data})

  }
 
}

export default function* Vendors() {
  yield takeLatest(FETCH_VENDOR_REQUEST, fetchVendors);
  yield takeLatest(ADD_VENDOR_REQUEST, addVendor);
}
