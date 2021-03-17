import { call, put, takeLatest } from "redux-saga/effects";
import {
    FETCH_COMPANIES_REQUEST,
    FETCH_COMPANIES_SUCCESS,
    FETCH_COMPANIES_FAILURE,
    FETCH_COMPANY_REQUEST,
    FETCH_COMPANY_SUCCESS,
    FETCH_COMPANY_FAILURE,
    CREATE_COMPANY_REQUEST,
    CREATE_COMPANY_SUCCESS,
    CREATE_COMPANY_FAILURE,
    UPDATE_COMPANY_REQUEST,
    UPDATE_COMPANY_SUCCESS,
    UPDATE_COMPANY_FAILURE,
    DELETE_COMPANY_REQUEST,
    DELETE_COMPANY_SUCCESS,
    DELETE_COMPANY_FAILURE
} from "./actionTypes";
import {
    fetchCompaniesRequest,
    fetchCompanyRequest,
    createCompanyRequest,
    updateCompanyRequest,
    deleteCompanyRequest
} from "./api.js";

function* fetchCompanies() {
    try {
        const response = yield call(fetchCompaniesRequest);
        yield put({ type: FETCH_COMPANIES_SUCCESS, payload: response.data.suppliers });
    } catch (e) {
        yield put ({ type: FETCH_COMPANIES_FAILURE, payload: [] });
    }
}

function* fetchCompany(action) {
    try {
        const response = yield call(fetchCompanyRequest, action.payload.id);
        yield put({ type: FETCH_COMPANY_SUCCESS, payload: response.data });
        action.payload.success && action.payload.success(response.data);
    } catch (e) {
        yield put ({ type: FETCH_COMPANY_FAILURE, payload: [] });
    }
}

function* createCompany(action) {
    const address = action.payload.address || {};
    const data = {
        address: {
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            country: address.country,
            province: address.province,
            city: address.city,
            postalCode: address.postalCode
        },
        contacts: [],
        name: action.payload.name
    };
    try {
        yield call(createCompanyRequest, data);
        yield put({ type: CREATE_COMPANY_SUCCESS });
        action.payload.success && action.payload.success();
    } catch (e) {
        yield put ({ type: CREATE_COMPANY_FAILURE });
    }
}

function* updateCompany(action) {
    const address = action.payload.address || {};
    const data = {
        address: {
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            country: address.country,
            province: address.province,
            city: address.city,
            postalCode: address.postalCode
        },
        contacts: action.payload.contacts || [],
        name: action.payload.name,
        version: action.payload.version
    };
    try {
        yield call(updateCompanyRequest, action.payload.id, data);
        yield put({ type: UPDATE_COMPANY_SUCCESS });
        action.payload.success && action.payload.success();
    } catch (e) {
        yield put ({ type: UPDATE_COMPANY_FAILURE });
    }
}

function* deleteCompany(action) {
    try {
        yield call(deleteCompanyRequest, action.payload.id);
        yield put({ type: DELETE_COMPANY_SUCCESS });
        action.payload.success && action.payload.success();
    } catch (e) {
        yield put ({ type: DELETE_COMPANY_FAILURE });
    }
}

export default function* Companies() {
    yield takeLatest(FETCH_COMPANIES_REQUEST, fetchCompanies);
    yield takeLatest(FETCH_COMPANY_REQUEST, fetchCompany);
    yield takeLatest(CREATE_COMPANY_REQUEST, createCompany);
    yield takeLatest(UPDATE_COMPANY_REQUEST, updateCompany);
    yield takeLatest(DELETE_COMPANY_REQUEST, deleteCompany);
}