import {
    SNACK_SUCCESS,
    SNACK_FAILURE,
    SNACK_WARNING,
    SNACK_INFO
} from "./actionTypes";

export const snackSuccess = message => ({
    type: SNACK_SUCCESS,
    payload: message
});

export const snackFailure = message => ({
    type: SNACK_FAILURE,
    payload: message
});

export const snackWarning = message => ({
    type: SNACK_WARNING,
    payload: message
});

export const snackInfo = message => ({
    type: SNACK_INFO,
    payload: message
});