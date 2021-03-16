import { MOCK_TABLE_DATA } from "../../component/Invoice/mock";
import {
  FETCH_PURCHASES_REQUEST,
  FETCH_PURCHASE_REQUEST
} from "./actionTypes";

const initialState = {
  invoices: MOCK_TABLE_DATA
};

const purchases = (state = initialState, { type, payload }) => {

  switch (type) {
    case FETCH_PURCHASES_REQUEST:
      return {
        ...state,
        purchases: payload
      };
    case FETCH_PURCHASE_REQUEST:
      return {
        ...state,
        purchase: payload
      };
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default purchases;
