import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_FACILITIES_REQUEST,
  FETCH_FACILITIES_SUCCESS,
  FETCH_FACILITIES_FAILURE,
  FETCH_EQUIPMENT_REQUEST,
  FETCH_EQUIPMENT_SUCCESS,
  FETCH_EQUIPMENT_FAILURE,
  CREATE_FACILITY_REQUEST,
  DELETE_FACILITY_REQUEST,

  FETCH_EQUIPMENT_ITEM_REQUEST,
  FETCH_EQUIPMENT_ITEM_SUCCESS,
  FETCH_EQUIPMENT_ITEM_FAILURE,
  CREATE_EQUIPMENT_ITEM_REQUEST,
  CREATE_EQUIPMENT_ITEM_SUCCESS,
  CREATE_EQUIPMENT_ITEM_FAILURE,
  UPDATE_EQUIPMENT_ITEM_REQUEST,
  UPDATE_EQUIPMENT_ITEM_SUCCESS,
  UPDATE_EQUIPMENT_ITEM_FAILURE,
  DELETE_EQUIPMENT_ITEM_REQUEST,
  DELETE_EQUIPMENT_ITEM_SUCCESS,
  DELETE_EQUIPMENT_ITEM_FAILURE
} from "./actionTypes";
import { get, omit } from "lodash";
import AxiosInstance from "../../helpers/axiosInstance";

async function fetchFacilitiesRequest() {
  return await AxiosInstance.get("/api/v1/facilities");
}

function* fetchFacilities() {
  try {
    let response = yield call(fetchFacilitiesRequest);
    yield put({ type: FETCH_FACILITIES_SUCCESS, payload: response.data.content });
  }
  catch (e) {
    yield put({ type: FETCH_FACILITIES_FAILURE, payload: [] });
  }
}

async function fetchEquipmentRequest() {
  return await AxiosInstance.get("/api/v1/facilities/equipment");
}

function* fetchEquipment() {
  try {
    let response = yield call(fetchEquipmentRequest);
    yield put({ type: FETCH_EQUIPMENT_SUCCESS, payload: response.data.content });
  }
  catch (e) {
    yield put({ type: FETCH_EQUIPMENT_FAILURE, payload: [] });
  }
}

async function fetchEquipmentItemRequest(id) {
  return await AxiosInstance.get("/api/v1/facilities/equipment/" + id);
}

function* fetchEquipmentItem(action) {
  try {
    let response = yield call(fetchEquipmentItemRequest, action.payload.id);
    yield put({ type: FETCH_EQUIPMENT_ITEM_SUCCESS, payload: response.data });
    action.payload.success && action.payload.success(response.data);
  }
  catch (e) {
    yield put({ type: FETCH_EQUIPMENT_ITEM_FAILURE, payload: [] });
  }
}

async function addFacilitiesRequest(payload) {
  return await AxiosInstance.post("/api/v1/facilities", payload)
}
function* addFacilities(action) {
  let response = yield call(addFacilitiesRequest, get(action, "payload.form"));
}

async function createEquipmentItemRequest(facilityId, data) {
  return await AxiosInstance.post(`/api/v1/facilities/${facilityId}/equipment`, data);
}

function* createEquipmentItem(action) {
  const maxCapacity = action.payload.maxCapacity || {};
  const data = {
    name: action.payload.name,
    type: action.payload.type,
    status: "Active",
    maxCapacity: {
      symbol: maxCapacity.symbol,
      value: maxCapacity.value
    }
  };
  try {
    yield call(createEquipmentItemRequest, action.payload.facility, data);
    yield put({ type: CREATE_EQUIPMENT_ITEM_SUCCESS });
    action.payload.success && action.payload.success();
  } catch (e) {
    yield put({ type: CREATE_EQUIPMENT_ITEM_FAILURE });
  }
}

async function editEquipmentItemRequest(facilityId, equipmentId, data) {
  return await AxiosInstance.put(`/api/v1/facilities/${facilityId}/equipment/${equipmentId}`, data);
}

function* editEquipment(action) {
  const maxCapacity = action.payload.maxCapacity || {};
  const data = {
    name: action.payload.name,
    type: action.payload.type,
    status: "Active",
    maxCapacity: {
      symbol: maxCapacity.symbol,
      value: maxCapacity.value
    },
    version: action.payload.version + 1
  };
  debugger;
  try {
    yield call(editEquipmentItemRequest, action.payload.facility.id, action.payload.id, data);
    yield put({ type: UPDATE_EQUIPMENT_ITEM_SUCCESS });
    action.payload.success && action.payload.success(data);
  } catch (e) {
    yield put({ type: UPDATE_EQUIPMENT_ITEM_FAILURE });
  }
}

async function deleteEquipmentItemRequest(id) {
  return await AxiosInstance.delete("/api/v1/facilities/equipment/" + id);
}

function* deleteEquipmentItem(action) {
  try {
    yield call(deleteEquipmentItemRequest, action.payload.id);
    action.payload.success && action.payload.success();
  } catch (e) {

  }
}

function* deleteFacility(action) {

}

export default function* Equipment() {
  yield takeLatest(FETCH_FACILITIES_REQUEST, fetchFacilities);
  yield takeLatest(CREATE_FACILITY_REQUEST, addFacilities);
  yield takeLatest(DELETE_FACILITY_REQUEST, deleteFacility);
  yield takeLatest(FETCH_EQUIPMENT_REQUEST, fetchEquipment);
  yield takeLatest(FETCH_EQUIPMENT_ITEM_REQUEST, fetchEquipmentItem);
  yield takeLatest(CREATE_EQUIPMENT_ITEM_REQUEST, createEquipmentItem);
  yield takeLatest(UPDATE_EQUIPMENT_ITEM_REQUEST, editEquipment);
  yield takeLatest(DELETE_EQUIPMENT_ITEM_REQUEST, deleteEquipmentItem);
}
