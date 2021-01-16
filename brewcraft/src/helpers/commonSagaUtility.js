import { call, put } from "redux-saga/effects";
import {get} from "lodash";
import { apiResponse} from "./snackHelper";
function* withouHeader(response,header, success, fail, formData) {
  try {
    
    let { status, message, data } = response;
    
    if (status === header) {
      yield put({ type: get(success, "redux"), payload: {...data, ...(formData && {...formData} )}});
      yield get(success, "success") && call(get(success, "success"));
      yield get(success, "snack") && call(apiResponse,get(success, "snack"));

} else {
    
  
    yield put({ type: get(fail, "redux"), payload: data });
    yield get(fail, "snack") && call(apiResponse,get(fail, "snack"));
    
    }
  } catch (error) {

    yield get(fail, "snack") && call(apiResponse,get(fail, "snack"));

  }
}

function* commonResponseHanderlGet(response, success, fail,formData) {
  yield withouHeader(response,200, success, fail,formData)
}
function* commonResponseHanderlCreated(response, success, fail,formData) {
  yield withouHeader(response,201, success, fail, formData) 
}
export { commonResponseHanderlGet,commonResponseHanderlCreated };
