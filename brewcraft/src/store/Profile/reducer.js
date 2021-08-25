import {
  SET_PROFILE_LOGGED_IN
} from "./actionTypes";

const initialState = {
  loggedIn: false
};

const Profile = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PROFILE_LOGGED_IN:
      return {
        ...state,
        ...payload
      };
    default:
      return { ...state };
  }
};

export default Profile;
