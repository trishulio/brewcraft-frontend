import { call, put, takeLatest } from "redux-saga/effects";
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
import { attempt, get, omit } from "lodash";
import { FACILITIES, EQUIPMENT } from "../../helpers/url";
import AxiosInstance from "../../helpers/axiosInstance";
import { apiResponse, SUCCESS, ERROR } from "../../helpers/snackHelper";
import {
  commonResponseHanderlGet,
  commonResponseHanderlCreated,
} from "../../helpers/commonSagaUtility";

async function fetchfetchFacilitiesRequest() {
  return await AxiosInstance.get(FACILITIES)
    .then((r) => r)
    .catch((error) => console.log(error));
}
function* fetchFacilities() {
  let response = yield call(fetchfetchFacilitiesRequest);
  yield call(
    commonResponseHanderlGet,
    response,
    { redux: FETCH_FACILITIES_SUCCESS },
    { redux: FETCH_FACILITIES_FAILURE, snack: ERROR }
  );
}

export default function* Equipments() {
  yield takeLatest(FETCH_FACILITIES_REQUEST, fetchFacilities);
}
