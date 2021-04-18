import { filter, findIndex, cloneDeep } from "lodash";
import {
  FETCH_FACILITY_REQUEST,
  FETCH_FACILITIES_REQUEST,
  FETCH_FACILITIES_SUCCESS,
  FETCH_FACILITIES_FAILURE,
  CREATE_FACILITY_REQUEST,
  UPDATE_FACILITY_REQUEST,
  UPDATE_FACILITIY_SUCCESS,
  UPDATE_FACILITY_FAILURE,
  DELETE_FACILITY_REQUEST,
  CREATE_FACILITIY_SUCCESS,
  FETCH_EQUIPMENT_REQUEST,
  FETCH_EQUIPMENT_SUCCESS,
  FETCH_EQUIPMENT_FAILURE,
  FETCH_EQUIPMENT_ITEM_REQUEST,
  FETCH_EQUIPMENT_ITEM_SUCCESS,
  FETCH_EQUIPMENT_ITEM_FAILURE,
  CREATE_EQUIPMENT_ITEM_REQUEST,
  UPDATE_EQUIPMENT_ITEM_REQUEST,
  DELETE_EQUIPMENT_ITEM_REQUEST,
  DELETE_FACILITIY_SUCCESS
} from "./actionTypes";

const initialState = {
  equipment: [],
  facilities: []
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
        payload: payload
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
    case CREATE_FACILITIY_SUCCESS:
      return {
        ...state,
        facilities:[...state.facilities, payload]
      }
    case DELETE_FACILITIY_SUCCESS:
      {
        const allFacilities = filter(state.facilities, (value)=>{
          if(value.id !== payload ){
            return value
          }
        }) 
        return {
          ...state,
          facilities:[...allFacilities]
        }
      }
    case UPDATE_FACILITIY_SUCCESS:
      {
        const indexFacilite = findIndex(state.facilities, (value)=>value.id === payload.id) 
          if(indexFacilite != -1){
            const facilitiesChanged = {...state.facilities[indexFacilite], ...payload} 
            const allFacilities = cloneDeep(state.facilities)
            allFacilities[indexFacilite] = facilitiesChanged;
            return {
              ...state,
              facilities:[...allFacilities]
            }
          }else{
            return {
              ...state
            }
          }
        
      }
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Equipment;
