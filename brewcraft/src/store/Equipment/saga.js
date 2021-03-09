import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_FACILITIES_REQUEST,
  FETCH_FACILITIES_SUCCESS,
  FETCH_FACILITIES_FAILURE,
  ADD_FACILITIES_REQUEST,
  ADD_FACILITIES_SUCCESS,
  ADD_FACILITIES_FAILURE,
  ADD_EQUIPMENTS_REQUEST,
  ADD_EQUIPMENTS_SUCCESS,
  ADD_EQUIPMENTS_FAILURE,
  EDIT_EQUIPMENTS_REQUEST,
  EDIT_EQUIPMENTS_SUCCESS,
  EDIT_EQUIPMENTS_FAILURE,
} from "./actionTypes";
import { get, omit } from "lodash";
import { FACILITIES } from "../../helpers/url";
import AxiosInstance from "../../helpers/axiosInstance";
import { SUCCESS, ERROR } from "../../helpers/snackHelper";
import {
  commonResponseHanderlGet,
  commonResponseHanderlCreated,
} from "../../helpers/commonSagaUtility";

async function fetchfetchFacilitiesRequest() {
  return await AxiosInstance.get(FACILITIES)
    .then((r) => r)
    .catch((error) => console.log(error));
}
function* fetchFacilities() {
  let response = yield call(fetchfetchFacilitiesRequest);
  yield call(
    commonResponseHanderlGet,
    response,
    { redux: FETCH_FACILITIES_SUCCESS },
    { redux: FETCH_FACILITIES_FAILURE, snack: ERROR }
  );
}

/**
 * @description ADD FACILITIES
 */

async function addFacilitiesRequest(payload) {
  return await AxiosInstance.post(FACILITIES, payload)
    .then((r) => r)
    .catch((error) => console.log(error));
}
function* addFacilities(action) {
  let response = yield call(addFacilitiesRequest, get(action, "payload.form"));
  yield call(
    commonResponseHanderlCreated,
    response,
    {
      redux: ADD_FACILITIES_SUCCESS,
      success: get(action, "payload.successFn"),
      snack: SUCCESS,
    },
    { redux: ADD_FACILITIES_FAILURE, snack: ERROR }
  );
}

/**
 * @description ADD Equipment
 */

async function addEquipmentRequest(payload) {
  return await AxiosInstance.post(
    `${FACILITIES}\\${get(payload, "equipmentId")}\\equipment`,
    omit(payload, ["equipmentId"])
  )
    .then((r) => r)
    .catch((error) => console.log(error));
}
function* addEquipment(action) {
  let response = yield call(addEquipmentRequest, get(action, "payload.form"));
  yield call(
    commonResponseHanderlCreated,
    response,
    {
      redux: ADD_EQUIPMENTS_SUCCESS,
      success: get(action, "payload.successFn"),
      snack: SUCCESS,
    },
    { redux: ADD_EQUIPMENTS_FAILURE, snack: ERROR }
  );
}

/**
 * @description EDIT Facilities
 */
async function editEquipmentRequest(payload) {
  return await AxiosInstance.put(`${FACILITIES}\\${get(payload, "equipmentId")}\\equipment\\${get(payload,'id')}`,omit(payload, ["equipmentId","id"]))
    .then((r) => r)
    .catch((error) => console.log(error));
}
function* editEquipment(action) {
  let response = yield call(editEquipmentRequest, get(action, "payload.form"));
  yield call(
    commonResponseHanderlGet,
    response,
    {
      redux: EDIT_EQUIPMENTS_SUCCESS,
      success: get(action, "payload.successFn"),
      snack: SUCCESS,
    },
    { redux: EDIT_EQUIPMENTS_FAILURE, snack: ERROR }
  );
}

export default function* Equipment() {
  yield takeLatest(FETCH_FACILITIES_REQUEST, fetchFacilities);
  yield takeLatest(ADD_FACILITIES_REQUEST, addFacilities);
  yield takeLatest(ADD_EQUIPMENTS_REQUEST, addEquipment);
  yield takeLatest(EDIT_EQUIPMENTS_REQUEST, editEquipment);
}
