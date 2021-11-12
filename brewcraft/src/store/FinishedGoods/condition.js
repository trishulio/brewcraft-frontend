import {
    SET_CONDITION_FINISHED_GOODS
} from "./actionTypes";
import { initialState } from "./initial";

const ConditionFinishedGoods = (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_CONDITION_FINISHED_GOODS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null
            };
        default:
            return {
                ...state,
                loading: true,
                error: null
            };
    }
};

export default ConditionFinishedGoods;