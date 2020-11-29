import { FETCH_COMPANY_REQUEST, ADD_COMPANY_REQUEST } from "./actionTypes";

export const fetchCompany = (payload) => ({
  type: FETCH_COMPANY_REQUEST,
  payload: payload,
});
export const saveCompany = (payload) => ({
  type: ADD_COMPANY_REQUEST,
  payload: payload,
});
