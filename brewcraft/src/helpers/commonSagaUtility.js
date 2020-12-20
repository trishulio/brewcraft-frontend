import { put } from "redux-saga/effects";
import {get} from "lodash";
function* withouHeader(response,header, success, fail) {
  try {
    let { status, message, data } = response;
    if (status === header) {
      yield put({ type: get(success, "redux"), payload: data });
      if(get(success, "snack")){
        console.log("working");
    }
} else {
    yield put({ type: get(fail, "redux"), payload: data });
    if(get(success, "snack")){
        console.log("working error ");
      }
    }
  } catch (error) {
    console.log(error);
    // yield put({type:fail, payload:})
  }
}

function* commonResponseHanderlGet(response, success, fail) {
  yield withouHeader(response,200, success, fail)
}
function* commonResponseHanderlCreated(response, success, fail) {
  yield withouHeader(response,201, success, fail) 
}
export { commonResponseHanderlGet,commonResponseHanderlCreated };
