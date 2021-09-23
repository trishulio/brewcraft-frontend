import {
    FETCH_BATCH_STATUS_REQUEST,
    SET_BATCH_STATUS_PAGE_INDEX,
    SET_BATCH_STATUS_PAGE_SIZE
} from "./actionTypes";

export const fetchBatchStatuses = params => ({
    type: FETCH_BATCH_STATUS_REQUEST,
    payload: { params },
});

export const setBatchStatusesPageIndex = index => ({
    type: SET_BATCH_STATUS_PAGE_INDEX,
    payload: {
        pageIndex: index
    }
});

export const setBatchStatusesPageSize = size => ({
    type: SET_BATCH_STATUS_PAGE_SIZE,
    payload: {
        pageSize: size
    }
});