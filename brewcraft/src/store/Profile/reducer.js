const initialState = {};

const Profile = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Profile;
