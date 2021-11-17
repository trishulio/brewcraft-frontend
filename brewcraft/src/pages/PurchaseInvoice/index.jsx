import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";
import {
    useQuery
} from "../../helpers/utils";
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
    fetchAllPackaging,
    setInvalidInvoiceSupplier,
    setInvalidInvoiceDate,
    setInvalidDueDate,
    setInvalidInvoiceNumber,
    setPurchaseInvoiceError
} from "../../store/actions";
import PurchaseInvoiceInner from "./invoice";

export default function PurchaseInvoice() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const {
        data: invoice,
        initial: initialInvoice,
        invalidSupplier,
        invalidGeneratedOn,
        invalidInvoiceNumber,
        invalidPaymentDueDate,
        invalidPurchaseOrder
    } = useSelector(state => {
        return state.PurchaseInvoice;
    });

    useEffect(() => {

        dispatch(resetPurchaseInvoiceDetails());

        if (id === "new") {
            history.replace("/purchases/invoices/new?edit=true");
        } else {
            dispatch(fetchPurchaseInvoiceById(id));
        }
        if (editMode) {
            dispatch(fetchAllMaterialCategories());
            dispatch(fetchAllSuppliers());

            dispatch(fetchAllIngredients());
            dispatch(fetchAllPackaging());
        }
        setEditable(editMode && editMode !== "false");
        setShowRouterPrompt(!!editMode);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode]);

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoice]);

    function isChanged() {
        return JSON.stringify(
                (({ id, invoiceNumber, purchaseOrder, description, freight, generatedOn, receivedOn, paymentDueDate, statusId, selectedSupplier, items, version  }) => ({ id, invoiceNumber, purchaseOrder, description, freight, generatedOn, receivedOn, paymentDueDate, statusId, selectedSupplier, items, version }))(initialInvoice))
            !== JSON.stringify(
                (({ id, invoiceNumber, purchaseOrder, description, freight, generatedOn, receivedOn, paymentDueDate, statusId, selectedSupplier, items, version }) => ({ id, invoiceNumber, purchaseOrder, description, freight, generatedOn, receivedOn, paymentDueDate, statusId, selectedSupplier, items, version }))(invoice))
    }

    function onSave() {
        if (!isChanged()) {
            history.push({
                search: ""
            });
        } else {
            _save();
        }
    }

    function _save() {
        const params = {
            purchaseOrder: {
                orderNumber: invoice.purchaseOrder.orderNumber || undefined,
                supplierId: invoice.purchaseOrder.supplier.id
            },
            procurementItems: invoice.items.map(item => {
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
                    materialId: item.material.id,
                    lotNumber: item.lotNumber || undefined
                }
            }),
            shipmentStatusId: 1, // delivered
            shipmentNumber: invoice.shipmentNumber || undefined,
            invoiceStatusId: 1, // paid
            description: invoice.description,
            invoiceNumber: invoice.invoiceNumber,
            freight: {
                amount: {
                    currency: "CAD",
                    amount: 0
                }
            },
            generatedOn: invoice.generatedOn + "T00:00:00.001Z",
            paymentDueDate: invoice.paymentDueDate + "T00:00:00.001Z",
        };
        if (invoice.id) {
            dispatch(
                updatePurchaseInvoice({
                    form: [{
                        id: invoice.id,
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
                        invoiceItems: invoice.items.map(item => {
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
                        purchaseOrderId: invoice.purchaseOrder.id,
                        version: invoice.version
                    }]
                })
            );
        } else {
            dispatch(createPurchaseInvoice({
                form: [params]
            }));
        }
    }

    function onDelete() {
        setShowDeletePrompt(!!invoice.id);
    }

    const props = {
        editable,
        changed,
        onSave,
        onDelete
    }

    return (
        <React.Fragment>
            <DeleteGuard
                    when={showDeletePrompt}
                    confirm={() => {
                        dispatch(deletePurchaseInvoice(invoice.id));
                        setShowRouterPrompt(false);
                    }}
                    close={() => {
                        setShowDeletePrompt(false);
                    }}
                    content="This cannot be undone. Are you sure want to delete this invoice?"
                />
                <RouteLeavingGuard
                    when={showRouterPrompt}
                    navigate={path => {
                        history.push(path);
                    }}
                    shouldBlockNavigation={() => editMode && isChanged()}
                    content="There are unsaved changes. Are you sure want to leave this page?"
                />
            <PurchaseInvoiceInner {...props} />
        </React.Fragment>
    );
}