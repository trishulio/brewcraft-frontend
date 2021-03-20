import { combineReducers } from "redux";
import {
  ADD_MATERIAL_REQUEST,
  FETCH_MATERIALS_REQUEST,
  FETCH_MATERIALS_SUCCESS,
  FETCH_MATERIALS_FAILURE,
  ADD_MATERIAL_SUCCESS,
  ADD_MATERIAL_FAILURE,
  FETCH_MATERIAL_BY_ID_REQUEST,
  FETCH_MATERIAL_BY_ID_SUCCESS,
  FETCH_MATERIAL_BY_ID_FAILURE,
  FETCH_MATERIAL_CATEGORIES_REQUEST,
  FETCH_MATERIAL_CATEGORIES_SUCCESS,
  FETCH_MATERIAL_CATEGORIES_FAILURE,
  ADD_INGREDIENT_REQUEST,
  ADD_INGREDIENT_SUCCESS,
  ADD_INGREDIENT_FAILURE,
  ADD_PACKAGING_MATERIAL_REQUEST,
  ADD_PACKAGING_MATERIAL_SUCCESS,
  ADD_PACKAGING_MATERIAL_FAILURE,
  EDIT_MATERIAL_CATEGORY_REQUEST,
  EDIT_MATERIAL_CATEGORY_SUCCESS,
  EDIT_MATERIAL_CATEGORY_FAILURE,
  DELETE_MATERIAL_CATEGORY_REQUEST,
  DELETE_MATERIAL_CATEGORY_SUCCESS,
  DELETE_MATERIAL_CATEGORY_FAILURE,
  FETCH_MATERIAL_CATEGORY_BY_ID_REQUEST,
  FETCH_MATERIAL_CATEGORY_BY_ID_SUCCESS,
  FETCH_MATERIAL_CATEGORY_BY_ID_FAILURE,
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILURE,
  FETCH_PACKAGING_MATERIAL_REQUEST,
  FETCH_PACKAGING_MATERIAL_SUCCESS,
  FETCH_PACKAGING_MATERIAL_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  FETCH_ALL_CATEGORIES_SUCCESS,
  FETCH_ALL_CATEGORIES_FAILURE,
  FETCH_ALL_CATEGORIES_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_REQUEST,
  EDIT_INGREDIENT_REQUEST,
  DELETE_INGREDIENT_REQUEST,
  EDIT_PACKAGING_MATERIAL_REQUEST,
  DELETE_PACKAGING_MATERIAL_REQUEST,
  EDIT_INGREDIENT_SUCCESS,
  DELETE_INGREDIENT_SUCCESS,
  EDIT_PACKAGING_MATERIAL_SUCCESS,
  DELETE_PACKAGING_MATERIAL_SUCCESS,
} from "./actionTypes";
import { findIndex, get, filter, indexOf, values, map, remove } from "lodash";
const initialState = {
  data: {},
  loading: false,
  error: null,
  formLoading: {
    loading: false,
    error: false,
    message: "",
  },
};
const Materials = (state = initialState, { type, payload, data }) => {
  switch (type) {
    case FETCH_MATERIAL_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MATERIAL_BY_ID_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
        error: null,
      };
    case FETCH_MATERIAL_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FETCH_MATERIALS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MATERIALS_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
        error: null,
      };
    case FETCH_MATERIALS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_MATERIAL_REQUEST:
      return {
        ...state,
        formLoading: { ...state.formLoading, error: false, loading: true },
      };
    case ADD_MATERIAL_SUCCESS:
      return {
        ...state,
        data: [...state.data, data.data],
        formLoading: { ...state.formLoading, loading: false },
      };
    case ADD_MATERIAL_FAILURE:
      return {
        ...state,
        formLoading: {
          ...state.formLoading,
          loading: false,
          error: true,
          message: payload,
        },
      };
    default:
      state = { ...state };
      break;
  }
  return state;
};

