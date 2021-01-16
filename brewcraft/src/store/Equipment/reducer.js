import {
  FETCH_EQUIPMENTS_REQUEST,FETCH_EQUIPMENTS_SUCCESS,
  FETCH_EQUIPMENTS_FAILURE,ADD_EQUIPMENTS_REQUEST,
  ADD_EQUIPMENTS_SUCCESS,ADD_EQUIPMENTS_FAILURE,
  EDIT_EQUIPMENTS_REQUEST,EDIT_EQUIPMENTS_SUCCESS,
  EDIT_EQUIPMENTS_FAILURE
} from "./actionTypes";
import { findIndex, get, filter, indexOf, values, map, remove } from "lodash";
const initialState = {
  data: [
    {
      id: 0,
      driver_id: 0,
      Model: "2009",
      Make: "Ford",
      license_plate: "120-B-F20",
    },
    {
      id: 1,
      driver_id: 0,
      Model: "2010",
      Make: "Freightliner",
      license_plate: "120-B-F210",
    },
    {
      id: 2,
      driver_id: 1,
      Model: "2010",
      Make: "Freightliner",
      license_plate: "120-B-F210",
      
    },
    {
      id: 3,
      driver_id: 2,
      Model: "2012",
      Make: "International",
      license_plate: "120-B-F210",
    },
    {
      id: 4,
      driver_id: 3,
      Model: "2019",
      Make: "Mercedes-Benz",
      license_plate: "120-B-F210",

    },
  ],
  loading: false,
  error: null,
  formLoading: {
    loading: false,
    error: false,
    message: "",
  },
};

const Equipments = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_EQUIPMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EQUIPMENTS_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: null,
      };
    case FETCH_EQUIPMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_EQUIPMENTS_REQUEST:
      return {
        ...state,
        formLoading: { ...state.formLoading, error: false, loading: true },
      };
    case ADD_EQUIPMENTS_SUCCESS:
      return {
        ...state,
        data: [...state.data, payload],
        formLoading: { ...state.formLoading, loading: false },
      };
    case ADD_EQUIPMENTS_FAILURE:
      return {
        ...state,
        formLoading: {
          ...state.formLoading,
          loading: false,
          error: true,
          message: payload,
        },
      };
    case EDIT_EQUIPMENTS_REQUEST:
      return {
        ...state,
        formLoading: { ...state.formLoading, loading: true },
      };
    case EDIT_EQUIPMENTS_SUCCESS:
      
     const editIndex = findIndex([...state.data], function (o) {
        return o.id == get(payload, "id");
      });
      const storeData =  state.data.slice();
      storeData[editIndex] = {...state.data[editIndex], ...payload };
      return {
        ...state,
        data: [...storeData],
        formLoading: { ...state.formLoading, loading: false },
      };
    case EDIT_EQUIPMENTS_FAILURE:
      return {
        ...state,
        formLoading: { ...state.formLoading, loading: true },
      };

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Equipments;
