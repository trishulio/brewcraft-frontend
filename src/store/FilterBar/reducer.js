import { TOGGLE_FILTER_BAR } from "./actionTypes";

const initialState = {
    visible: false,
};

export default function FilterBar(
    state = initialState,
    { type }
) {
    switch (type) {
        case TOGGLE_FILTER_BAR:
            return {
                ...state,
                visible: !state.visible,
            };
        default:
            state = { ...state };
            break;
    }

    return state;
}
