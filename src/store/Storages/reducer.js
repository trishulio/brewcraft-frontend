import { filter, map } from "lodash";
import {
  FETCH_STORAGES_REQUEST,
  FETCH_STORAGES_SUCCESS,
  CREATE_STORAGES_REQUEST,
  CREATE_STORAGES_SUCCESS,
  UPDATE_STORAGES_REQUEST,
  UPDATE_STORAGES_SUCCESS,
  DELETE_STORAGES_REQUEST,
  DELETE_STORAGES_SUCCESS
} from "./actionTypes";

const initialState = {
  data: [],
};

const Storages = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_STORAGES_REQUEST:
    case CREATE_STORAGES_REQUEST:
    case UPDATE_STORAGES_REQUEST:
    case DELETE_STORAGES_REQUEST:
      return {
        ...state,
        payload: payload,
      };
    case FETCH_STORAGES_SUCCESS:
      return {
        ...state,
        data: [...payload],
      };
    case CREATE_STORAGES_SUCCESS:
      return {
        ...state,
        data: [...state.data, { ...payload }],
      };
    case DELETE_STORAGES_SUCCESS: {
      const filterData = filter(state.data, (o) => o.id !== payload);
      return {
        ...state,
        data: filterData,
      };
    }
    case UPDATE_STORAGES_SUCCESS: {
      const filterData = map(state.data, (o) => {
        if (o.id !== payload.id) {
          return o;
        } else {
          return payload;
        }
      });
      return {
        ...state,
        data: filterData,
      };
    }

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Storages;
