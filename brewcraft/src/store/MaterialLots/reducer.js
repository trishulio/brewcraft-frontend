import {
    FETCH_INVENTORY_PROCUREMENTS_QUANTITY_REQUEST,
    FETCH_INVENTORY_STOCK_QUANTITY_REQUEST,
    SET_INVENTORY_PROCUREMENTS_QUANTITY_DETAILS,
    SET_INVENTORY_STOCK_QUANTITY_DETAILS,
    SET_MATERIALS_PAGE_INDEX,
    SET_MATERIALS_PAGE_SIZE
} from "./actionTypes";

const initialState = {
    procurements: [],
    stock: [],
    loading: false,
    error: null,
    totalElements: 0,
    totalPages: 0,
    pageIndex: 0,
    pageSize: 20
};

const MaterialLots = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_INVENTORY_PROCUREMENTS_QUANTITY_DETAILS:
            return {
                ...state,
                procurements: [
                    ...payload
                ],
                loading: false,
                error: null
            };
        case SET_INVENTORY_STOCK_QUANTITY_DETAILS:
            return {
                ...state,
                stock: [
                    ...payload
                ],
                loading: false,
                error: null
            };
        case SET_MATERIALS_PAGE_INDEX:
        case SET_MATERIALS_PAGE_SIZE:
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
            }
    }
}

export default MaterialLots;