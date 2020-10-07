import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_INVOICE_REQUEST,
  FETCH_INVOICE_SUCCESS,
  FETCH_INVOICE_FAILURE,
  ADD_INVOICE_REQUEST,
  ADD_INVOICE_SUCCESS,
  ADD_INVOICE_FAILURE,
  EDIT_INVOICE_REQUEST,
  EDIT_INVOICE_SUCCESS,
  EDIT_INVOICE_FAILURE,
  DELETE_INVOICE_REQUEST,
  DELETE_INVOICE_SUCCESS,
} from "./actionTypes";
import {get, omit} from 'lodash'


function* addInvoice(action) {
  let dailogStatus = get(action,'payload');
  const id  = yield Math.random();
  
  // yield put({
  //   type: ADD_INVOICE_SUCCESS,
  //   payload: {
  //     id: id,
  //     invoice_id:3,
  //     status: "status test",
  //     due: "due test",
  //     date: "date test",
  //     number: "number test",
  //     customer: "customer test",
  //     amount_due: "amount_due test",
  //     delivery_date: "delivery_date test",
  //     payment_date: "payment_date test",
  //     unpaid:false,
  //     paid:true,
  //   } 
  // });
  console.log(dailogStatus);

    // yield call(get(dailogStatus,'sFn'),{success:true, message:"done!"});
}

function* editInvoice(action) {
  yield put({ type: EDIT_INVOICE_SUCCESS, payload: { ...action.payload } });
}


function* deleteInvoice(action) {
  yield put({ type: DELETE_INVOICE_SUCCESS, payload: { ...action.payload } });

}

export default function* Invoice() {
  yield takeLatest(ADD_INVOICE_REQUEST, addInvoice);
  yield takeLatest(EDIT_INVOICE_REQUEST, editInvoice);
  yield takeLatest(DELETE_INVOICE_REQUEST, deleteInvoice);
}
