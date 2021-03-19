import {
  FETCH_MATERIALS_REQUEST,
  FETCH_MATERIALS_SUCCESS,
  FETCH_MATERIALS_FAILURE,
  ADD_MATERIAL_REQUEST,
  ADD_MATERIAL_SUCCESS,
  ADD_MATERIAL_FAILURE,
  EDIT_MATERIAL_REQUEST,
  EDIT_MATERIAL_SUCCESS,
  EDIT_MATERIAL_FAILURE,
  DELETE_MATERIAL_REQUEST,
  DELETE_MATERIAL_SUCCESS,
  DELETE_MATERIAL_FAILURE,
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
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILURE,
  FETCH_PACKAGING_MATERIAL_SUCCESS,
  FETCH_PACKAGING_MATERIAL_FAILURE,
  FETCH_INGREDIENTS_REQUEST,
  FETCH_PACKAGING_MATERIAL_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_REQUEST,
  FETCH_ALL_CATEGORIES_REQUEST,
  FETCH_ALL_CATEGORIES_SUCCESS,
  FETCH_ALL_CATEGORIES_FAILURE,
  EDIT_INGREDIENT_REQUEST,
  DELETE_INGREDIENT_REQUEST,
  EDIT_PACKAGING_MATERIAL_REQUEST,
  DELETE_PACKAGING_MATERIAL_REQUEST,
  EDIT_INGREDIENT_SUCCESS,
  DELETE_INGREDIENT_SUCCESS,
  EDIT_PACKAGING_MATERIAL_SUCCESS,
  DELETE_PACKAGING_MATERIAL_SUCCESS,
  EDIT_INGREDIENT_FAILURE,
  DELETE_INGREDIENT_FAILURE,
  EDIT_PACKAGING_MATERIAL_FAILURE,
  DELETE_PACKAGING_MATERIAL_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { ALL } from "../../helpers/constants";
import { snackFailure, snackSuccess } from "../Snackbar/actions";

function* fetchMaterialsGenerator() {
  try {
    let data = yield call(api.fetchMaterials);

    yield put({ type: FETCH_MATERIALS_SUCCESS, data: data.data });
  } catch (e) {
    yield put({ type: FETCH_MATERIALS_FAILURE });
  }
}
function* fetchMaterialByIdGenerator(action) {
  try {
    let response = yield call(api.fetchMaterialById,get(action,"payload.id"));
    action.payload.success && action.payload.success(response.data);
  } catch (e) {
    yield put({ type: FETCH_MATERIAL_BY_ID_FAILURE , payload: []});
  }
}
function* addMaterialGenerator(action) {
  try {
    let res = yield call(api.addMaterial, get(action, "payload.form"));
    yield put({ type: ADD_MATERIAL_SUCCESS, data: res });
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: ADD_MATERIAL_FAILURE });
    yield put(snackFailure());
  }
}

function* editMaterialGenerator(action) {
  try {
    let res = yield call(
      api.updateMaterial,
      get(action, "payload.id"),
      get(action, "payload.form")
    );
    yield put({ type: EDIT_MATERIAL_SUCCESS, data: res });
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: EDIT_MATERIAL_FAILURE });
    yield put(snackFailure());
  }
}
function* deleteMaterialGenerator(action) {
  try {
    let res = yield call(api.deleteMaterial, get(action, "payload.id"));
    yield put({ type: DELETE_MATERIAL_SUCCESS });
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: DELETE_MATERIAL_FAILURE });
    yield put(snackFailure());
  }
}
function* editIngredientGenerator(action) {
  try {
    let res = yield call(
      api.updateMaterial,
      get(action, "payload.id"),
      get(action, "payload.form")
    );
    yield put({ type: EDIT_INGREDIENT_SUCCESS, data: res , payload : get(action,'payload')});
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: EDIT_INGREDIENT_FAILURE });
    yield put(snackFailure());
  }
}
function* deleteIngredientGenerator(action) {
  try {
    let res = yield call(api.deleteMaterial, get(action, "payload.id"));
    yield put({ type: DELETE_INGREDIENT_SUCCESS , payload : get(action, "payload") });
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: DELETE_INGREDIENT_FAILURE });
    yield put(snackFailure());
  }
}
function* editPackagingGenerator(action) {
  try {
    let res = yield call(
      api.updateMaterial,
      get(action, "payload.id"),
      get(action, "payload.form")
    );
    yield put({ type: EDIT_PACKAGING_MATERIAL_SUCCESS, data: res , payload : get(action,'payload') });
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: EDIT_PACKAGING_MATERIAL_FAILURE });
    yield put(snackFailure());
  }
}
function* deletePackagingGenerator(action) {
  try {
    let res = yield call(api.deleteMaterial, get(action, "payload.id"));
    yield put({ type: DELETE_PACKAGING_MATERIAL_SUCCESS, payload : get(action, "payload") });
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: DELETE_PACKAGING_MATERIAL_FAILURE });
    yield put(snackFailure());
  }
}
function* fetchMaterialCategoriesGenerator(action) {
  try {
    let data = yield call(api.fetchMaterialCategories,get(action, "payload.type"));

    yield put({ type: FETCH_MATERIAL_CATEGORIES_SUCCESS, data: data });
  } catch (e) {
    yield put({ type: FETCH_MATERIAL_CATEGORIES_FAILURE });
  }
}
function* fetchIngredientsGenerator() {
  try {
    let data = yield call(api.fetchIngredients);
    yield put({ type: FETCH_INGREDIENTS_SUCCESS, data: data });
  } catch (e) {
    yield put({ type: FETCH_INGREDIENTS_FAILURE });
  }
}
function* fetchCategoriesGenerator() {
  try {
    let data = yield call(api.fetchCategories);
    yield put({ type: FETCH_CATEGORIES_SUCCESS, data: data });
  } catch (e) {
    yield put({ type: FETCH_CATEGORIES_FAILURE });
  }
}
function* fetchAllCategoriesGenerator() {
  try {
    let data = yield call(api.fetchMaterialCategories,ALL);
    yield put({ type: FETCH_ALL_CATEGORIES_SUCCESS, data: data });
  } catch (e) {
    yield put({ type: FETCH_ALL_CATEGORIES_FAILURE });
  }
}
function* fetchPackagingMaterialGenerator() {
  try {
    let data = yield call(api.fetchPackagingMaterials);

    yield put({ type: FETCH_PACKAGING_MATERIAL_SUCCESS, data: data });
  } catch (e) {
    yield put({ type: FETCH_PACKAGING_MATERIAL_FAILURE });
  }
}
function* fetchMaterialCategoryByIdGenerator(action) {
  try {
    let response = yield call(api.fetchMaterialCategoryById,get(action,"payload.id"));
    action.payload.success && action.payload.success(response.data);
  } catch (e) {
    yield put({ type: FETCH_MATERIAL_CATEGORY_BY_ID_FAILURE });
  }
}
function* addIngredientGenerator(action) {
  try {
    let res = yield call(api.addIngredient, get(action, "payload"));
    yield put({ type: ADD_INGREDIENT_SUCCESS, data: res });
    yield put(snackSuccess(`Created Ingredient "${action.payload.name}".`));
  } catch (e) {
    yield put({ type: ADD_INGREDIENT_FAILURE });
    yield put(snackFailure("Failed to create Ingredient."));
  }
}

