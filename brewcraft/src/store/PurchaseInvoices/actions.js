import {
    FETCH_PURCHASE_INVOICES_REQUEST,
    FETCH_ALL_PURCHASE_INVOICES_REQUEST,
    SET_PURCHASE_INVOICES_DETAILS,
    SET_PURCHASE_INVOICES_PAGE_INDEX,
    SET_PURCHASE_INVOICES_PAGE_SIZE
} from "./actionTypes";

export const fetchPurchaseInvoices = params => ({
    type: FETCH_PURCHASE_INVOICES_REQUEST,
    payload: { params },
});

export const fetchAllPurchaseInvoices = () => ({
    type: FETCH_ALL_PURCHASE_INVOICES_REQUEST,
});

// export const setPurchaseInvoicesSelectedCategory = category => ({
//     type: SET_PURCHASE_INVOICES_DETAILS,
//     payload: {
//         selectedCategory: category
//     }
// });

export const setPurchaseInvoicesPageIndex = index => ({
    type: SET_PURCHASE_INVOICES_PAGE_INDEX,
    payload: {
        pageIndex: index
    }
});

export const setPurchaseInvoicesPageSize = size => ({
    type: SET_PURCHASE_INVOICES_PAGE_SIZE,
    payload: {
        pageSize: size
    }
});