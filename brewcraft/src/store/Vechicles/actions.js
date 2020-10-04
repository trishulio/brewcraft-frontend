import {
  ADD_VECHICLE_REQUEST,
  EDIT_VECHICLE_REQUEST,
  DELETE_VECHICLE_REQUEST
} from "./actionTypes";

export const saveVechicle = (payload) => ({
  type: ADD_VECHICLE_REQUEST,
  payload: payload,
});

export const editVechicle = (payload) => ({
  type: EDIT_VECHICLE_REQUEST,
  payload: payload,
});

export const deleteVechicle = (payload) => ({
  type: DELETE_VECHICLE_REQUEST,
  payload: payload,
});


