import {
  FETCH_FACILITY_REQUEST,
  FETCH_FACILITIES_REQUEST,
  FETCH_FACILITIES_SUCCESS,
  FETCH_FACILITIES_FAILURE,
  CREATE_FACILITY_REQUEST,
  UPDATE_FACILITY_REQUEST,
  DELETE_FACILITY_REQUEST,

  FETCH_EQUIPMENT_REQUEST,
  FETCH_EQUIPMENT_SUCCESS,
  FETCH_EQUIPMENT_FAILURE,
  FETCH_EQUIPMENT_ITEM_REQUEST,
  FETCH_EQUIPMENT_ITEM_SUCCESS,
  FETCH_EQUIPMENT_ITEM_FAILURE,
  CREATE_EQUIPMENT_ITEM_REQUEST,
  UPDATE_EQUIPMENT_ITEM_REQUEST,
  DELETE_EQUIPMENT_ITEM_REQUEST,
} from "./actionTypes";

const initialState = {
  equipment: [],
  facilities: [],
  loading: false
};

const Equipment = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_FACILITY_REQUEST:
    case CREATE_FACILITY_REQUEST:
    case UPDATE_FACILITY_REQUEST:
    case DELETE_FACILITY_REQUEST:
    case FETCH_FACILITIES_REQUEST:
    case FETCH_EQUIPMENT_ITEM_REQUEST:
    case FETCH_EQUIPMENT_REQUEST:
    case CREATE_EQUIPMENT_ITEM_REQUEST:
    case UPDATE_EQUIPMENT_ITEM_REQUEST:
    case DELETE_EQUIPMENT_ITEM_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_FACILITIES_SUCCESS:
    case FETCH_FACILITIES_FAILURE:
      return {
        ...state,
        facilities: payload,
        loading: false
      };
    case FETCH_EQUIPMENT_SUCCESS:
    case FETCH_EQUIPMENT_FAILURE:
      return {
        ...state,
        equipment: payload,
        loading: false
      };
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Equipment;
