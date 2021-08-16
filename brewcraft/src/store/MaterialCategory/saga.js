import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "lodash";
import {
    EDIT_MATERIAL_CATEGORY_REQUEST,
    EDIT_MATERIAL_CATEGORY_SUCCESS,
    EDIT_MATERIAL_CATEGORY_FAILURE,
    DELETE_MATERIAL_CATEGORY_REQUEST,
    DELETE_MATERIAL_CATEGORY_FAILURE,
    FETCH_MATERIAL_CATEGORY_BY_ID_REQUEST,
    FETCH_MATERIAL_CATEGORY_BY_ID_FAILURE,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    ADD_MATERIAL_CATEGORY_REQUEST,
    SET_MATERIAL_CATEGORY_DETAILS
} from "./actionTypes";
import { api } from "./api";
import { snackFailure, snackSuccess } from "../Snackbar/actions";

function* fetchMaterialCategoryByIdGenerator(action) {
    try {
      let res = yield call(api.fetchMaterialCategoryById,get(action,"payload.id"));
      res.initial = JSON.parse(JSON.stringify(res.data));
      yield put({ type: SET_MATERIAL_CATEGORY_DETAILS, payload: { data: res.data, initial: res.data }});
      action.payload.success && action.payload.success(res.data);
    } catch (e) {
      yield put({ type: FETCH_MATERIAL_CATEGORY_BY_ID_FAILURE });
    }
  }

  function* addCategoryGenerator(action) {
    try {
      const res = yield call(api.addMaterialCategory, get(action, "payload.form"));
      res.initial = JSON.parse(JSON.stringify(res.data));
      yield put({ type: ADD_CATEGORY_SUCCESS, payload: { data: res.data, initial: res.data }});
      if (action.payload.success) {
          yield call(action.payload.success, res.data);
      }
      yield put(snackSuccess());
    } catch (e) {
      yield put({ type: ADD_CATEGORY_FAILURE });
      yield put(snackFailure());
    }
  }

  function* editMaterialCategoryGenerator(action) {
    try {
      let res = yield call(
        api.patchMaterialCategory,
        get(action, "payload.id"),
        get(action, "payload.form")
      );
      res.initial = JSON.parse(JSON.stringify(res.data));
      yield put({ type: EDIT_MATERIAL_CATEGORY_SUCCESS, payload: { data: res.data, initial: res.data }});
      if (action.payload.success) {
          yield call(action.payload.success, res.data);
      }
      yield put(snackSuccess());
    } catch (e) {
      yield put({ type: EDIT_MATERIAL_CATEGORY_FAILURE });
      yield put(snackFailure());
    }
  }

  function* deleteMaterialCategoryGenerator(action) {
    try {
      yield call(api.deleteMaterialCategory, get(action, "payload.id"));
      if (action.payload.success) {
        yield call(action.payload.success);
      }
      yield put(snackSuccess());
    } catch (e) {
      yield put({ type: DELETE_MATERIAL_CATEGORY_FAILURE });
      yield put(snackFailure());
    }
  }

function* MaterialCategory() {
    yield takeEvery(
        FETCH_MATERIAL_CATEGORY_BY_ID_REQUEST,
        fetchMaterialCategoryByIdGenerator
      );
      yield takeEvery(
        EDIT_MATERIAL_CATEGORY_REQUEST,
        editMaterialCategoryGenerator
      );
      yield takeEvery(
        DELETE_MATERIAL_CATEGORY_REQUEST,
        deleteMaterialCategoryGenerator
      );

      yield takeEvery(ADD_MATERIAL_CATEGORY_REQUEST, addCategoryGenerator);
}

export default MaterialCategory;