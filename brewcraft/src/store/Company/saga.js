import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_COMPANY_REQUEST,
  FETCH_COMPANY_SUCCESS,
  FETCH_COMPANY_FAILURE,
  ADD_COMPANY_REQUEST,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAILURE
 } from "./actionTypes";
import AxiosInstance from "../../helpers/axiosInstance"
import {SUPPLIERS} from "../../helpers/url"
import {attempt,get, omit} from 'lodash'


function fetchCompanyRequest() {
  return AxiosInstance.get(SUPPLIERS)
}

function* fetchCompany() {
 
  let { Data, Message, Error} = yield call(fetchCompanyRequest);

  if(Error){

      // yield put({type:FETCH_COMPANY_SUCCESS, payload:"working"})





  }else{

      yield put({type: FETCH_COMPANY_FAILURE, payload:"working"})

  }
 
}

// function addVendorRequest(payload) {
//   return AxiosInstance.post(SUPPLIERS, payload)
// }

function* addCompany(action) {
 yield console.log(action);

  // let { Data, Message, Error} = yield call(addVendorRequest(action.payload));

  // if(Error){

  //     yield put({type:ADD_VENDOR_SUCCESS, payload:Message})

  // }else{

  //     yield put({type: ADD_VENDOR_FAILURE, payload:Data})

  // }
 
}

export default function* Company() {
  yield takeLatest(FETCH_COMPANY_REQUEST, fetchCompany);
  yield takeLatest(ADD_COMPANY_REQUEST, addCompany);
}
