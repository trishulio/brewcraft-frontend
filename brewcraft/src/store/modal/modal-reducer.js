import { modalConstants } from "./modal-constants";

const initialState = {
    open: false,
    content: null,
};

export default function modalReducer (state = initialState, action) {
    switch(action.type) {
        case modalConstants.OPEN_MODAL:
            return {
                open: true,
                content: action.payload,
            };
        case modalConstants.CLOSE_MODAL:
            return {
                open: false,
                content: null,
            }
        default:
            return state;
    }
}
