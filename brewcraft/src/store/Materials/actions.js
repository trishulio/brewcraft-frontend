import {
    SET_RAW_MATERIAL_ITEMS,
    SET_RAW_MATERIALS_INVENTORY_VALUE_ACTIVE_TAB,
    SET_RAW_MATERIAL_DISCOVER
} from './actionTypes';

export const setRawMaterialsInventoryValueActiveTab = active_tab => ({
    type: SET_RAW_MATERIALS_INVENTORY_VALUE_ACTIVE_TAB,
    payload: {
        raw_materials_inventory_value_active_tab: active_tab
    }
});

export const setRawMaterialItems = (overview) => ({
    type: SET_RAW_MATERIAL_ITEMS,
    payload: overview
});

export const setRawMaterialDiscover = (discover) => ({
    type: SET_RAW_MATERIAL_DISCOVER,
    payload: discover
});