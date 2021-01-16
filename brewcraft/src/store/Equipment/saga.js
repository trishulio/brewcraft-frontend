import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_EQUIPMENTS_REQUEST,FETCH_EQUIPMENTS_SUCCESS,
FETCH_EQUIPMENTS_FAILURE,ADD_EQUIPMENTS_REQUEST,
ADD_EQUIPMENTS_SUCCESS,ADD_EQUIPMENTS_FAILURE,
EDIT_EQUIPMENTS_REQUEST,EDIT_EQUIPMENTS_SUCCESS,
EDIT_EQUIPMENTS_FAILURE
} from "./actionTypes";
import {attempt,get, omit} from 'lodash'
import {EQUIPMENT} from "../../helpers/url";

function* fetchEquipments(){
    yield put({type:FETCH_EQUIPMENTS_SUCCESS})
}

export default function* Equipments() {

yield takeLatest(FETCH_EQUIPMENTS_REQUEST, fetchEquipments )
    
}
