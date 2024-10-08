import { call, put, takeEvery } from "redux-saga/effects";
import { get } from "lodash";
import {
    EDIT_SUPPLIER_CONTACT_REQUEST,
    EDIT_SUPPLIER_CONTACT_SUCCESS,
    EDIT_SUPPLIER_CONTACT_FAILURE,
    DELETE_SUPPLIER_CONTACT_REQUEST,
    DELETE_SUPPLIER_CONTACT_FAILURE,
    FETCH_SUPPLIER_CONTACT_BY_ID_REQUEST,
    FETCH_SUPPLIER_CONTACT_BY_ID_FAILURE,
    ADD_SUPPLIER_CONTACT_SUCCESS,
    ADD_SUPPLIER_CONTACT_FAILURE,
    ADD_SUPPLIER_CONTACT_REQUEST,
    SET_SUPPLIER_CONTACT_DETAILS,
} from "./actionTypes";
import { api } from "./api";
import { snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../Brewery/actions";

function* fetchSupplierContactByIdGenerator(action) {
    try {
        let res = yield call(
            api.fetchSupplierContactById,
            get(action, "payload.id")
        );
        yield put({
            type: SET_SUPPLIER_CONTACT_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
    } catch (e) {
        yield put({ type: FETCH_SUPPLIER_CONTACT_BY_ID_FAILURE });
    }
}

function* addSupplierContactGenerator(action) {
    try {
        const res = yield call(
            api.addSupplierContact,
            get(action, "payload.supplierId"),
            get(action, "payload.form")
        );
        yield put({
            type: ADD_SUPPLIER_CONTACT_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
        yield put(
            setGlobalRedirect({
                pathname: "/suppliers/contacts/" + res.data.id,
            })
        );
        yield put(snackSuccess("Supplier Contact saved!"));
    } catch (e) {
        yield put({ type: ADD_SUPPLIER_CONTACT_FAILURE });
    }
}

function* editSupplierContactGenerator(action) {
    try {
        const res = yield call(
            api.patchSupplierContact,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield put({
            type: EDIT_SUPPLIER_CONTACT_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
        yield put(
            setGlobalRedirect({
                pathname: "/suppliers/contacts/" + res.data.id,
            })
        );
        yield put(snackSuccess("Supplier Contact saved!"));
    } catch (e) {
        yield put({ type: EDIT_SUPPLIER_CONTACT_FAILURE });
    }
}

function* deleteSupplierContactGenerator(action) {
    try {
        yield call(api.deleteSupplierContact, get(action, "payload.id"));
        yield put(setGlobalRedirect({ pathname: "/suppliers/contacts" }));
    } catch (e) {
        yield put({ type: DELETE_SUPPLIER_CONTACT_FAILURE });
    }
}

function* SupplierContact() {
    yield takeEvery(
        FETCH_SUPPLIER_CONTACT_BY_ID_REQUEST,
        fetchSupplierContactByIdGenerator
    );
    yield takeEvery(
        EDIT_SUPPLIER_CONTACT_REQUEST,
        editSupplierContactGenerator
    );
    yield takeEvery(
        DELETE_SUPPLIER_CONTACT_REQUEST,
        deleteSupplierContactGenerator
    );
    yield takeEvery(ADD_SUPPLIER_CONTACT_REQUEST, addSupplierContactGenerator);
}

export default SupplierContact;
