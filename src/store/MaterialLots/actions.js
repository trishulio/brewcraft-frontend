import {
    FETCH_INVENTORY_PROCUREMENTS_QUANTITY_REQUEST,
    FETCH_INVENTORY_STOCK_QUANTITY_REQUEST,
} from "./actionTypes";

export const fetchMaterialProcurementsQuantity = (params) => ({
    type: FETCH_INVENTORY_PROCUREMENTS_QUANTITY_REQUEST,
    payload: { params },
});

export const fetchMaterialStockQuantity = (params) => ({
    type: FETCH_INVENTORY_STOCK_QUANTITY_REQUEST,
    payload: { params },
});

// export const setMaterialPageIndex = index => ({
//     type: SET_MATERIALS_PAGE_INDEX,
//     payload: {
//         pageIndex: index
//     }
// });

// export const setMaterialsPageSize = size => ({
//     type: SET_MATERIALS_PAGE_SIZE,
//     payload: {
//         pageSize: size
//     }
// });
