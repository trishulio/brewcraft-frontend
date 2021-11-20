const initialState = {
  data: [
    {
      id:1,
      label:"Tax label1",
      percentage:5,
    },
    {
      id:2,
      label:"value add tax",
      percentage:18,
    },
    {
      id:3,
      label:"value add 3",
      percentage:25,
    }
   
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
