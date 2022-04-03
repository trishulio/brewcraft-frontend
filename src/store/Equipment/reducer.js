import {
    DELETE_EQUIPMENT_ITEM_REQUEST,
    DELETE_EQUIPMENT_ITEM_SUCCESS,
    SET_EQUIPMENT_ITEM,
    RESET_EQUIPMENT_ITEM,
    UPDATE_EQUIPMENT_ITEM_REQUEST,
    CREATE_EQUIPMENT_ITEM_REQUEST,
    CREATE_EQUIPMENT_ITEM_SUCCESS,
    UPDATE_EQUIPMENT_ITEM_SUCCESS,
    CREATE_EQUIPMENT_ITEM_FAILURE,
    UPDATE_EQUIPMENT_ITEM_FAILURE,
    DELETE_EQUIPMENT_ITEM_FAILURE,
    SET_EQUIPMENT,
    FETCH_EQUIPMENT_REQUEST,
    FETCH_EQUIPMENT_SUCCESS,
    FETCH_EQUIPMENT_FAILURE,
} from "./actionTypes";

const initialState = {
    data: {
        id: "",
        name: "",
        type: "",
        status: "",
        maxCapacity: {
            symbol: "",
            value: "",
        },
        version: null,
    },
    initial: {
        id: "",
        name: "",
        type: "",
        status: "",
        maxCapacity: {
            symbol: "",
            value: "",
        },
        version: null,
    },
    loading: true,
    error: null,
};

const EquipmentItem = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_EQUIPMENT_ITEM:
            return {
                ...state,
                ...payload,
                error: null,
            };
        case RESET_EQUIPMENT_ITEM:
            return {
                ...initialState,
                loading: false,
                error: null,
            };
        case CREATE_EQUIPMENT_ITEM_REQUEST:
        case UPDATE_EQUIPMENT_ITEM_REQUEST:
        case DELETE_EQUIPMENT_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_EQUIPMENT_ITEM_SUCCESS:
        case UPDATE_EQUIPMENT_ITEM_SUCCESS:
        case DELETE_EQUIPMENT_ITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case CREATE_EQUIPMENT_ITEM_FAILURE:
        case UPDATE_EQUIPMENT_ITEM_FAILURE:
        case DELETE_EQUIPMENT_ITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    ...payload,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

const Equipment = (
    state = {
        content: [],
        all: [],
        loading: false,
        error: null,
        totalElements: 0,
        totalPages: 0,
        pageIndex: 0,
        pageSize: 20,
    },
    { type, payload }
) => {
    switch (type) {
        case SET_EQUIPMENT:
            return {
                ...state,
                ...payload,
                error: null,
            };
        case FETCH_EQUIPMENT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_EQUIPMENT_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case FETCH_EQUIPMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: {
                    ...payload,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export { Equipment, EquipmentItem };
