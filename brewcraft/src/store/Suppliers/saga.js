import {put, takeEvery, select} from "redux-saga/effects";
import {setData} from "./actions";
import {GET_SUPPLIERS_DATA, CREATE_SUPPLIER, DELETE_SUPPLIER, UPDATE_SUPPLIER} from "./actionTypes";
import {closeModal} from "../modal/modal-actions";
import {batch} from "react-redux";

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* getSuppliersData() {
  yield delay(150);
  yield put(setData([
    {
      name: 'Gayane',
      email: 'avetisyan72@yahoo.com',
      directDeposit: 'Not avaible',
      actions: 'Create Bill',
      id: 1,
    }
  ]));
}

export function* createSupplier(action) {
  const data = action.payload;
  const tableData = yield select(state => state.suppliers.rows);
  yield delay(500);
  yield put(setData([...tableData, { ...data, id: 2 }]));
  yield put(closeModal());
}

export function* deleteSupplier(action) {
  const id = action.payload;
  const tableData = yield select(state => state.suppliers.rows);
  yield delay(500);
  const index = tableData.findIndex(row => row.id === id);
  yield put(setData([...tableData.slice(0, index), ...tableData.slice(index + 1)]));
  yield put(closeModal());
}


export function* updateSupplier(action) {
  const formData = action.payload;
  const tableData = yield select(state => state.suppliers.rows);
  yield delay(500);
  const data = {
    name: formData.name,
    email: formData.email,
    id: formData.id,
    directDeposit: formData.directDeposit,
    actions: formData.actions,
  }
  const index = tableData.findIndex(row => row.id === formData.id);
  yield put(setData([...tableData.slice(0, index), data, ...tableData.slice(index + 1)]))
  yield put(closeModal());
}



export default function* Suppliers() {
  yield takeEvery(GET_SUPPLIERS_DATA, getSuppliersData);
  yield takeEvery(CREATE_SUPPLIER, createSupplier);
  yield takeEvery(DELETE_SUPPLIER, deleteSupplier);
  yield takeEvery(UPDATE_SUPPLIER, updateSupplier)
}
