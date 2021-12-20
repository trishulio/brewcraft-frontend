import {
    FETCH_SUPPLIERS_REQUEST,
    FETCH_ALL_SUPPLIERS_REQUEST,
    SET_SUPPLIERS_PAGE_INDEX,
    SET_SUPPLIERS_PAGE_SIZE,
} from "./actionTypes";

export const fetchSuppliers = (params) => ({
    type: FETCH_SUPPLIERS_REQUEST,
    payload: { params },
});

export const fetchAllSuppliers = () => ({
    type: FETCH_ALL_SUPPLIERS_REQUEST,
});

export const setSuppliersPageIndex = (index) => ({
    type: SET_SUPPLIERS_PAGE_INDEX,
    payload: {
        pageIndex: index,
    },
});

export const setSuppliersPageSize = (size) => ({
    type: SET_SUPPLIERS_PAGE_SIZE,
    payload: {
        pageSize: size,
    },
});
