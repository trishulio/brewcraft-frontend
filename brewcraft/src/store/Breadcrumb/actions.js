import {
    SET_BREADCRUMB_ITEMS
} from './actionTypes';

export const setBreadcrumbItems = (title, items, backButton=false) => ({
    type: SET_BREADCRUMB_ITEMS,
    payload: {
        title : title,
        items : items,
        backButton: backButton
    }
});