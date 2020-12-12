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


async function fetchVendorsRequest() {
  return await AxiosInstance.get(SUPPLIERS)
}

function* fetchVendors() {
  
 try{
   
  let response = yield call(fetchVendorsRequest);
  let {StatusCode, Message, Data} = response.Data 

  if(StatusCode --- 200){
 
      yield put({type:FETCH_VENDOR_SUCCESS, payload:Data})
 
  }else{
 
      yield put({type: FETCH_VENDOR_FAILURE, payload:2})
 
  }
 }catch(error){

  console.log(error);

 }

 
}

async function addVendorRequest(payload) {

  return await AxiosInstance.post(SUPPLIERS, payload)

}

function* addVendor(action) {
  
  
  yield put({type:ADD_VENDOR_SUCCESS, payload:{...get(action,'payload.form'),id:Math.random()*1000, c_id:1} });
  yield call(get(action,'payload.successFn'));
  // once api ready you can use bellow comments code 
//  try{

//    let { Data, Message, Error} = yield call(addVendorRequest(get(action,'payload.form')));
   
//    if(Error){
     
//      yield put({type:ADD_VENDOR_SUCCESS, payload:Message})
     
//     }else{
      
//       yield put({type: ADD_VENDOR_FAILURE, payload:Data})
      
//     }
//   }catch(e){

//   }
 
}

export default function* Vendors() {
  yield takeLatest(FETCH_VENDOR_REQUEST, fetchVendors);
  yield takeLatest(ADD_VENDOR_REQUEST, addVendor);
}
