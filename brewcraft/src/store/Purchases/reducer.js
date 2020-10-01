import { MOCK_TABLE_DATA } from "../../pages/Invoices/mock";

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
