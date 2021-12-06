const initialState = {
  data: [
    {
      id:1,
      label:"Product 1",
      description:"Product 1 description Product 1 description ",
      price:500,
    },
    {
      id:2,
      label:"Product 2",
      description:"Product 2 description Product 2 description ",
      price:1500,
    },
    {
      id:3,
      label:"Product 3",
      description:"Product 3 description Product 3 description ",
      price:2,
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

const Inventory = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return {
        ...state,
        ...payload,
        loading: false,
        error: null
      };
  }
};

export default Inventory;