const MaterialCategories = (state = initialState, { type, payload, data }) => {
  switch (type) {
    case FETCH_MATERIAL_CATEGORIES_REQUEST:
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
      };
    case FETCH_MATERIAL_CATEGORIES_SUCCESS:
      return {
        ...state,
        data: data,
        loading: false,
        error: null,
      };
    case FETCH_MATERIAL_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case FETCH_MATERIAL_CATEGORY_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MATERIAL_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        data: data,
        loading: false,
        error: null,
      };
    case FETCH_MATERIAL_CATEGORY_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      state = { ...state };
      break;
  }

  return state;
};
const Ingredients = (state = initialState, { type, payload, data }) => {
  switch (type) {
    case FETCH_INGREDIENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
        error: null,
      };
    case FETCH_INGREDIENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_INGREDIENT_REQUEST:
      return {
        ...state,
        formLoading: { ...state.formLoading, error: false, loading: true },
      };
    case ADD_INGREDIENT_SUCCESS:
      return {
        ...state,
        data: [...state.data, data.data],
        formLoading: { ...state.formLoading, loading: false },
      };
    case ADD_INGREDIENT_FAILURE:
      return {
        ...state,
        formLoading: {
          ...state.formLoading,
          loading: false,
          error: true,
          message: payload,
        },
      };
    case EDIT_INGREDIENT_REQUEST:
      return {
        ...state,
        formLoading: { ...state.formLoading, loading: true },
      };
    case EDIT_INGREDIENT_SUCCESS:
      const editIndex = findIndex([...state.data], function (o) {
        return o.id == get(payload, "id");
      });
      const storeData = state.data.slice();
      storeData[editIndex] = { ...state.data[editIndex], ...data.data };
      return {
        ...state,
        data: [...storeData],
        formLoading: { ...state.formLoading, loading: false },
      };
    case DELETE_INGREDIENT_REQUEST:
      return {
        ...state,
        formLoading: { ...state.formLoading, loading: true },
      };
    case DELETE_INGREDIENT_SUCCESS:
      return {
        ...state,
        data: filter([...state.data], (instanceData) => {
          return (
            payload.id!==instanceData.id
          );
        }),
        formLoading: { ...state.formLoading, loading: false },
      };
    default:
      state = { ...state };
      break;
  }

  return state;
};

const PackagingMaterial = (state = initialState, { type, payload, data }) => {
  switch (type) {
    case FETCH_PACKAGING_MATERIAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PACKAGING_MATERIAL_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
        error: null,
      };
    case FETCH_PACKAGING_MATERIAL_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_PACKAGING_MATERIAL_REQUEST:
      return {
        ...state,
        formLoading: { ...state.formLoading, error: false, loading: true },
      };
    case ADD_PACKAGING_MATERIAL_SUCCESS:
      return {
        ...state,
        data: [...state.data, data.data],
        formLoading: { ...state.formLoading, loading: false },
      };
    case ADD_PACKAGING_MATERIAL_FAILURE:
      return {
        ...state,
        formLoading: {
          ...state.formLoading,
          loading: false,
          error: true,
          message: payload,
        },
      };
    case EDIT_PACKAGING_MATERIAL_REQUEST:
      return {
        ...state,
        formLoading: { ...state.formLoading, loading: true },
      };
    case EDIT_PACKAGING_MATERIAL_SUCCESS:
      const editIndex = findIndex([...state.data], function (o) {
        return o.id == get(payload, "id");
      });
      const storeData = state.data.slice();
      storeData[editIndex] = { ...state.data[editIndex], ...data.data };
      return {
        ...state,
        data: [...storeData],
        formLoading: { ...state.formLoading, loading: false },
      };
    case DELETE_PACKAGING_MATERIAL_REQUEST:
      return {
        ...state,
        formLoading: { ...state.formLoading, loading: true },
      };
    case DELETE_PACKAGING_MATERIAL_SUCCESS:
      return {
        ...state,
        data: filter([...state.data], (instanceData) => {
          return (
            payload.id!==instanceData.id
          );
        }),
        formLoading: { ...state.formLoading, loading: false },
      };
    default:
      state = { ...state };
      break;
  }

  return state;
};

const Categories = (state = initialState, { type, payload, data }) => {
  switch (type) {
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
        error: null,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      state = { ...state };
      break;
  }

  return state;
};

const AllCategories = (state = initialState, { type, payload, data }) => {
  switch (type) {
    case FETCH_ALL_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        data,
        loading: false,
        error: null,
      };
    case FETCH_ALL_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_CATEGORY_REQUEST:
      return {
        ...state,
        formLoading: { ...state.formLoading, error: false, loading: true },
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        data: [...state.data, data.data],
        formLoading: { ...state.formLoading, loading: false },
      };
    case ADD_CATEGORY_FAILURE:
      return {
        ...state,
        formLoading: {
          ...state.formLoading,
          loading: false,
          error: true,
          message: payload,
        },
      };
      case EDIT_MATERIAL_CATEGORY_REQUEST:
        return {
          ...state,
          formLoading: { ...state.formLoading, loading: true },
        };
      case EDIT_MATERIAL_CATEGORY_SUCCESS:
        const editIndex = findIndex([...state.data], function (o) {
          return o.id == get(payload, "id");
        });
        const storeData = state.data.slice();
        storeData[editIndex] = { ...state.data[editIndex], ...data.data };
        return {
          ...state,
          data: [...storeData],
          formLoading: { ...state.formLoading, loading: false },
        };
      case DELETE_MATERIAL_CATEGORY_REQUEST:
        return {
          ...state,
          formLoading: { ...state.formLoading, loading: true },
        };
      case DELETE_MATERIAL_CATEGORY_SUCCESS:
        return {
          ...state,
          data: filter([...state.data], (instanceData) => {
            return (
                payload.id!==instanceData.id
            );
          }),
          formLoading: { ...state.formLoading, loading: false },
        };
    default:
      state = { ...state };
      break;
  }

  return state;
};

export default combineReducers({
  Materials,
  MaterialCategories,
  Ingredients,
  PackagingMaterial,
  Categories,
  AllCategories,
});
