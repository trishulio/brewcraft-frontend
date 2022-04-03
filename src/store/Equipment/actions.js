import {
    FETCH_EQUIPMENT_ITEM_REQUEST,
    CREATE_EQUIPMENT_ITEM_REQUEST,
    UPDATE_EQUIPMENT_ITEM_REQUEST,
    DELETE_EQUIPMENT_ITEM_REQUEST,
    SET_EQUIPMENT_ITEM,
    RESET_EQUIPMENT_ITEM,
    FETCH_EQUIPMENT_REQUEST,
    SET_EQUIPMENT,
} from "./actionTypes";

export const fetchEquipment = (payload) => ({
    type: FETCH_EQUIPMENT_REQUEST,
    payload: payload,
});

export const setEquipmentPageIndex = (index) => ({
    type: SET_EQUIPMENT,
    payload: {
        pageIndex: index,
    },
});

export const setEquipmentPageSize = (size) => ({
    type: SET_EQUIPMENT,
    payload: {
        pageSize: size,
    },
});

export const fetchEquipmentItem = (payload) => ({
    type: FETCH_EQUIPMENT_ITEM_REQUEST,
    payload: payload,
});

export const createEquipmentItem = () => ({
    type: CREATE_EQUIPMENT_ITEM_REQUEST,
});

export const updateEquipmentItem = (payload) => ({
    type: UPDATE_EQUIPMENT_ITEM_REQUEST,
    payload: payload,
});

export const deleteEquipmentItem = (payload) => ({
    type: DELETE_EQUIPMENT_ITEM_REQUEST,
    payload: payload,
});

export const setEquipmentItem = (payload) => ({
    type: SET_EQUIPMENT_ITEM,
    payload: payload,
});

export const resetEquipmentItem = (payload) => ({
    type: RESET_EQUIPMENT_ITEM,
    payload: payload,
});
