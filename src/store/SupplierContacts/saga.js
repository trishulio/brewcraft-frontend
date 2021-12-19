import {
    FETCH_SUPPLIER_CONTACTS_REQUEST,
    FETCH_SUPPLIER_CONTACTS_SUCCESS,
    FETCH_SUPPLIER_CONTACTS_FAILURE,
    FETCH_ALL_SUPPLIER_CONTACTS_REQUEST,
    FETCH_ALL_SUPPLIER_CONTACTS_SUCCESS,
    FETCH_ALL_SUPPLIER_CONTACTS_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchAllSupplierContactsGenerator() {
    try {
        let res = yield call(api.fetchSupplierContacts);
        delete Object.assign(res.data, { all: res.data["supplierContacts"] })[
            "supplierContacts"
        ];
        yield put({
            type: FETCH_ALL_SUPPLIER_CONTACTS_SUCCESS,
            data: { data: res.data },
        });
    } catch (e) {
        yield put({ type: FETCH_ALL_SUPPLIER_CONTACTS_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchSupplierContactsGenerator(action) {
    try {
        const res = yield call(
            api.fetchSupplierContacts,
            get(action, "payload.params")
        );
        delete Object.assign(res.data, {
            content: res.data["supplierContacts"],
        })["supplierContacts"];
        yield put({
            type: FETCH_SUPPLIER_CONTACTS_SUCCESS,
            data: { data: res.data },
        });
    } catch (e) {
        yield put({ type: FETCH_SUPPLIER_CONTACTS_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* SupplierContacts() {
    yield takeEvery(
        FETCH_SUPPLIER_CONTACTS_REQUEST,
        fetchSupplierContactsGenerator
    );
    yield takeEvery(
        FETCH_ALL_SUPPLIER_CONTACTS_REQUEST,
        fetchAllSupplierContactsGenerator
    );
}

export default SupplierContacts;
