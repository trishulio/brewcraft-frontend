
const initialState = {
  data: [
    {
      id:1,
      label:"Gas",
    },{
      id:2,
      label:"Mileage",
    },{
      id:3,
      label:"Repairs",
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
 * @author anuj purchase/ExpenseCategory item reducer
 */
const ExpenseCategory = (state = initialState, { type, payload }) => {
  switch (type) {
    
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default ExpenseCategory;
