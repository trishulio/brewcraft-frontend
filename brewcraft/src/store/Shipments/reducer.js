import { DELETE_BATCH_FAILURE } from "../Batch/actionTypes";
import {
    INVALID_NAME,
    INVALID_DESCRIPTION,
    SET_SHIPMENT_DETAILS,
    SET_SHIPMENT_DUE_DATE,
    SET_SHIPMENT_INVOICE_NUMBER,
    SET_SHIPMENT_INVOICE_DATE,
    SET_SHIPMENT_ITEMS,
    SET_SHIPMENT_SUPPLIER,
    RESET_SHIPMENT_DETAILS
} from "./actionTypes";

const initialState = {
    data: {
        id: "",
        shipmentNumber: "",
        description: "",
        statusId: 0,
        deliveryDueDate: "",
        deliveredDate: "",
        lots: [{
            lotNumber: "",
            invoiceItemId: 0,
            storageId: 0,
            quantity: {
                symbol: "",
                value: 0
            }
        }],
        version: null
    },
    initial: {
        id: "",
        shipmentNumber: "",
        description: "",
        statusId: 0,
        deliveryDueDate: "",
        deliveredDate: "",
        lots: [{
            lotNumber: "",
            invoiceItemId: 0,
            storageId: 0,
            quantity: {
                symbol: "",
                value: 0
            }
        }],
        version: null
    },
    loading: true,
    error: null
};

const Shipment = (state = initialState, { type, payload }) => {
    switch (type) {
        case INVALID_NAME:
        case INVALID_DESCRIPTION:
        case SET_SHIPMENT_DETAILS:
            debugger;
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case SET_SHIPMENT_INVOICE_DATE:
        case SET_SHIPMENT_INVOICE_NUMBER:
        case SET_SHIPMENT_DUE_DATE:
        case SET_SHIPMENT_ITEMS:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...payload
                }
            };
        case SET_SHIPMENT_SUPPLIER:
            return {
                ...state,
                data: {
                    ...state.data,
                    purchaseOrder: {
                        ...state.data.purchaseOrder,
                        ...payload
                    }
                }
            };
        case RESET_SHIPMENT_DETAILS:
            return {
                ...initialState,
                loading: false,
                error: null
            };
        default:
        return {
            ...state,
            loading: true,
            error: null,
        };
    }
};

export default Shipment;