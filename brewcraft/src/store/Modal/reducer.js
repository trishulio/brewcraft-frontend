import { OPEN_MODAL, CLOSE_MODAL } from "./actionTypes";

const initialState = {
    open: false,
    content: null,
};

export default function Modal (state = initialState, action) {
    switch(action.type) {
        case OPEN_MODAL:
            return {
                open: true,
                content: action.payload,
            };
        case CLOSE_MODAL:
            return {
                open: false,
                content: null,
            }
        default:
            return state;
    }
}
