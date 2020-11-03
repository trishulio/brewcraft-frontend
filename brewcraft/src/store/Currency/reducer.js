const initialState = {
  data: [
    {
      id: 1,
      label: "CAD - Canadian",
    },
    {
      id: 2,
      label: "$ - USD",
    },
  ],
  loading: false,
  error: null,
  formLoading: {
    loading: false,
    error: false,
    message: "",
  },
};

const Tax = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Tax;
