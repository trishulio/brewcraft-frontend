import { call, put, takeLatest } from "redux-saga/effects";
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
} from "./actionTypes";
import Axios from "axios";

const fetchrequest = function () {
  // return Axios.get('enter your server url')
  return true;
};

function* fetchCustomers() {
  const result = yield call(fetchrequest);
}

//
function postContact(formData) {
  // dummy api calling remove this functiona, run Ajax/Axios call, return result
  // return { Data:formData, Message:"successfull", Error:null }
}

function* addContact(action) {
  // uncomment when put axios request

  // let { Data, Message, Error} = yield call(postContact(action.payload));

  // if(Error){

  //     yield put({type:ADD_CONTACTS_FAILURE, payload:Message})

  // }else{

  //     yield put({type: ADD_CONTACTS_SUCCESS, payload:Data})

  // }
  // console.log({...action.payload, id:Math.random()});

  yield put({
    type: ADD_CONTACTS_SUCCESS,
    payload: { ...action.payload, id: Math.random() },
  });
}
//
function putContact(formData) {
  // dummy api calling remove this functiona, run Ajax/Axios call, return result
  // return { Data:formData, Message:"successfull", Error:null }
}

function* editContact(action) {
  // uncomment when put axios request

  // let { Data, Message, Error} = yield call(putContact(action.payload));

  // if(Error){

  //     yield put({type:ADD_CONTACTS_FAILURE, payload:Message})

  // }else{

  //     yield put({type: ADD_CONTACTS_SUCCESS, payload:Data})

  // }
  // console.log({...action.payload, id:Math.random()});

  yield put({ type: EDIT_CONTACTS_SUCCESS, payload: { ...action.payload } });
}
//
function delContact(formData) {
  // dummy api calling remove this functiona, run Ajax/Axios call, return result
  // return { Data:formData, Message:"successfull", Error:null }
}

function* deleteContact(action) {
  // uncomment when put axios request

  // let { Data, Message, Error} = yield call(putContact(action.payload));

  // if(Error){

  //     yield put({type:ADD_CONTACTS_FAILURE, payload:Message})

  // }else{

  //     yield put({type: ADD_CONTACTS_SUCCESS, payload:Data})

  // }
  // console.log({...action.payload, id:Math.random()});

  yield put({ type: DELETE_CONTACTS_SUCCESS, payload: { ...action.payload } });

}

export default function* Customers() {
  yield takeLatest(FETCH_CONTACTS_REQUEST, fetchCustomers);
  yield takeLatest(ADD_CONTACTS_REQUEST, addContact);
  yield takeLatest(EDIT_CONTACTS_REQUEST, editContact);
  yield takeLatest(DELETE_CONTACTS_REQUEST, deleteContact);
}
