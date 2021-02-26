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
  ADD_CATEGORY_REQUEST
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";

function* fetchMaterialsGenerator() {
  try {
    let data = yield call(api.fetchMaterials);

    yield put({ type: FETCH_MATERIALS_SUCCESS, data: data.data });
  } catch (e) {
    yield put({ type: FETCH_MATERIALS_FAILURE });
  }
}
function* fetchMaterialByIdGenerator() {
  try {
    let data = yield call(api.fetchMaterialById);
    yield put({ type: FETCH_MATERIAL_BY_ID_SUCCESS, data: data.data });
  } catch (e) {
    yield put({ type: FETCH_MATERIAL_BY_ID_FAILURE });
  }
}
function* addMaterialGenerator(action) {
  try {
    let res = yield call(api.addMaterial, get(action, "payload.form"));
    yield put({ type: ADD_MATERIAL_SUCCESS, data: res });
  } catch (e) {
    yield put({ type: ADD_MATERIAL_FAILURE });
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
  } catch (e) {
    yield put({ type: EDIT_MATERIAL_FAILURE });
  }
}
function* deleteMaterialGenerator(action) {
  try {
    let res = yield call(api.deleteMaterial, get(action, "payload.id"));
    yield put({ type: DELETE_MATERIAL_SUCCESS, data: res });
  } catch (e) {
    yield put({ type: DELETE_MATERIAL_FAILURE });
  }
}
function* fetchMaterialCategoriesGenerator() {
  try {
    let data = yield call(api.fetchMaterialCategories);

    yield put({ type: FETCH_MATERIAL_CATEGORIES_SUCCESS, data: data.data });
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
function* fetchCategoriessGenerator() {
  try {
    let data = yield call(api.fetchCategories);
    yield put({ type: FETCH_CATEGORIES_SUCCESS, data: data });
  } catch (e) {
    yield put({ type: FETCH_CATEGORIES_FAILURE });
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
function* fetchMaterialCategoryByIdGenerator() {
  try {
    let data = yield call(api.fetchMaterialCategoryById);
    yield put({ type: FETCH_MATERIAL_CATEGORY_BY_ID_SUCCESS, data: data.data });
  } catch (e) {
    yield put({ type: FETCH_MATERIAL_CATEGORY_BY_ID_FAILURE });
  }
}
function* addIngredientGenerator(action) {
  try {
    let res = yield call(api.addIngredient, get(action, "payload.name"));
    yield put({ type: ADD_INGREDIENT_SUCCESS, data: res });
  } catch (e) {
    yield put({ type: ADD_INGREDIENT_FAILURE });
  }
}

function* addCategoryGenerator(action) {
  try {
    let res = yield call(api.addMaterialCategory, get(action, "payload.name"),get(action, "payload.parentCategoryId"));
    yield put({ type: ADD_CATEGORY_SUCCESS, data: res });
  } catch (e) {
    yield put({ type: ADD_CATEGORY_FAILURE });
  }
}
function* addPackagingMaterialGenerator(action) {

  try {
    let res = yield call(api.addPackagingMaterial, get(action, "payload.name"));
    yield put({ type: ADD_PACKAGING_MATERIAL_SUCCESS, data: res });
  } catch (e) {
    yield put({ type: ADD_PACKAGING_MATERIAL_FAILURE });
  }
}

function* editMaterialCategoryGenerator(action) {
  try {
    let res = yield call(
      api.updateMaterialCategory,
      get(action, "payload.id"),
      get(action, "payload.form")
    );
    yield put({ type: EDIT_MATERIAL_CATEGORY_SUCCESS, data: res });
  } catch (e) {
    yield put({ type: EDIT_MATERIAL_CATEGORY_FAILURE });
  }
}
function* deleteMaterialCategoryGenerator(action) {
  try {
    let res = yield call(api.deleteMaterialCategory, get(action, "payload.id"));
    yield put({ type: DELETE_MATERIAL_CATEGORY_SUCCESS, data: res });
  } catch (e) {
    yield put({ type: DELETE_MATERIAL_CATEGORY_FAILURE });
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
  yield takeEvery(FETCH_CATEGORIES_REQUEST, fetchCategoriessGenerator);
  yield takeEvery(ADD_CATEGORY_REQUEST, addCategoryGenerator);
}
export default Materials;
