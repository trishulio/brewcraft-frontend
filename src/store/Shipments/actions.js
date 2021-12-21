import {
    CREATE_SHIPMENT,
    FETCH_SHIPMENT,
    UPDATE_SHIPMENT,
    SET_SHIPMENT_DETAILS,
    SET_SHIPMENT_SUPPLIER,
    SET_SHIPMENT_INVOICE_DATE,
    SET_SHIPMENT_INVOICE_NUMBER,
    SET_SHIPMENT_DUE_DATE,
    SET_SHIPMENT_ITEMS,
    INVALID_NAME,
    INVALID_DESCRIPTION,
    INVALID_SHIPMENT_SUPPLIER,
    INVALID_SHIPMENT_GENERATED_ON,
    INVALID_SHIPMENT_PURCHASE_ORDER,
    INVALID_SHIPMENT_INVOICE_NUMBER,
    INVALID_SHIPMENT_PAYMENT_DUE_DATE,
    RESET_SHIPMENT_DETAILS,
    DELETE_SHIPMENT,
} from "./actionTypes";

export const setShipmentDetails = (product) => ({
    type: SET_SHIPMENT_DETAILS,
    payload: {
        data: product,
    },
});

export const fetchShipmentById = (id) => ({
    type: FETCH_SHIPMENT,
    payload: id,
});

export const createShipment = (payload) => ({
    type: CREATE_SHIPMENT,
    payload: {
        ...payload,
    },
});

export const updateShipment = ({ id, form, success }) => ({
    type: UPDATE_SHIPMENT,
    payload: {
        id,
        form,
        success,
    },
});

export const deleteShipment = (id) => ({
    type: DELETE_SHIPMENT,
    payload: {
        id,
    },
});

export const setShipmentInvalidName = (enabled) => ({
    type: INVALID_NAME,
    payload: {
        invalidName: enabled,
    },
});

export const setShipmentInvalidDescription = (enabled) => ({
    type: INVALID_DESCRIPTION,
    payload: {
        invalidDescription: enabled,
    },
});

export const resetShipmentDetails = (success) => ({
    type: RESET_SHIPMENT_DETAILS,
    payload: success,
});

export const setShipmentSupplier = (supplier) => ({
    type: SET_SHIPMENT_SUPPLIER,
    payload: { supplier },
});

export const setShipmentInvoiceDate = (generatedOn) => ({
    type: SET_SHIPMENT_INVOICE_DATE,
    payload: {
        generatedOn: generatedOn,
    },
});

export const setShipmentInvoiceNumber = (invoiceNumber) => ({
    type: SET_SHIPMENT_INVOICE_NUMBER,
    payload: {
        invoiceNumber: invoiceNumber,
    },
});

export const setShipmentDueDate = (paymentDueDate) => ({
    type: SET_SHIPMENT_DUE_DATE,
    payload: {
        paymentDueDate: paymentDueDate,
    },
});

export const setShipmentItems = (items) => ({
    type: SET_SHIPMENT_ITEMS,
    payload: {
        items: items,
    },
});

export const setInvalidInvoiceSupplier = (enabled) => ({
    type: INVALID_SHIPMENT_SUPPLIER,
    payload: {
        invalidSupplier: enabled,
    },
});

export const setInvalidInvoiceDate = (enabled) => ({
    type: INVALID_SHIPMENT_GENERATED_ON,
    payload: {
        invalidGeneratedOn: enabled,
    },
});

export const setInvalidInvoiceNumber = (enabled) => ({
    type: INVALID_SHIPMENT_INVOICE_NUMBER,
    payload: {
        invalidInvoiceNumber: enabled,
    },
});

export const setInvalidDueDate = (enabled) => ({
    type: INVALID_SHIPMENT_PAYMENT_DUE_DATE,
    payload: {
        invalidPaymentDueDate: enabled,
    },
});

export const setInvalidPurchaseOrder = (enabled) => ({
    type: INVALID_SHIPMENT_PURCHASE_ORDER,
    payload: {
        invalidPurchaseOrder: enabled,
    },
});
