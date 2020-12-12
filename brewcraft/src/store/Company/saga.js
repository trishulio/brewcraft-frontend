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

  // let { Data, Message, Error} = yield call(fetchCompanyRequest);
  yield put({type:FETCH_COMPANY_SUCCESS})

}


function* addCompany(action) {
  yield console.log(action);
  yield put({type:ADD_COMPANY_SUCCESS})
  yield call(get(action,'payload.successFn'))

}

export default function* Company() {
  yield takeLatest(FETCH_COMPANY_REQUEST, fetchCompany);
  yield takeLatest(ADD_COMPANY_REQUEST, addCompany);
}
