import {
    INVALID_NAME,
    INVALID_DESCRIPTION,
    SET_PURCHASE_INVOICE_DETAILS,
    SET_PURCHASE_INVOICE_DUE_DATE,
    SET_PURCHASE_INVOICE_INVOICE_NUMBER,
    SET_PURCHASE_INVOICE_INVOICE_DATE,
    SET_PURCHASE_INVOICE_PURCHASE_ORDER,
    SET_PURCHASE_INVOICE_ITEMS,
    SET_PURCHASE_INVOICE_SUPPLIER,
    RESET_PURCHASE_INVOICE_DETAILS
} from "./actionTypes";

const initialState = {
    data: {
        id: "",
        invoiceNumber: "",
        purchaseOrder: {
            orderNumber: "",
            supplier: ""
        },
        description: "",
        freight: null,
        generatedOn: "",
        receivedOn: "",
        paymentDueDate: "",
        statusId: null,
        items: [{
            description: "",
            quantity: {
                value: ""
            },
            price: {
                amount: ""
            },
            tax: {
                amount: {
                    amount: ""
                }
            },
            material: ""
        }],
        version: null
    },
    initial: {
        id: "",
        invoiceNumber: "",
        purchaseOrder: {
            orderNumber: "",
            supplier: ""
        },
        description: "",
        freight: null,
        generatedOn: "",
        receivedOn: "",
        paymentDueDate: "",
        statusId: null,
        items: [{
            description: "",
            quantity: {
                value: ""
            },
            price: {
                amount: ""
            },
            tax: {
                amount: {
                    amount: ""
                }
            },
            material: ""
        }],
        version: null
    },
    invalidName: false,
    invalidInvoiceNumber: false,
    invalidPurchaseOrderId: false,
    invalidDescription: false,
    invalidFreight: false,
    invalidGeneratedOn: false,
    invalidReceivedOn: false,
    invalidPaymentDueDate: false,
    invalidStatusId: false,
    invalidItems: false,
    loading: true,
    error: null
};

const PurchaseInvoice = (state = initialState, { type, payload }) => {
    switch (type) {
        case INVALID_NAME:
        case INVALID_DESCRIPTION:
        case SET_PURCHASE_INVOICE_DETAILS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            };
        case SET_PURCHASE_INVOICE_INVOICE_DATE:
        case SET_PURCHASE_INVOICE_INVOICE_NUMBER:
        case SET_PURCHASE_INVOICE_DUE_DATE:
        case SET_PURCHASE_INVOICE_ITEMS:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...payload
                }
            };
        case SET_PURCHASE_INVOICE_SUPPLIER:
        case SET_PURCHASE_INVOICE_PURCHASE_ORDER:
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
        case RESET_PURCHASE_INVOICE_DETAILS:
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

export default PurchaseInvoice;