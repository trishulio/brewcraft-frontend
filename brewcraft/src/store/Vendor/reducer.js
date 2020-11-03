const initialState = {
  data: [
    {
      id:1,
      label:"Vendor 1",
      address:"Product 1 description Product 1 description ",
    },
    {
      id:2,
      label:"Vendor 2",
      address:"Product 1 description Product 1 description ",
    },
    {
      id:3,
      label:"Vendor 3",
      address:"Product 1 description Product 1 description ",
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

const Vendor = (state = initialState, { type, payload }) => {
  switch (type) {
    
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Vendor;
