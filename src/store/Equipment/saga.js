import { call, put, race, select, take, takeEvery } from "redux-saga/effects";
import { all, get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../Brewery/actions";
import {
    FETCH_EQUIPMENT_ITEM_REQUEST,
    DELETE_EQUIPMENT_ITEM_REQUEST,
    DELETE_EQUIPMENT_ITEM_SUCCESS,
    DELETE_EQUIPMENT_ITEM_FAILURE,
    FETCH_EQUIPMENT_ITEM_SUCCESS,
    FETCH_EQUIPMENT_ITEM_FAILURE,
    SET_EQUIPMENT_ITEM,
    CREATE_EQUIPMENT_ITEM_REQUEST,
    UPDATE_EQUIPMENT_ITEM_REQUEST,
    CREATE_EQUIPMENT_ITEM_SUCCESS,
    CREATE_EQUIPMENT_ITEM_FAILURE,
    UPDATE_EQUIPMENT_ITEM_FAILURE,
    UPDATE_EQUIPMENT_ITEM_SUCCESS,
    VALIDATE_EQUIPMENT_ITEM_FAILURE,
    VALIDATE_EQUIPMENT_ITEM_SUCCESS,
    VALIDATE_EQUIPMENT_ITEM,
} from "./actionTypes";
import { api } from "./api";
import { isValidName, isValidNumberString } from "../../helpers/utils";

function* fetchEquipmentItemGenerator(action) {
    try {
        const res = yield call(
            api.fetchEquipmentItemById,
            get(action, "payload.id")
        );
        yield all([
            put({ type: FETCH_EQUIPMENT_ITEM_SUCCESS }),
            put({
                type: SET_EQUIPMENT_ITEM,
                payload: {
                    data: res.data,
                    initial: JSON.parse(JSON.stringify(res.data)),
                },
            }),
        ]);
    } catch (e) {
        yield put({
            type: FETCH_EQUIPMENT_ITEM_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* validateEquipmentItemGenerator() {
    yield select((state) => state.EquipmentItem);
    const { name, type, status, maxCapacity } = yield select(
        (state) => state.EquipmentItem.data
    );
    yield put({
        type: SET_EQUIPMENT_ITEM,
        payload: {
            invalidName: !isValidName(name),
            invalidType: !isValidName(type),
            invalidStatus: !isValidName(status),
            invalidMaxCapacityValue:
                !maxCapacity.value || !isValidNumberString(maxCapacity.value),
            invalidMaxCapacitySymbol:
                maxCapacity.symbol !== "hl" && maxCapacity.symbol !== "l",
        },
    });
    const {
        invalidName,
        invalidType,
        invalidStatus,
        invalidMaxCapacityValue,
        invalidMaxCapacitySymbol,
    } = yield select((state) => state.EquipmentItem);
    if (
        invalidName ||
        invalidType ||
        invalidStatus ||
        invalidMaxCapacityValue ||
        invalidMaxCapacitySymbol
    ) {
        yield put({ type: VALIDATE_EQUIPMENT_ITEM_FAILURE });
    } else {
        yield put({ type: VALIDATE_EQUIPMENT_ITEM_SUCCESS });
    }
}

function* createEquipmentItemGenerator() {
    try {
        yield put({ type: VALIDATE_EQUIPMENT_ITEM });
        const [valid] = yield race([
            take(VALIDATE_EQUIPMENT_ITEM_SUCCESS),
            take(VALIDATE_EQUIPMENT_ITEM_FAILURE),
        ]);
        if (!valid) {
            yield put({ type: CREATE_EQUIPMENT_ITEM_FAILURE });
            return;
        }
        const equipmentItem = yield select((state) => state.EquipmentItem.data);
        const res = yield call(api.addEquipmentItem, equipmentItem);
        yield all([
            put({
                type: CREATE_EQUIPMENT_ITEM_SUCCESS,
            }),
            put({
                type: SET_EQUIPMENT_ITEM,
                payload: {
                    data: res.data,
                    initial: JSON.parse(JSON.stringify(res.data)),
                },
            }),
            put(snackSuccess("Created Equipment Item")),
        ]);
    } catch (e) {
        yield put({
            type: CREATE_EQUIPMENT_ITEM_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* updateEquipmentItemGenerator(action) {
    try {
        const res = yield call(
            api.updateEquipmentItem,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        yield all([
            put({
                type: UPDATE_EQUIPMENT_ITEM_SUCCESS,
            }),
            put({
                type: SET_EQUIPMENT_ITEM,
                payload: {
                    data: res.data,
                    initial: JSON.parse(JSON.stringify(res.data)),
                },
            }),
            put(snackSuccess("Updated Equipment Item")),
        ]);
    } catch (e) {
        yield put({
            type: UPDATE_EQUIPMENT_ITEM_FAILURE,
            payload: {
                error: e.error,
                message: e.message,
                color: "warning",
            },
        });
    }
}

function* deleteEquipmentItemGenerator(action) {
    try {
        yield call(api.deleteEquipmentItem, get(action, "payload.id"));
        yield all([
            put({ type: DELETE_EQUIPMENT_ITEM_SUCCESS }),
            put(setGlobalRedirect({ pathname: "/equipment" })),
            put(snackSuccess()),
        ]);
    } catch (e) {
        yield put({ type: DELETE_EQUIPMENT_ITEM_FAILURE });
        yield put(snackFailure());
    }
}

function* EquipmentItem() {
    yield takeEvery(FETCH_EQUIPMENT_ITEM_REQUEST, fetchEquipmentItemGenerator);
    yield takeEvery(VALIDATE_EQUIPMENT_ITEM, validateEquipmentItemGenerator);
    yield takeEvery(
        CREATE_EQUIPMENT_ITEM_REQUEST,
        createEquipmentItemGenerator
    );
    yield takeEvery(
        UPDATE_EQUIPMENT_ITEM_REQUEST,
        updateEquipmentItemGenerator
    );
    yield takeEvery(
        DELETE_EQUIPMENT_ITEM_REQUEST,
        deleteEquipmentItemGenerator
    );
}

export default EquipmentItem;
