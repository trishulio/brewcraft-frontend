import {
    SET_BRITE_TANK_FINISHED_GOODS
} from "./actionTypes";
import { initialState } from "./initial";

const BriteTankFinishedGoods = (state = initialState, { type, payload }) => {
    switch(type) {
        case SET_BRITE_TANK_FINISHED_GOODS:
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

export default BriteTankFinishedGoods;