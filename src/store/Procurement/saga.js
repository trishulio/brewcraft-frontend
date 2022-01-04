import {
    SET_PURCHASE_INVOICE_DETAILS,
    FETCH_PURCHASE_INVOICE,
    CREATE_PURCHASE_INVOICE,
    UPDATE_PURCHASE_INVOICE,
    DELETE_PURCHASE_INVOICE,
    UPDATE_PURCHASE_ORDER,
    INVALID_PURCHASE_INVOICE_SUPPLIER,
    INVALID_PURCHASE_INVOICE_GENERATED_ON,
    INVALID_PURCHASE_INVOICE_INVOICE_NUMBER,
    INVALID_PURCHASE_INVOICE_PAYMENT_DUE_DATE,
    SET_PURCHASE_INVOICE_DUE_DATE,
    SET_PURCHASE_INVOICE_SUPPLIER,
    SET_PURCHASE_INVOICE_INVOICE_NUMBER,
    SET_PURCHASE_INVOICE_INVOICE_DATE,
    SET_PURCHASE_INVOICE_ERROR,
    SET_PURCHASE_INVOICE_ITEMS,
    CREATE_PROCUREMENT,
    UPDATE_PROCUREMENT,
    FETCH_PROCUREMENT_BY_SHIPMENT_ID_AND_INVOICE_ID,
    UPDATE_PURCHASE_ORDER_SUCCESS,
    SET_PURCHASE_INVOICE_STATUS,
    INVALID_PURCHASE_INVOICE_STATUS,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import { get, map } from "lodash";
import {
    validAmount,
    validDate,
    validId,
    validInvoiceNumber,
} from "../../helpers/utils";
import { snackSuccess } from "../Snackbar/actions";
import { setGlobalRedirect } from "../Brewery/actions";
import { api } from "./api";

function validInvoice({ invoice, purchaseOrder }) {
    return (
        validId(purchaseOrder.supplier.id) &&
        validInvoiceNumber(invoice.invoiceNumber) &&
        validDate(invoice.generatedOn) &&
        (!invoice.paymentDueDate || validDate(invoice.paymentDueDate))
    );
}

function* validatePurchaseInvoiceSupplierGenerator(action) {
    yield put({
        type: INVALID_PURCHASE_INVOICE_SUPPLIER,
        payload: {
            invalidSupplier: !validId(get(action, "payload.supplier.id")),
        },
    });
}

function* validatePurchaseInvoiceInvoiceNumberGenerator(action) {
    yield put({
        type: INVALID_PURCHASE_INVOICE_INVOICE_NUMBER,
        payload: {
            invalidInvoiceNumber: !validInvoiceNumber(
                get(action, "payload.invoiceNumber")
            ),
        },
    });
}

function* validatePurchaseInvoiceGeneratedOnGenerator(action) {
    yield put({
        type: INVALID_PURCHASE_INVOICE_GENERATED_ON,
        payload: {
            invalidGeneratedOn: !validDate(get(action, "payload.generatedOn")),
        },
    });
}

function* validatePurchaseInvoicePaymentDateDueGenerator(action) {
    yield put({
        type: INVALID_PURCHASE_INVOICE_PAYMENT_DUE_DATE,
        payload: {
            invalidPaymentDueDate: !validDate(
                get(action, "payload.paymentDueDate")
            ),
        },
    });
}

function* validatePurchaseInvoiceStatusGenerator(action) {
    yield put({
        type: INVALID_PURCHASE_INVOICE_STATUS,
        payload: {
            invalidStatus: !validId(get(action, "payload.id")),
        },
    });
}

function* fetchPurchaseInvoiceByIdGenerator(action) {
    try {
        const res = yield call(
            api.fetchPurchaseInvoiceById,
            get(action, "payload")
        );
        const data = {
            ...res.data,
            generatedOn: res.data.generatedOn?.split("T")[0],
            paymentDueDate: res.data.paymentDueDate?.split("T")[0],
            items: res.data.invoiceItems,
        };
        delete data.invoiceItems;
        yield put({
            type: SET_PURCHASE_INVOICE_DETAILS,
            payload: { data: data, initial: data },
        });
    } catch (e) {
        yield put({
            type: SET_PURCHASE_INVOICE_ERROR,
            payload: { error: true },
        });
    }
}

function* createPurchaseInvoiceGenerator(action) {
    try {
        if (!validInvoice(get(action, "payload.form[0]"))) {
            yield put({
                type: SET_PURCHASE_INVOICE_ERROR,
                payload: {
                    invalidInvoiceNumber: !validInvoiceNumber(
                        get(action, "payload.form[0].invoice.invoiceNumber")
                    ),
                    invalidSupplier: !validId(
                        get(action, "payload.form[0].purchaseOrder.supplierId")
                    ),
                    invalidGeneratedOn: !validDate(
                        get(action, "payload.form[0].invoice.generatedOn")
                    ),
                    invalidPaymentDueDate: !validDate(
                        get(action, "payload.form[0].invoice.paymentDueDate")
                    ),
                },
            });
            const temp = get(action, "payload.form[0].procurementItems");
            const items = [...temp];
            map(items, (value, index) => {
                items[index] = {
                    ...items[index],
                    invalidMaterial: !validId(value.material.id),
                    invalidQuantity: !validAmount(value.quantity.value),
                    invalidPrice: !validAmount(value.price.amount),
                    invalidTax: !validAmount(value.tax.amount.amount),
                    invalidLotNumber: !validAmount(value.materialLot.lotNumber),
                };
            });
            yield put({ type: SET_PURCHASE_INVOICE_ITEMS, payload: { items } });
            yield put({
                type: SET_PURCHASE_INVOICE_ERROR,
                payload: { error: true },
            });
        } else {
            let res;
            res = yield call(api.postProcurements, get(action, "payload.form"));
            const data = {
                ...res.data[0],
                items: res.data[0].procurementItems,
            };
            delete data.procurementItems;
            yield put({
                type: SET_PURCHASE_INVOICE_DETAILS,
                payload: { data: data, initial: data, error: false },
            });
            yield put(
                setGlobalRedirect({
                    pathname: "/purchases/invoices/" + res.data.id,
                })
            );
        }
    } catch (e) {
        yield put({
            type: SET_PURCHASE_INVOICE_ERROR,
            payload: { error: true },
        });
    }
}

function* udpatePurchaseInvoiceGenerator(action) {
    try {
        const res = yield call(
            api.putPurchaseInvoice,
            get(action, "payload.form")
        );
        const data = {
            ...res.data[0],
            generatedOn: res.data[0].generatedOn?.split("T")[0],
            paymentDueDate: res.data[0].paymentDueDate?.split("T")[0],
            items: res.data[0].invoiceItems,
        };
        delete data.invoiceItems;
        yield put({
            type: SET_PURCHASE_INVOICE_DETAILS,
            payload: { data: data, initial: data },
        });
        yield put(
            snackSuccess(
                `Updated purchase invoice ${get(action, "payload.form.name")}.`
            )
        );
    } catch (e) {
        yield put({
            type: SET_PURCHASE_INVOICE_ERROR,
            payload: { error: true },
        });
    }
}

function* deletePurchaseInvoiceGenerator(action) {
    try {
        yield call(api.deletePurchaseInvoice, get(action, "payload.id"));
        yield put(setGlobalRedirect({ pathname: "/purchases/invoices" }));
        yield put(snackSuccess("Deleted purchase invoice."));
    } catch (e) {
        yield put({
            type: SET_PURCHASE_INVOICE_ERROR,
            payload: { error: true },
        });
    }
}

function* createProcurementGenerator(action) {
    try {
        if (validInvoice(get(action, "payload"))) {
            let res, params;
            params = { ...get(action, "payload.purchaseOrder") };
            params.supplierId = params.supplier.id;
            delete params.supplier;
            res = yield call(api.postPurchaseOrders, [params]);
            params = { ...get(action, "payload") };
            params.invoice.purchaseOrderId = res.data[0].id;
            delete params.purchaseOrder;
            delete params.shipment;
            // backend requires us to set shipment to empty object {}
            params.shipment = {};
            res = yield call(api.postProcurements, [params]);
            const purchaseOrder = { ...res.data[0].invoice.purchaseOrder };
            delete res.data[0].invoice.purchaseOrder;
            const data = {
                ...res.data[0],
                invoice: {
                    ...res.data[0].invoice,
                    generatedOn: res.data[0].invoice.generatedOn?.split("T")[0],
                    paymentDueDate:
                        res.data[0].invoice.paymentDueDate?.split("T")[0],
                },
                purchaseOrder,
            };
            yield put({
                type: SET_PURCHASE_INVOICE_DETAILS,
                payload: { data: data, initial: data, error: false },
            });
            yield put(
                setGlobalRedirect({
                    pathname: `/purchases/invoices/${res.data[0].shipment.id}/${res.data[0].invoice.id}`,
                })
            );
        } else {
            yield put({
                type: SET_PURCHASE_INVOICE_ERROR,
                payload: {
                    invalidInvoiceNumber: !validInvoiceNumber(
                        get(action, "payload.form[0].invoice.invoiceNumber")
                    ),
                    invalidSupplier: !validId(
                        get(action, "payload.form[0].purchaseOrder.supplierId")
                    ),
                    invalidGeneratedOn: !validDate(
                        get(action, "payload.form[0].invoice.generatedOn")
                    ),
                    invalidPaymentDueDate: !validDate(
                        get(action, "payload.form[0].invoice.paymentDueDate")
                    ),
                },
            });
            const temp = get(action, "payload.form[0].procurementItems");
            const items = [...temp];
            map(items, (value, index) => {
                items[index] = {
                    ...items[index],
                    invalidMaterial: !validId(value.material.id),
                    invalidQuantity: !validAmount(value.quantity.value),
                    invalidPrice: !validAmount(value.price.amount),
                    invalidTax: !validAmount(value.tax.amount.amount),
                    invalidLotNumber: !validAmount(value.materialLot.lotNumber),
                };
            });
            yield put({ type: SET_PURCHASE_INVOICE_ITEMS, payload: { items } });
            yield put({
                type: SET_PURCHASE_INVOICE_ERROR,
                payload: { error: true },
            });
        }
    } catch (e) {
        yield put({
            type: SET_PURCHASE_INVOICE_ERROR,
            payload: { error: true },
        });
    }
}

function* updateProcurementGenerator(action) {
    try {
        if (validInvoice(get(action, "payload"))) {
            let res, params;
            params = { ...get(action, "payload") };
            params.invoice.purchaseOrderId = params.purchaseOrder.id;
            delete params.purchaseOrder;
            res = yield call(api.putProcurements, [params]);
            const purchaseOrder = { ...res.data[0].invoice.purchaseOrder };
            delete res.data[0].invoice.purchaseOrder;
            const data = {
                ...res.data[0],
                invoice: {
                    ...res.data[0].invoice,
                    generatedOn: res.data[0].invoice.generatedOn?.split("T")[0],
                    paymentDueDate:
                        res.data[0].invoice.paymentDueDate?.split("T")[0],
                },
                purchaseOrder,
            };
            yield put({
                type: SET_PURCHASE_INVOICE_DETAILS,
                payload: { data: data, initial: data, error: false },
            });
            yield put(
                setGlobalRedirect({
                    pathname: `/purchases/invoices/${res.data[0].shipment.id}/${res.data[0].invoice.id}`,
                })
            );
        } else {
            yield put({
                type: SET_PURCHASE_INVOICE_ERROR,
                payload: {
                    invalidInvoiceNumber: !validInvoiceNumber(
                        get(action, "payload.invoice.invoiceNumber")
                    ),
                    invalidSupplier: !validId(
                        get(action, "payload.purchaseOrder.supplier.id")
                    ),
                    invalidGeneratedOn: !validDate(
                        get(action, "payload.invoice.generatedOn")
                    ),
                    invalidPaymentDueDate: !validDate(
                        get(action, "payload.invoice.paymentDueDate")
                    ),
                    invalidStatus: !get(
                        action,
                        "payload.invoice.invoiceStatusId"
                    ),
                },
            });
            const temp = get(action, "payload.procurementItems");
            const items = [...temp];
            map(items, (value, index) => {
                items[index] = {
                    ...items[index],
                    invoiceItem: {
                        ...items[index].invoiceItem,
                        material: {
                            id: value.invoiceItem.materialId,
                        },
                        invalidDescription:
                            value.invoiceItem.description.length === 0,
                        invalidMaterial: !validId(value.invoiceItem.materialId),
                        invalidQuantity: !validAmount(
                            value.invoiceItem.quantity.value
                        ),
                        invalidPrice: !validAmount(
                            value.invoiceItem.price.amount
                        ),
                        invalidTax: !validAmount(
                            value.invoiceItem.tax.amount.amount
                        ),
                    },
                    materialLot: {
                        ...items[index].materialLot,
                        invalidLotNumber: !value.materialLot.lotNumber,
                    },
                };
            });
            yield put({
                type: SET_PURCHASE_INVOICE_ITEMS,
                payload: { procurementItems: items },
            });
            yield put({
                type: SET_PURCHASE_INVOICE_ERROR,
                payload: { error: true },
            });
        }
    } catch (e) {
        yield put({
            type: SET_PURCHASE_INVOICE_ERROR,
            payload: { error: true },
        });
    }
}

function* fetchProcurementGenerator(action) {
    try {
        const res = yield call(
            api.fetchProcurement,
            get(action, "payload.shipmentId"),
            get(action, "payload.invoiceId")
        );
        const purchaseOrder = { ...res.data.invoice.purchaseOrder };
        delete res.data.invoice.purchaseOrder;
        const data = {
            ...res.data,
            invoice: {
                ...res.data.invoice,
                generatedOn: res.data.invoice.generatedOn?.split("T")[0],
                paymentDueDate: res.data.invoice.paymentDueDate?.split("T")[0],
            },
            purchaseOrder,
        };
        yield put({
            type: SET_PURCHASE_INVOICE_DETAILS,
            payload: { data: data, initial: data },
        });
    } catch (e) {
        yield put({
            type: SET_PURCHASE_INVOICE_ERROR,
            payload: { error: true },
        });
    }
}

function* updatePurchaseOrderGenerator(action) {
    try {
        const res = yield call(api.putPurchaseOrders, [get(action, "payload")]);
        yield put({
            type: UPDATE_PURCHASE_ORDER_SUCCESS,
            payload: res.data[0],
        });
    } catch (e) {
        yield put({
            type: SET_PURCHASE_INVOICE_ERROR,
            payload: { error: true },
        });
    }
}

function* Procurement() {
    yield takeEvery(CREATE_PURCHASE_INVOICE, createPurchaseInvoiceGenerator);
    yield takeEvery(FETCH_PURCHASE_INVOICE, fetchPurchaseInvoiceByIdGenerator);
    yield takeEvery(UPDATE_PURCHASE_INVOICE, udpatePurchaseInvoiceGenerator);
    yield takeEvery(DELETE_PURCHASE_INVOICE, deletePurchaseInvoiceGenerator);
    yield takeEvery(
        SET_PURCHASE_INVOICE_SUPPLIER,
        validatePurchaseInvoiceSupplierGenerator
    );
    yield takeEvery(
        SET_PURCHASE_INVOICE_INVOICE_NUMBER,
        validatePurchaseInvoiceInvoiceNumberGenerator
    );
    yield takeEvery(
        SET_PURCHASE_INVOICE_INVOICE_DATE,
        validatePurchaseInvoiceGeneratedOnGenerator
    );
    yield takeEvery(
        SET_PURCHASE_INVOICE_DUE_DATE,
        validatePurchaseInvoicePaymentDateDueGenerator
    );
    yield takeEvery(
        SET_PURCHASE_INVOICE_STATUS,
        validatePurchaseInvoiceStatusGenerator
    );
    yield takeEvery(CREATE_PROCUREMENT, createProcurementGenerator);
    yield takeEvery(UPDATE_PROCUREMENT, updateProcurementGenerator);
    yield takeEvery(
        FETCH_PROCUREMENT_BY_SHIPMENT_ID_AND_INVOICE_ID,
        fetchProcurementGenerator
    );
    yield takeEvery(UPDATE_PURCHASE_ORDER, updatePurchaseOrderGenerator);
}

export default Procurement;
