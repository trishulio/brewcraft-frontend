import { SET_PROFILE_LOGGED_IN } from "./actionTypes";

export const setProfileLoggedIn = (value) => ({
    type: SET_PROFILE_LOGGED_IN,
    payload: { loggedIn: value },
});
