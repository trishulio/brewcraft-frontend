
const initialState = {
  data: [
    {
      id:1,
      label:"Web Service 1",
      description:"Web Service 1 Web Service 1 Web Service 1",
    },{
      id:2,
      label:"Web Service 2",
      description:"Web Service 1 Web Service 1 Web Service 1",
    },{
      id:3,
      label:"Web Service 3",
      description:"Web Service 1 Web Service 1 Web Service 1",
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
/**
 * @author anuj purchase item reducer
 */
const PurchaseItem = (state = initialState, { type, payload }) => {
  switch (type) {
    
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default PurchaseItem;
