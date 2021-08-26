import {
    SET_GLOBAL_REDIRECT
} from "./actionTypes";

export const setGlobalRedirect = redirect => ({
    type: SET_GLOBAL_REDIRECT,
    payload: { redirect }
});