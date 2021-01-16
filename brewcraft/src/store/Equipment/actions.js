import {
  ADD_EQUIPMENTS_REQUEST,
  EDIT_EQUIPMENTS_REQUEST,
  FETCH_EQUIPMENTS_REQUEST 
} from "./actionTypes";

export const getEquipments = (payload) => ({
  type: FETCH_EQUIPMENTS_REQUEST,
  payload: payload,
});
export const saveEquipments = (payload) => ({
  type: ADD_EQUIPMENTS_REQUEST,
  payload: payload,
});
export const editEquipments = (payload) => ({
  type: EDIT_EQUIPMENTS_REQUEST,
  payload: payload,
});
