import {
    SET_RAW_MATERIAL_ITEMS,
    SET_RAW_MATERIAL_DISCOVER
} from './actionTypes';

export const setRawMaterialItems = (overview) => ({
    type: SET_RAW_MATERIAL_ITEMS,
    payload: overview
});

export const setRawMaterialDiscover = (discover) => ({
    type: SET_RAW_MATERIAL_DISCOVER,
    payload: discover
});