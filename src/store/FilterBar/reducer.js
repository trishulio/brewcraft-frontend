import { TOGGLE_FILTER_BAR } from "./actionTypes";

const initialState = {
    visible: {},
};

export default function FilterBar(state = initialState, { type, payload }) {
    switch (type) {
        case TOGGLE_FILTER_BAR:
            return {
                ...state,
                visible: {
                    [payload]: !state.visible[payload]
                },
            };
        default:
            state = { ...state };
            break;
    }

    return state;
}
