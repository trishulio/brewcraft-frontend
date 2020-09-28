import { MOCK_TABLE_DATA } from "../../pages/Bills/mock";

const initialState = {
    bills: MOCK_TABLE_DATA
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
