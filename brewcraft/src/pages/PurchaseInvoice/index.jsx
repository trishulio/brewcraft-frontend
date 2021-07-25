import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchPurchaseInvoiceById,
    createPurchaseInvoice,
    updatePurchaseInvoice,
    deletePurchaseInvoice,
    fetchAllMaterialCategories,
    resetPurchaseInvoiceDetails,
    fetchAllSuppliers,
    fetchAllIngredients,
    fetchAllPackaging
} from "../../store/actions";
import PurchaseInvoiceInner from "./purchase-invoice";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function PurchaseInvoice() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const invoice = useSelector(state => {
        return state.PurchaseInvoice.data;
    });

    const initialInvoice = useSelector(state => {
        return state.PurchaseInvoice.initial;
    });

    const { invalidInvoiceNumber } = useSelector(state => {
        return state.PurchaseInvoice
    });

    useEffect(() => {
        if (id === "new") {
            dispatch(resetPurchaseInvoiceDetails());
            history.replace("/purchases/invoices/new?edit=true");
        } else {
            fetch(id);
        }
        setEditable(editMode && editMode !== "false");
    }, [id, editMode]);

    useEffect(() => {
        dispatch(fetchAllMaterialCategories());
        dispatch(fetchAllSuppliers());
        dispatch(fetchAllIngredients());
        dispatch(fetchAllPackaging());
    }, [invoice]);

    useEffect(() => {
        if (invoice.id) {
            dispatch(setBreadcrumbItems("Invoice: " + invoice.invoiceNumber, [
                { title: "Main", link: "#" },
                { title: "Purchase Invoices", link: "#" }]
            ));
        } else {
            dispatch(setBreadcrumbItems("New Invoice", [
                { title: "Main", link: "#" },
                { title: "Purchase Invoices", link: "#" }]
            ));
        }
        setChanged(isChanged());
    }, [invoice]);

    function isChanged() {
        return JSON.stringify(
                (({ id, invoiceNumber, purchaseOrder, description, freight, generatedOn, receivedOn, paymentDueDate, statusId, selectedSupplier, items, version  }) => ({ id, invoiceNumber, purchaseOrder, description, freight, generatedOn, receivedOn, paymentDueDate, statusId, selectedSupplier, items, version }))(initialInvoice))
            !== JSON.stringify(
                (({ id, invoiceNumber, purchaseOrder, description, freight, generatedOn, receivedOn, paymentDueDate, statusId, selectedSupplier, items, version }) => ({ id, invoiceNumber, purchaseOrder, description, freight, generatedOn, receivedOn, paymentDueDate, statusId, selectedSupplier, items, version }))(invoice))
    }

    function onSave() {
        if (invalidInvoiceNumber) {
            return;
        }
        if (!isChanged()) {
            history.push("/purchases/invoices/" + id);

        } else if (invoice.id) {
            dispatch(
                updatePurchaseInvoice({
                    id: invoice.id,
                    form: {
                        invoiceNumber: invoice.invoiceNumber,
                        description: invoice.description,
                        freight: {
                            amount: {
                                currency: "CAD",
                                amount: 0
                            }
                        },
                        generatedOn: invoice.generatedOn + "T00:00:00.001Z",
                        receivedOn: null,
                        paymentDueDate: invoice.paymentDueDate + "T00:00:00.001Z",
                        statusId: 1,
                        items: invoice.items.map(item => {
                            return {
                                id: item.id,
                                description: item.description,
                                quantity: {
                                    symbol: item.material.baseQuantityUnit,
                                    value: parseFloat(item.quantity.value)
                                },
                                price: {
                                    currency: "CAD",
                                    amount: parseFloat(item.price.amount)
                                },
                                tax: {
                                    amount: {
                                        currency: "CAD",
                                        amount: parseFloat(item.tax.amount.amount) || 0
                                    }
                                },
                                materialId: item.material.id,
                                version: item.version
                            }
                        }),
                        version: invoice.version
                    },
                    success: invoice => {
                        history.push("/purchases/invoices/" + invoice.id);
                    }
                })
            );
        } else {
            dispatch(
                createPurchaseInvoice({
                    form: {
                        invoice: {
                            purchaseOrderId: null,
                            invoiceNumber: invoice.invoiceNumber,
                            description: invoice.description,
                            freight: {
                                amount: {
                                    currency: "CAD",
                                    amount: 0
                                }
                            },
                            generatedOn: invoice.generatedOn + "T00:00:00.001Z",
                            receivedOn: null,
                            paymentDueDate: invoice.paymentDueDate + "T00:00:00.001Z",
                            statusId: 1,
                            items: invoice.items.map(item => {
                                return {
                                    description: item.description,
                                    quantity: {
                                        symbol: item.material.baseQuantityUnit,
                                        value: parseFloat(item.quantity.value)
                                    },
                                    price: {
                                        currency: "CAD",
                                        amount: parseFloat(item.price.amount)
                                    },
                                    tax: {
                                        amount: {
                                            currency: "CAD",
                                            amount: parseFloat(item.tax.amount.amount) || 0
                                        }
                                    },
                                    materialId: item.material.id
                                }
                            })
                        },
                        purchaseOrder: {
                            orderNumber: "1",
                            supplierId: invoice.selectedSupplier.id
                        }
                    },
                    success: invoice => {
                        history.push("/purchases/invoices/" + invoice.id);
                    }
                })
            );
        }
    }

    function onDelete() {
        if (invoice.id) {
            dispatch(deletePurchaseInvoice({
                id: id,
                success: () => {
                    history.push("/purchases/invoices");
                }
            }));
        }
    }

    function fetch(id) {
        dispatch(fetchPurchaseInvoiceById(id));
    }

    return (
        <PurchaseInvoiceInner {...{editable, changed, onSave, onDelete}} />
    );
}