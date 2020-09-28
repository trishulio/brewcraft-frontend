import {
  ADD_CONTACTS_REQUEST,
  EDIT_CONTACTS_REQUEST,
  DELETE_CONTACTS_REQUEST,
} from "./actionTypes";

export const saveContact = (payload) => ({
  type: ADD_CONTACTS_REQUEST,
  payload: payload,
});

export const editContact = (payload) => ({
  type: EDIT_CONTACTS_REQUEST,
  payload: payload,
});

export const deleteContact = (payload) => ({
  type: DELETE_CONTACTS_REQUEST,
  payload: payload,
});
