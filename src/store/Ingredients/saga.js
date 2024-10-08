import {
    FETCH_INGREDIENTS_REQUEST,
    FETCH_INGREDIENTS_SUCCESS,
    FETCH_INGREDIENTS_FAILURE,
    FETCH_ALL_INGREDIENTS_REQUEST,
    FETCH_ALL_INGREDIENTS_SUCCESS,
    FETCH_ALL_INGREDIENTS_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure } from "../Snackbar/actions";

function* fetchAllIngredientsGenerator() {
    try {
        let res = yield call(api.fetchIngredients);
        yield put({
            type: FETCH_ALL_INGREDIENTS_SUCCESS,
            data: { data: res.data },
        });
    } catch (e) {
        yield put({ type: FETCH_ALL_INGREDIENTS_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* fetchIngredientsGenerator(action) {
    try {
        const res = yield call(
            api.fetchIngredients,
            get(action, "payload.params")
        );
        yield put({
            type: FETCH_INGREDIENTS_SUCCESS,
            data: { data: res.data },
        });
    } catch (e) {
        yield put({ type: FETCH_INGREDIENTS_FAILURE });
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* Ingredients() {
    yield takeEvery(FETCH_INGREDIENTS_REQUEST, fetchIngredientsGenerator);
    yield takeEvery(
        FETCH_ALL_INGREDIENTS_REQUEST,
        fetchAllIngredientsGenerator
    );
}

export default Ingredients;
