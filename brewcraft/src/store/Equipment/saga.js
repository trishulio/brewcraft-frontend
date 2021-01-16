import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_EQUIPMENTS_REQUEST,FETCH_EQUIPMENTS_SUCCESS,
FETCH_EQUIPMENTS_FAILURE,ADD_EQUIPMENTS_REQUEST,
ADD_EQUIPMENTS_SUCCESS,ADD_EQUIPMENTS_FAILURE,
EDIT_EQUIPMENTS_REQUEST,EDIT_EQUIPMENTS_SUCCESS,
EDIT_EQUIPMENTS_FAILURE
} from "./actionTypes";
import {attempt,get, omit} from 'lodash'
import {EQUIPMENT} from "../../helpers/url";
import AxiosInstance from "../../helpers/axiosInstance"
import { apiResponse, SUCCESS, ERROR } from "../../helpers/snackHelper";
import {
  commonResponseHanderlGet,
  commonResponseHanderlCreated,
} from "../../helpers/commonSagaUtility";


async function fetchEquipmentsRequest() {
    return await AxiosInstance.get(EQUIPMENT)
      .then((r) => r)
      .catch((error) => console.log(error));
  }
  function* fetchEquipments() {
    let response = yield call(fetchEquipmentsRequest);
    yield call(
      commonResponseHanderlGet,
      response,
      { redux: FETCH_EQUIPMENTS_SUCCESS },
      { redux: FETCH_EQUIPMENTS_FAILURE, snack: ERROR }
    );
  }

export default function* Equipments() {

yield takeLatest(FETCH_EQUIPMENTS_REQUEST, fetchEquipments )
    
}
