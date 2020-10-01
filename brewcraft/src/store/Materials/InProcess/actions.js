import {
    SET_INPROCESS
} from './actionTypes';

export const setValue = value => ({
    type: SET_INPROCESS,
    payload: {
        value: value
    }
});