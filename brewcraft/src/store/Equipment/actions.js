import {
  FETCH_FACILITIES_REQUEST,
  FETCH_FACILITY_REQUEST,
  CREATE_FACILITY_REQUEST,
  UPDATE_FACILITY_REQUEST,
  DELETE_FACILITY_REQUEST,

  FETCH_EQUIPMENT_REQUEST,
  FETCH_EQUIPMENT_ITEM_REQUEST,
  CREATE_EQUIPMENT_ITEM_REQUEST,
  UPDATE_EQUIPMENT_ITEM_REQUEST,
  DELETE_EQUIPMENT_ITEM_REQUEST
} from "./actionTypes";

export const fetchEquipment = () => ({
  type: FETCH_EQUIPMENT_REQUEST
});

export const fetchEquipmentItem = payload => ({
  type: FETCH_EQUIPMENT_ITEM_REQUEST,
  payload: payload
});

export const createEquipmentItem = payload => ({
  type: CREATE_EQUIPMENT_ITEM_REQUEST,
  payload: payload
});

export const updateEquipmentItem = payload => ({
  type: UPDATE_EQUIPMENT_ITEM_REQUEST,
  payload: payload
});

export const deleteEquipmentItem = payload => ({
  type: DELETE_EQUIPMENT_ITEM_REQUEST,
  payload: payload
});

export const fetchFacilities = () => ({
  type: FETCH_FACILITIES_REQUEST
});

export const fetchFacility = payload => ({
  type: FETCH_FACILITY_REQUEST,
  payload: payload
});

export const createFacility = payload => ({
  type: CREATE_FACILITY_REQUEST,
  payload: payload
});

export const updateFacility = payload => ({
  type: UPDATE_FACILITY_REQUEST,
  payload: payload
});

export const deleteFacilities = (payload) => ({
  type: DELETE_FACILITY_REQUEST,
  payload:payload
});