function* addCategoryGenerator(action) {
  try {
    let res = yield call(api.addMaterialCategory, get(action, "payload.name"),get(action, "payload.parentCategoryId"));
    yield put({ type: ADD_CATEGORY_SUCCESS, data: res });
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: ADD_CATEGORY_FAILURE });
    yield put(snackFailure());
  }
}
function* addPackagingMaterialGenerator(action) {

  try {
    let res = yield call(api.addPackagingMaterial, get(action, "payload"));
    yield put({ type: ADD_PACKAGING_MATERIAL_SUCCESS, data: res });
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: ADD_PACKAGING_MATERIAL_FAILURE });
    yield put(snackFailure());
  }
}

function* editMaterialCategoryGenerator(action) {
  try {
    let res = yield call(
      api.updateMaterialCategory,
      get(action, "payload.id"),
      get(action, "payload.form")
    );
    yield put({ type: EDIT_MATERIAL_CATEGORY_SUCCESS, data: res , payload : get(action,'payload')});
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: EDIT_MATERIAL_CATEGORY_FAILURE });
    yield put(snackFailure());
  }
}
function* deleteMaterialCategoryGenerator(action) {
  try {
    let res = yield call(api.deleteMaterialCategory, get(action, "payload.id"));
    yield put({ type: DELETE_MATERIAL_CATEGORY_SUCCESS  , payload : get(action, "payload")});
    yield put(snackSuccess());
  } catch (e) {
    yield put({ type: DELETE_MATERIAL_CATEGORY_FAILURE });
    yield put(snackFailure());
  }
}

function* Materials() {
  yield takeEvery(FETCH_MATERIALS_REQUEST, fetchMaterialsGenerator);
  yield takeEvery(FETCH_MATERIAL_BY_ID_REQUEST, fetchMaterialByIdGenerator);
  yield takeEvery(ADD_MATERIAL_REQUEST, addMaterialGenerator);
  yield takeEvery(EDIT_MATERIAL_REQUEST, editMaterialGenerator);
  yield takeEvery(DELETE_MATERIAL_REQUEST, deleteMaterialGenerator);
  yield takeEvery(
    FETCH_MATERIAL_CATEGORIES_REQUEST,
    fetchMaterialCategoriesGenerator
  );
  yield takeEvery(FETCH_INGREDIENTS_REQUEST, fetchIngredientsGenerator);
  yield takeEvery(
    FETCH_PACKAGING_MATERIAL_REQUEST,
    fetchPackagingMaterialGenerator
  );
  yield takeEvery(
    FETCH_MATERIAL_CATEGORY_BY_ID_REQUEST,
    fetchMaterialCategoryByIdGenerator
  );
  yield takeEvery(ADD_INGREDIENT_REQUEST, addIngredientGenerator);
  yield takeEvery(
    ADD_PACKAGING_MATERIAL_REQUEST,
    addPackagingMaterialGenerator
  );
  yield takeEvery(
    EDIT_MATERIAL_CATEGORY_REQUEST,
    editMaterialCategoryGenerator
  );
  yield takeEvery(
    DELETE_MATERIAL_CATEGORY_REQUEST,
    deleteMaterialCategoryGenerator
  );
  yield takeEvery(FETCH_CATEGORIES_REQUEST, fetchCategoriesGenerator);
  yield takeEvery(FETCH_ALL_CATEGORIES_REQUEST, fetchAllCategoriesGenerator);
  yield takeEvery(ADD_CATEGORY_REQUEST, addCategoryGenerator);
  yield takeEvery(EDIT_INGREDIENT_REQUEST, editIngredientGenerator);
  yield takeEvery(DELETE_INGREDIENT_REQUEST, deleteIngredientGenerator);
  yield takeEvery(EDIT_PACKAGING_MATERIAL_REQUEST, editPackagingGenerator);
  yield takeEvery(DELETE_PACKAGING_MATERIAL_REQUEST, deletePackagingGenerator);
  
}
export default Materials;
