import {
    SET_RAW_MATERIAL
} from './actionTypes';

export const setValue = value => ({
    type: SET_RAW_MATERIAL,
    payload: {
        value: value
    }
});

export const setMtdIncrease = value => ({
    type: SET_RAW_MATERIAL,
    payload: {
        mtd_increase: value
    }
});

export const ytdMtdIncrease = value => ({
    type: SET_RAW_MATERIAL,
    payload: {
        mtd_increase: value
    }
});

export const setTypes = types => ({
    type: SET_RAW_MATERIAL,
    payload: {
        types: type
    }
});

export const setType = payload => ({
    type: SET_RAW_MATERIAL,
    payload
});