import {
    FETCH_PROCUREMENTS_REQUEST,
    FETCH_ALL_PROCUREMENTS_REQUEST,
    SET_PROCUREMENTS_PAGE_INDEX,
    SET_PROCUREMENTS_PAGE_SIZE,
} from "./actionTypes";

export const fetchProcurements = (params) => ({
    type: FETCH_PROCUREMENTS_REQUEST,
    payload: { params },
});

export const fetchAllProcurements = () => ({
    type: FETCH_ALL_PROCUREMENTS_REQUEST,
});

export const setProcurementsPageIndex = (index) => ({
    type: SET_PROCUREMENTS_PAGE_INDEX,
    payload: {
        pageIndex: index,
    },
});

export const setProcurementsPageSize = (size) => ({
    type: SET_PROCUREMENTS_PAGE_SIZE,
    payload: {
        pageSize: size,
    },
});
