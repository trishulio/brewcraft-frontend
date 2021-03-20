import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_FACILITIES_REQUEST,
  FETCH_FACILITIES_SUCCESS,
  FETCH_FACILITIES_FAILURE,

  CREATE_FACILITY_REQUEST,
  CREATE_FACILITY_FAILURE,
  CREATE_FACILITIY_SUCCESS,

  DELETE_FACILITY_REQUEST,
  DELETE_FACILITIY_SUCCESS,
  DELETE_FACILITY_FAILURE,

  UPDATE_FACILITY_REQUEST,
  UPDATE_FACILITIY_SUCCESS,
  UPDATE_FACILITY_FAILURE,

  FETCH_EQUIPMENT_REQUEST,
  FETCH_EQUIPMENT_SUCCESS,
  FETCH_EQUIPMENT_FAILURE,
  
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
import {
  TOGGLE_PRELOADER
} from "../layout/actionTypes";
import { get, omit } from "lodash";
import AxiosInstance from "../../helpers/axiosInstance";
import { snackFailure, snackSuccess } from "../Snackbar/actions";

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
    yield put(snackFailure());
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
    yield put(snackFailure());
  }
}

async function addFacilitiesRequest(payload) {
  return await AxiosInstance.post("/api/v1/facilities", payload)
}
function* addFacilities(action) {
  
  try {
    let response = yield call(addFacilitiesRequest, get(action, "payload.formData"));
    yield put({ type: CREATE_FACILITIY_SUCCESS, payload: response.data });
    yield call(action.payload.success);
  }
  catch (e) {
    yield put({ type: CREATE_FACILITY_FAILURE, payload: [] });
  }
}
async function updateFacilitiesRequest(payload) {
  return await AxiosInstance.patch(`/api/v1/facilities/${payload.id}`,omit(payload,'id'))
}
function* updateFacilities(action) {
  
  try {
    
    let response = yield call(updateFacilitiesRequest, get(action, "payload.formData"));
    yield put({ type:  UPDATE_FACILITIY_SUCCESS, payload: response.data });
    yield call(action.payload.success);
  }
  catch (e) {
    yield put({ type: UPDATE_FACILITY_FAILURE, payload: [] });
  }
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
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: CREATE_EQUIPMENT_ITEM_FAILURE });
    yield put(snackFailure());
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
  try {
    yield call(editEquipmentItemRequest, action.payload.facility.id, action.payload.id, data);
    yield put({ type: UPDATE_EQUIPMENT_ITEM_SUCCESS });
    action.payload.success && action.payload.success(data);
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: UPDATE_EQUIPMENT_ITEM_FAILURE });
    yield put(snackFailure());
  }
}

async function deleteEquipmentItemRequest(id) {
  return await AxiosInstance.delete("/api/v1/facilities/equipment/" + id);
}

function* deleteEquipmentItem(action) {
  try {
    yield call(deleteEquipmentItemRequest, action.payload.id);
    yield put({ type: DELETE_EQUIPMENT_ITEM_SUCCESS });
    action.payload.success && action.payload.success();
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: DELETE_EQUIPMENT_ITEM_FAILURE });
    yield put(snackFailure());
  }
}
async function deleteFacilityRequest(id) {
  return await AxiosInstance.delete(`/api/v1/facilities/${id}`);
}
function* deleteFacilityItem(action) {
  try {
    yield call(deleteFacilityRequest, action.payload.id);
    yield put({ type: DELETE_FACILITIY_SUCCESS, payload:get(action,"payload.id") });
    action.payload.success && action.payload.success();
  } catch (e) {
    yield put({ type: DELETE_FACILITY_FAILURE });
  }
}



export default function* Equipment() {
  yield takeLatest(FETCH_FACILITIES_REQUEST, fetchFacilities);
  yield takeLatest(CREATE_FACILITY_REQUEST, addFacilities);
  yield takeLatest(UPDATE_FACILITY_REQUEST, updateFacilities);
  yield takeLatest(DELETE_FACILITY_REQUEST, deleteFacilityItem);
  yield takeLatest(FETCH_EQUIPMENT_REQUEST, fetchEquipment);
  yield takeLatest(FETCH_EQUIPMENT_ITEM_REQUEST, fetchEquipmentItem);
  yield takeLatest(CREATE_EQUIPMENT_ITEM_REQUEST, createEquipmentItem);
  yield takeLatest(UPDATE_EQUIPMENT_ITEM_REQUEST, editEquipment);
  yield takeLatest(DELETE_EQUIPMENT_ITEM_REQUEST, deleteEquipmentItem);
}
