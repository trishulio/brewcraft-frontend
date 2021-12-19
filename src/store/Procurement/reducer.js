import {
    INVALID_NAME,
    INVALID_DESCRIPTION,
    INVALID_PURCHASE_INVOICE_SUPPLIER,
    INVALID_PURCHASE_INVOICE_INVOICE_NUMBER,
    SET_PURCHASE_INVOICE_DETAILS,
    SET_PURCHASE_INVOICE_DUE_DATE,
    SET_PURCHASE_INVOICE_INVOICE_NUMBER,
    SET_PURCHASE_INVOICE_INVOICE_DATE,
    SET_PURCHASE_INVOICE_PURCHASE_ORDER,
    SET_PURCHASE_INVOICE_ITEMS,
    SET_PURCHASE_INVOICE_SUPPLIER,
    RESET_PURCHASE_INVOICE_DETAILS,
    INVALID_PURCHASE_INVOICE_GENERATED_ON,
    INVALID_PURCHASE_INVOICE_PAYMENT_DUE_DATE,
    INVALID_PURCHASE_INVOICE_PURCHASE_ORDER,
    SET_PURCHASE_INVOICE_ERROR,
    UPDATE_PURCHASE_ORDER_SUCCESS,
} from "./actionTypes";

const initialState = {
    data: {
        purchaseOrder: {
            orderNumber: "",
            supplier: "",
        },
        invoice: {
            id: "",
            invoiceNumber: "",
            description: "",
            freight: {
                amount: {
                    currency: "",
                    amount: 0,
                },
            },
            generatedOn: "",
            receivedOn: "",
            paymentDueDate: "",
            invoiceStatus: null,
            version: null,
        },
        shipment: {
            id: "",
            shipmentNumber: "",
            description: "",
            shipmentStatus: "",
            deliveryDueDate: "",
            deliveredDate: "",
            version: null,
        },
        procurementItems: [
            {
                invoiceItem: {
                    id: "",
                    description: "",
                    quantity: {
                        symbol: "",
                        value: 0,
                    },
                    price: {
                        currency: "",
                        amount: 0,
                    },
                    tax: {
                        amount: {
                            currency: "",
                            amount: 0,
                        },
                    },
                    material: "",
                    version: null,
                },
                materialLot: {
                    id: "",
                    lotNumber: "",
                    // storage: undefined,
                    quantity: {
                        symbol: "",
                        value: 0,
                    },
                    version: null,
                },
            },
        ],
    },
    initial: {
        purchaseOrder: {
            orderNumber: "",
            supplier: "",
        },
        invoice: {
            id: "",
            invoiceNumber: "",
            description: "",
            freight: {
                amount: {
                    currency: "",
                    amount: 0,
                },
            },
            generatedOn: "",
            receivedOn: "",
            paymentDueDate: "",
            invoiceStatus: null,
            version: null,
        },
        shipment: {
            id: "",
            shipmentNumber: "",
            description: "",
            shipmentStatus: "",
            deliveryDueDate: "",
            deliveredDate: "",
            version: null,
        },
        procurementItems: [
            {
                invoiceItem: {
                    id: "",
                    description: "",
                    quantity: {
                        symbol: "",
                        value: 0,
                    },
                    price: {
                        currency: "",
                        amount: 0,
                    },
                    tax: {
                        amount: {
                            currency: "",
                            amount: 0,
                        },
                    },
                    material: "",
                    version: null,
                },
                materialLot: {
                    id: "",
                    lotNumber: "",
                    // storage: undefined,
                    quantity: {
                        symbol: "",
                        value: 0,
                    },
                    version: null,
                },
            },
        ],
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
    error: null,
};

const PurchaseInvoice = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_PURCHASE_INVOICE_DETAILS:
        case INVALID_NAME:
        case INVALID_DESCRIPTION:
        case INVALID_PURCHASE_INVOICE_GENERATED_ON:
        case INVALID_PURCHASE_INVOICE_SUPPLIER:
        case INVALID_PURCHASE_INVOICE_INVOICE_NUMBER:
        case INVALID_PURCHASE_INVOICE_PAYMENT_DUE_DATE:
        case INVALID_PURCHASE_INVOICE_PURCHASE_ORDER:
        case SET_PURCHASE_INVOICE_ERROR:
            return {
                ...state,
                ...payload,
                loading: false,
            };
        case SET_PURCHASE_INVOICE_INVOICE_DATE:
        case SET_PURCHASE_INVOICE_INVOICE_NUMBER:
        case SET_PURCHASE_INVOICE_DUE_DATE:
            return {
                ...state,
                data: {
                    ...state.data,
                    invoice: {
                        ...state.data.invoice,
                        ...payload,
                    },
                },
                loading: false,
            };
        case SET_PURCHASE_INVOICE_SUPPLIER:
        case SET_PURCHASE_INVOICE_PURCHASE_ORDER:
            return {
                ...state,
                data: {
                    ...state.data,
                    purchaseOrder: {
                        ...state.data.purchaseOrder,
                        ...payload,
                    },
                },
                loading: false,
            };
        case UPDATE_PURCHASE_ORDER_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    purchaseOrder: {
                        ...state.data.purchaseOrder,
                        ...payload,
                    },
                },
                ...state,
                initial: {
                    ...state.initial,
                    purchaseOrder: {
                        ...state.initial.purchaseOrder,
                        ...payload,
                    },
                },
                loading: false,
            };
        case SET_PURCHASE_INVOICE_ITEMS:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...payload,
                },
                loading: false,
            };
        case RESET_PURCHASE_INVOICE_DETAILS:
            return {
                ...initialState,
                loading: false,
                error: null,
            };
        default:
            return {
                ...state,
                loading: true,
            };
    }
};

export default PurchaseInvoice;
