import AxiosInstance from "../../helpers/axiosInstance";
import { call, put, takeLatest } from "redux-saga/effects";
import {
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANIES_SUCCESS,
    FETCH_COMPANIES_FAILURE
} from "./actionTypes";

async function fetchCompaniesRequest() {
    // API refers to companies as suppliers
    return await AxiosInstance.get("/api/v1/suppliers");
}

function* fetchCompanies() {
    try {
        const response = yield call(fetchCompaniesRequest);
        yield put({ type: FETCH_COMPANIES_SUCCESS, payload: response.data.suppliers });
    } catch (e) {
        yield put ({ type: FETCH_COMPANIES_FAILURE, payload: [] });
    }
}

export default function* Companies() {
    yield takeLatest(FETCH_COMPANIES_REQUEST, fetchCompanies);
}