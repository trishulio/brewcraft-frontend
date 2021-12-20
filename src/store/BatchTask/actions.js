import {
    FETCH_BATCH_TASK_REQUEST,
    SET_BATCH_TASK_PAGE_INDEX,
    SET_BATCH_TASK_PAGE_SIZE,
} from "./actionTypes";

export const fetchBatchTasks = (params) => ({
    type: FETCH_BATCH_TASK_REQUEST,
    payload: { params },
});

export const setBatchTasksPageIndex = (index) => ({
    type: SET_BATCH_TASK_PAGE_INDEX,
    payload: {
        pageIndex: index,
    },
});

export const setBatchTasksPageSize = (size) => ({
    type: SET_BATCH_TASK_PAGE_SIZE,
    payload: {
        pageSize: size,
    },
});
