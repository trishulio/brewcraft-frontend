import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";
import { useQuery } from "../../helpers/utils";
import {
    setBreadcrumbItems,
    fetchProcuementByShipmentIdAndInvoiceId,
    createProcurement,
    updateProcurement,
    deletePurchaseInvoice,
    fetchAllMaterialCategories,
    resetPurchaseInvoiceDetails,
    fetchAllSuppliers,
    fetchAllIngredients,
    fetchAllPackaging,
    updatePurchaseOrder,
} from "../../store/actions";
import PurchaseInvoiceInner from "./invoice";

export default function PurchaseInvoice() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

    const { shipmentId, invoiceId } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const {
        invoice,
        shipment,
        purchaseOrder,
        procurementItems: items,
    } = useSelector((state) => {
        return state.Procurement.data;
    });

    const { data: procurement, initial: initialProcurement } = useSelector(
        (state) => {
            return state.Procurement;
        }
    );

    useEffect(() => {
        dispatch(resetPurchaseInvoiceDetails());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!shipmentId || !invoiceId) {
            history.replace("/purchases/invoices/new?edit=true");
        } else if (shipmentId && invoiceId) {
            dispatch(
                fetchProcuementByShipmentIdAndInvoiceId(shipmentId, invoiceId)
            );
        }
        if (editMode) {
            dispatch(fetchAllMaterialCategories());
            dispatch(fetchAllSuppliers());
            dispatch(fetchAllIngredients());
            dispatch(fetchAllPackaging());
        }
        setEditable(editMode && editMode !== "false");
        setShowRouterPrompt(!!editMode);
        // eslint-disable-next-line
    }, [shipmentId, invoiceId, editMode]);

    useEffect(() => {
        if (invoice.id) {
            dispatch(
                setBreadcrumbItems("Invoice: " + invoice.invoiceNumber, [
                    { title: "Main", link: "#" },
                    { title: "Purchases", link: "#" },
                ])
            );
        } else {
            dispatch(
                setBreadcrumbItems("New Invoice", [
                    { title: "Main", link: "#" },
                    { title: "Purchases", link: "#" },
                ])
            );
        }
        setChanged(isChanged());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [procurement]);

    function isChanged() {
        return (
            JSON.stringify(procurement) !== JSON.stringify(initialProcurement)
        );
    }

    function isPurchaseOrderChanged() {
        return (
            JSON.stringify(
                (({ purchaseOrder }) => ({ purchaseOrder }))(procurement)
            ) !==
            JSON.stringify(
                (({ purchaseOrder }) => ({ purchaseOrder }))(initialProcurement)
            )
        );
    }

    function onSave() {
        if (!isChanged()) {
            history.push({
                search: "",
            });
        } else {
            _savePurchaseOrder();
            _saveProcurement();
        }
    }

    function _savePurchaseOrder() {
        if (purchaseOrder.id && isPurchaseOrderChanged()) {
            dispatch(
                updatePurchaseOrder({
                    id: purchaseOrder.id,
                    orderNumber: purchaseOrder.orderNumber,
                    supplierId: purchaseOrder.supplier.id,
                    version: purchaseOrder.version,
                })
            );
        }
    }

    function _saveProcurement() {
        const params = {
            invoice: {
                id: invoice.id || undefined,
                invoiceNumber: invoice.invoiceNumber,
                description: invoice.description,
                freight: {
                    amount: {
                        currency: "CAD",
                        amount: 0,
                    },
                },
                generatedOn: invoice.generatedOn + "T00:00:00.001Z",
                receivedOn: invoice.generatedOn + "T00:00:00.001Z",
                paymentDueDate: invoice.paymentDueDate + "T00:00:00.001Z",
                invoiceStatusId: 1, // paid
                version: invoice.id ? invoice.version : undefined,
            },
            purchaseOrder: purchaseOrder,
            shipment: {
                id: shipment.id || undefined,
                shipmentNumber: shipment.shipmentNumber,
                description: shipment.description,
                shipmentStatusId: shipment.statusId, // delivered
                deliveryDueDate: shipment.deliveryDueDate,
                deliveredDate: shipment.deliveredDate,
                version: shipment.id ? shipment.version : undefined,
            },
            procurementItems: items.map(({ invoiceItem, materialLot }) => ({
                invoiceItem: {
                    id: invoiceItem.id || undefined,
                    description: invoiceItem.description,
                    quantity: {
                        symbol: invoiceItem.material.baseQuantityUnit,
                        value: parseFloat(invoiceItem.quantity.value),
                    },
                    price: {
                        currency: "CAD",
                        amount: parseFloat(invoiceItem.price.amount),
                    },
                    tax: {
                        amount: {
                            currency: "CAD",
                            amount: parseFloat(invoiceItem.tax.amount.amount),
                        },
                    },
                    materialId: invoiceItem.material.id,
                    version: invoiceItem.id ? invoiceItem.version : undefined,
                },
                materialLot: {
                    id: materialLot?.id,
                    lotNumber: materialLot.lotNumber,
                    storageId: undefined,
                    quantity: {
                        symbol: invoiceItem.material.baseQuantityUnit,
                        value: parseFloat(invoiceItem.quantity.value),
                    },
                    version: materialLot?.id ? materialLot.version : undefined,
                },
            })),
        };
        if (invoice.id) {
            dispatch(updateProcurement(params));
        } else {
            dispatch(createProcurement(params));
        }
    }

    function onDelete() {
        setShowDeletePrompt(!!invoice.id);
    }

    const props = {
        editable,
        changed,
        onSave,
        onDelete,
    };

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
                navigate={(path) => {
                    history.push(path);
                }}
                shouldBlockNavigation={() => editMode && isChanged()}
                content="There are unsaved changes. Are you sure want to leave this page?"
            />
            <PurchaseInvoiceInner {...props} />
        </React.Fragment>
    );
}
