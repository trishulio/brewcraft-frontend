import {
  SET_RAW_MATERIAL_ITEMS,
  SET_RAW_MATERIALS_INVENTORY_VALUE_ACTIVE_TAB,
  SET_RAW_MATERIAL_DISCOVER,
  ADD_MATERIAL_REQUEST,
  EDIT_MATERIAL_REQUEST,
  DELETE_MATERIAL_REQUEST,
  FETCH_MATERIALS_REQUEST,
  FETCH_MATERIAL_BY_ID_REQUEST,
  ADD_INGREDIENT_REQUEST,
  ADD_PACKAGING_MATERIAL_REQUEST,
  FETCH_MATERIAL_CATEGORIES_REQUEST,
  FETCH_MATERIAL_CATEGORY_BY_ID_REQUEST,
  EDIT_MATERIAL_CATEGORY_REQUEST,
  DELETE_MATERIAL_CATEGORY_REQUEST,
  FETCH_INGREDIENTS_REQUEST,
  FETCH_PACKAGING_MATERIAL_REQUEST,
  FETCH_CATEGORIES_REQUEST,
  ADD_CATEGORY_REQUEST,
  FETCH_ALL_CATEGORIES_REQUEST,
  SNACK_SUCCESS,
  SNACK_FAILURE,
  SNACK_WARNING,
  SNACK_INFO,
} from "./actionTypes";
export const setRawMaterialsInventoryValueActiveTab = (active_tab) => ({
  type: SET_RAW_MATERIALS_INVENTORY_VALUE_ACTIVE_TAB,
  payload: {
    raw_materials_inventory_value_active_tab: active_tab,
  },
});

export const setRawMaterialItems = (overview) => ({
  type: SET_RAW_MATERIAL_ITEMS,
  payload: overview,
});

export const setRawMaterialDiscover = (discover) => ({
  type: SET_RAW_MATERIAL_DISCOVER,
  payload: discover,
});

export const fetchMaterials = () => ({
  type: FETCH_MATERIALS_REQUEST,
});
export const fetchMaterialById = (payload) => ({
  type: FETCH_MATERIAL_BY_ID_REQUEST,
  payload: payload,
});
export const saveMaterial = (payload) => ({
  type: ADD_MATERIAL_REQUEST,
  payload: payload,
});

export const editMaterial = (payload) => ({
  type: EDIT_MATERIAL_REQUEST,
  payload: payload,
});

export const deleteMaterial = (payload) => ({
  type: DELETE_MATERIAL_REQUEST,
  payload: payload,
});

export const fetchMaterialCategories = (type) => ({
  type: FETCH_MATERIAL_CATEGORIES_REQUEST,
  payload : {type}
});
export const fetchIngredients = () => ({
  type: FETCH_INGREDIENTS_REQUEST,
});
export const fetchAllCategories = () => ({
  type: FETCH_ALL_CATEGORIES_REQUEST,
});
export const fetchPackagingMaterial = () => ({
  type: FETCH_PACKAGING_MATERIAL_REQUEST,
});
export const fetchMaterialCategoryById = (payload) => ({
  type: FETCH_MATERIAL_CATEGORY_BY_ID_REQUEST,
  payload: payload,
});
export const saveIngredient = (payload) => ({
  type: ADD_INGREDIENT_REQUEST,
  payload: payload,
});
export const savePackagingMaterial = (payload) => ({
  type: ADD_PACKAGING_MATERIAL_REQUEST,
  payload: payload,
});

export const editMaterialCategory = (payload) => ({
  type: EDIT_MATERIAL_CATEGORY_REQUEST,
  payload: payload,
});

export const deleteMaterialCategory = (payload) => ({
  type: DELETE_MATERIAL_CATEGORY_REQUEST,
  payload: payload,
});
export const fetchCategories = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});
export const saveCategory = (payload) => ({
  type: ADD_CATEGORY_REQUEST,
  payload: payload,
});
export const snackSuccess = () => {
  console.log('test')
  return ({
    type: SNACK_SUCCESS,
  })
};
export const snackFailure = () => ({
  type: SNACK_FAILURE,
});
export const snackWarning = () => ({
  type: SNACK_WARNING,
});
export const snackInfo = () => ({
  type: SNACK_INFO,
});
