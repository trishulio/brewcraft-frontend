import {
    CREATE_PROCUREMENT,
    UPDATE_PROCUREMENT,
    CREATE_PURCHASE_INVOICE,
    CREATE_PURCHASE_ORDER,
    UPDATE_PURCHASE_ORDER,
    FETCH_PURCHASE_INVOICE,
    UPDATE_PURCHASE_INVOICE,
    SET_PURCHASE_INVOICE_DETAILS,
    SET_PURCHASE_INVOICE_SUPPLIER,
    SET_PURCHASE_INVOICE_INVOICE_DATE,
    SET_PURCHASE_INVOICE_INVOICE_NUMBER,
    SET_PURCHASE_INVOICE_DUE_DATE,
    SET_PURCHASE_INVOICE_PURCHASE_ORDER,
    SET_PURCHASE_INVOICE_ITEMS,
    INVALID_NAME,
    INVALID_DESCRIPTION,
    INVALID_PURCHASE_INVOICE_SUPPLIER,
    INVALID_PURCHASE_INVOICE_GENERATED_ON,
    INVALID_PURCHASE_INVOICE_PURCHASE_ORDER,
    INVALID_PURCHASE_INVOICE_INVOICE_NUMBER,
    INVALID_PURCHASE_INVOICE_PAYMENT_DUE_DATE,
    RESET_PURCHASE_INVOICE_DETAILS,
    DELETE_PURCHASE_INVOICE,
    FETCH_PROCUREMENT_BY_SHIPMENT_ID_AND_INVOICE_ID
} from "./actionTypes";

export const createProcurement = ({ purchaseOrder, invoice, shipment, procurementItems }) => ({
    type: CREATE_PROCUREMENT,
    payload: {
        purchaseOrder, invoice, shipment, procurementItems
    }
});

export const updateProcurement = ({ purchaseOrder, invoice, shipment, procurementItems }) => ({
    type: UPDATE_PROCUREMENT,
    payload: {
        purchaseOrder, invoice, shipment, procurementItems
    }
});

export const setPurchaseInvoiceDetails = product => ({
    type: SET_PURCHASE_INVOICE_DETAILS,
    payload: {
        data: product
    }
});

export const fetchPurchaseInvoiceById = (id) => ({
    type: FETCH_PURCHASE_INVOICE,
    payload: id
});

export const createPurchaseInvoice = payload => ({
    type: CREATE_PURCHASE_INVOICE,
    payload: {
        ...payload
    }
});

export const updatePurchaseInvoice = ({id, form}) => ({
    type: UPDATE_PURCHASE_INVOICE,
    payload: {
        id, form
    }
});

export const deletePurchaseInvoice = id => ({
    type: DELETE_PURCHASE_INVOICE,
    payload: {
        id
    }
});

export const setPurchaseInvoiceInvalidName = enabled => ({
    type: INVALID_NAME,
    payload: {
        invalidName: enabled
    }
});

export const setPurchaseInvoiceInvalidDescription = enabled => ({
    type: INVALID_DESCRIPTION,
    payload: {
        invalidDescription: enabled
    }
});

export const resetPurchaseInvoiceDetails = () => ({
    type: RESET_PURCHASE_INVOICE_DETAILS
});

export const setPurchaseInvoiceSupplier = supplier => ({
    type: SET_PURCHASE_INVOICE_SUPPLIER,
    payload: { supplier }
});

export const setPurchaseInvoiceInvoiceDate = generatedOn => ({
    type: SET_PURCHASE_INVOICE_INVOICE_DATE,
    payload: {
        generatedOn: generatedOn
    }
});

export const setPurchaseInvoiceInvoiceNumber = invoiceNumber => ({
    type: SET_PURCHASE_INVOICE_INVOICE_NUMBER,
    payload: {
        invoiceNumber: invoiceNumber
    }
});

export const setPurchaseInvoiceDueDate = paymentDueDate => ({
    type: SET_PURCHASE_INVOICE_DUE_DATE,
    payload: {
        paymentDueDate: paymentDueDate
    }
});

export const setPurchaseInvoicePurchaseOrder = orderNumber => ({
    type: SET_PURCHASE_INVOICE_PURCHASE_ORDER,
    payload:{ orderNumber }
});

export const setPurchaseInvoiceItems = procurementItems => ({
    type: SET_PURCHASE_INVOICE_ITEMS,
    payload: {
        procurementItems
    }
});

export const setInvalidInvoiceSupplier = enabled => ({
    type: INVALID_PURCHASE_INVOICE_SUPPLIER,
    payload: {
        invalidSupplier: enabled
    }
});

export const setInvalidInvoiceDate = enabled => ({
    type: INVALID_PURCHASE_INVOICE_GENERATED_ON,
    payload: {
        invalidGeneratedOn: enabled
    }
});

export const setInvalidInvoiceNumber = enabled => ({
    type: INVALID_PURCHASE_INVOICE_INVOICE_NUMBER,
    payload: {
        invalidInvoiceNumber: enabled
    }
});

export const setInvalidDueDate = enabled => ({
    type: INVALID_PURCHASE_INVOICE_PAYMENT_DUE_DATE,
    payload: {
        invalidPaymentDueDate: enabled
    }
});

export const setPurchaseInvoiceError = error => ({
    type: SET_PURCHASE_INVOICE_DETAILS,
    payload: {
        ...error
    }
});

export const createPurchaseOrder = purchaseOrder => ({
    type: CREATE_PURCHASE_ORDER,
    payload: {
        ...purchaseOrder
    }
});

export const updatePurchaseOrder = purchaseOrder => ({
    type: UPDATE_PURCHASE_ORDER,
    payload: {
        ...purchaseOrder
    }
});

export const setInvalidPurchaseOrder = enabled => ({
    type: INVALID_PURCHASE_INVOICE_PURCHASE_ORDER,
    payload: {
        invalidPurchaseOrder: enabled
    }
});

export const fetchProcuementByShipmentIdAndInvoiceId = (shipmentId, invoiceId) => ({
    type: FETCH_PROCUREMENT_BY_SHIPMENT_ID_AND_INVOICE_ID,
    payload: {
        shipmentId, invoiceId
    }
});