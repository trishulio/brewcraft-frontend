import {
    SET_SHIPMENT_DETAILS,
    FETCH_SHIPMENT,
    CREATE_SHIPMENT,
    UPDATE_SHIPMENT,
    DELETE_SHIPMENT
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../Brewery/actions";

function* fetchShipmentByIdGenerator(action) {
    try {
        const res = yield call(api.fetchShipmentById, get(action, "payload"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_SHIPMENT_DETAILS, payload: { ...res } });
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* createShipmentGenerator(action) {
    try {
        debugger;
        const res = yield call(api.postShipment, get(action, "payload.form"));

        // yield put({ type: SET_SHIPMENT_DETAILS, payload: { ...res } });
        // yield put(snackSuccess(`Created shipment ${get(action, "payload.form.invoiceNumber")}.`));
    } catch (e) {
        yield put(snackFailure("Failed to create shipment"));
    }
}

function* udpateShipmentGenerator(action) {
    try {
        const res = yield call(api.putShipment, get(action, "payload.id"), get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({ type: SET_SHIPMENT_DETAILS, payload: { ...res } });
        yield put(snackSuccess(`Updated shipment ${get(action, "payload.form.name")}.`));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* deleteShipmentGenerator(action) {
    try {
        yield call(api.deleteShipment, get(action, "payload.id"));
        yield put(setGlobalRedirect({ pathname: "/purchases/shipments" }));
        yield put(snackSuccess("Deleted shipment invoice."));
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* Shipment() {
    yield takeEvery(CREATE_SHIPMENT, createShipmentGenerator);
    yield takeEvery(FETCH_SHIPMENT, fetchShipmentByIdGenerator);
    yield takeEvery(UPDATE_SHIPMENT, udpateShipmentGenerator);
    yield takeEvery(DELETE_SHIPMENT, deleteShipmentGenerator);
}

export default Shipment;
