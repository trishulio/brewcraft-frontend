import { MOCK_TABLE_DATA } from "../../component/Invoice/mock";

const initialState = {
  invoices: MOCK_TABLE_DATA
};

const purchases = (state = initialState, action) => {
  switch (action.type) {
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default purchases;
