import {
  FETCH_FACILITIES_REQUEST,
  FETCH_FACILITIES_SUCCESS,
  FETCH_FACILITIES_FAILURE,
  FETCH_EQUIPMENTS_REQUEST,
  FETCH_EQUIPMENTS_SUCCESS,
  FETCH_EQUIPMENTS_FAILURE,
  ADD_EQUIPMENTS_REQUEST,
  ADD_EQUIPMENTS_SUCCESS,
  ADD_EQUIPMENTS_FAILURE,
  EDIT_EQUIPMENTS_REQUEST,
  EDIT_EQUIPMENTS_SUCCESS,
  EDIT_EQUIPMENTS_FAILURE,
} from "./actionTypes";
import { findIndex, get, omit } from "lodash";
const initialState = {
  data: [],
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
    case FETCH_FACILITIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FACILITIES_SUCCESS:
      return {
        ...state,
        data: payload,
        loading: false,
        error: null,
      };
    case FETCH_FACILITIES_FAILURE:
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
      {
        let data = {...state.data.content};
        data[0].equipment.push(omit(payload,'facility'))
        return {
          ...state,
          data: { content:{...data} },
          formLoading: { ...state.formLoading, loading: false },
        };
      }
      
    case ADD_EQUIPMENTS_FAILURE:
    case EDIT_EQUIPMENTS_FAILURE:
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
      {
        const editIndex = findIndex(state.data.content[0].equipment, function (o) {
          return o.id == get(payload,'id');
        });
        let content = [...state.data.content[0].equipment];
        content[editIndex] = {...omit(payload,'facility')};
        const ContentState =  {...state.data, content: {...state.data.content} };
        ContentState.content[0].equipment = [...content];
        return {
          ...state,
          data: {...ContentState },
          formLoading: { ...state.formLoading, loading: false },
        };
      }
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Equipments;
