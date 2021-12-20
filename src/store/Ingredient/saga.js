import {
    FETCH_INGREDIENT_BY_ID_REQUEST,
    SET_INGREDIENT_DETAILS,
    ADD_INGREDIENT_REQUEST,
    ADD_INGREDIENT_SUCCESS,
    ADD_INGREDIENT_FAILURE,
    EDIT_INGREDIENT_REQUEST,
    DELETE_INGREDIENT_REQUEST,
    EDIT_INGREDIENT_SUCCESS,
    DELETE_INGREDIENT_SUCCESS,
    EDIT_INGREDIENT_FAILURE,
    DELETE_INGREDIENT_FAILURE,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { api } from "./api";
import { get } from "lodash";
import { snackFailure, snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../Brewery/actions";

function* fetchIngredientByIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchIngredientById,
            get(action, "payload.id")
        );
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({
            type: SET_INGREDIENT_DETAILS,
            payload: { data: res.data, initial: res.data },
        });
        if (action.payload.success) {
            yield call(action.payload.success, res.data);
        }
    } catch (e) {
        yield put(snackFailure("Something went wrong please try again."));
    }
}

function* addIngredientGenerator(action) {
    try {
        const res = yield call(api.addIngredient, get(action, "payload.form"));
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({
            type: ADD_INGREDIENT_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
        yield put(
            setGlobalRedirect({
                pathname: "/materials/ingredients/" + res.data.id,
            })
        );
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: ADD_INGREDIENT_FAILURE });
    }
}

function* editIngredientGenerator(action) {
    try {
        const res = yield call(
            api.updateIngredient,
            get(action, "payload.id"),
            get(action, "payload.form")
        );
        res.initial = JSON.parse(JSON.stringify(res.data));
        yield put({
            type: EDIT_INGREDIENT_SUCCESS,
            payload: { data: res.data, initial: res.data },
        });
        yield put(
            setGlobalRedirect({
                pathname: "/materials/ingredients/" + res.data.id,
            })
        );
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: EDIT_INGREDIENT_FAILURE });
        yield put(snackFailure());
    }
}

function* deleteIngredientGenerator(action) {
    try {
        yield call(api.deleteIngredient, get(action, "payload.id"));
        yield put({
            type: DELETE_INGREDIENT_SUCCESS,
            payload: get(action, "payload"),
        });
        yield put(setGlobalRedirect({ pathname: "/materials/ingredients" }));
        yield put(snackSuccess());
    } catch (e) {
        yield put({ type: DELETE_INGREDIENT_FAILURE });
        yield put(snackFailure());
    }
}

function* Ingredient() {
    yield takeEvery(
        FETCH_INGREDIENT_BY_ID_REQUEST,
        fetchIngredientByIdGenerator
    );
    yield takeEvery(ADD_INGREDIENT_REQUEST, addIngredientGenerator);
    yield takeEvery(EDIT_INGREDIENT_REQUEST, editIngredientGenerator);
    yield takeEvery(DELETE_INGREDIENT_REQUEST, deleteIngredientGenerator);
}

export default Ingredient;
