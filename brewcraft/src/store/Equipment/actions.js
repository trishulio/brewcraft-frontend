import {
  FETCH_FACILITIES_REQUEST,
  ADD_FACILITIES_REQUEST,
  ADD_EQUIPMENTS_REQUEST,
  EDIT_EQUIPMENTS_REQUEST,
  FETCH_EQUIPMENTS_REQUEST
} from "./actionTypes";

export const getFacilities = () => ({
  type: FETCH_FACILITIES_REQUEST
});
export const saveFacilities = (payload) => ({
  type: ADD_FACILITIES_REQUEST,
  payload:payload
});
export const getEquipment = (payload) => ({
  type: FETCH_EQUIPMENTS_REQUEST,
  payload: payload,
});
export const saveEquipment = (payload) => ({
  type: ADD_EQUIPMENTS_REQUEST,
  payload: payload,
});
export const editEquipment = (payload) => ({
  type: EDIT_EQUIPMENTS_REQUEST,
  payload: payload,
});
