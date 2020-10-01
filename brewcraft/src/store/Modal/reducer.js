import { actionTypes } from "./actionTypes";

const initialState = {
    open: false,
    content: null,
};

export default function modalReducer (state = initialState, action) {
    switch(action.type) {
        case actionTypes.OPEN_MODAL:
            return {
                open: true,
                content: action.payload,
            };
        case actionTypes.CLOSE_MODAL:
            return {
                open: false,
                content: null,
            }
        default:
            return state;
    }
}
