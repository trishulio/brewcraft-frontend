import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Table, { Th } from "../../../component/Common/table";
import { formatCurrency, formatDate } from "../../../helpers/textUtils";
import { useQuery } from "../../../helpers/utils";

let INVOICE_STATUS = ["Unpaid", "Paid"];

export default function PurchaseInvoicesTable() {
    const history = useHistory();
    const query = useQuery();

    const procurements = useSelector((state) => {
        return state.Procurements.content;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        let order = query.get("order");
        query.delete("sort");
        query.delete("order");
        switch (name) {
            case "purchaseInvoiceNumber":
                if (sort !== "invoice.invoiceNumber") {
                    order = undefined;
                }
                query.append("sort", "invoice.invoiceNumber");
                break;
            case "purchaseInvoiceSupplier":
                if (sort !== "invoice.purchaseOrder.supplier.name") {
                    order = undefined;
                }
                query.append("sort", "invoice.purchaseOrder.supplier.name");
                break;
            case "purchaseInvoiceDate":
                if (sort !== "invoice.generatedOn") {
                    order = undefined;
                }
                query.append("sort", "invoice.generatedOn");
                break;
            case "purchaseInvoicePaymentDue":
                if (sort !== "invoice.paymentDueDate") {
                    order = undefined;
                }
                query.append("sort", "invoice.paymentDueDate");
                break;
            case "purchaseInvoiceAmount":
                if (sort !== "invoice.amount.total.amount") {
                    order = undefined;
                }
                query.append("sort", "invoice.amount.total.amount");
                break;

            case "purchaseInvoiceStatus":
                if (sort !== "invoice.invoiceStatus.name") {
                    order = undefined;
                }
                query.append("sort", "invoice.invoiceStatus.name");
                break;
            default:
                break;
        }
        if (!order || order !== "asc") {
            query.append("order", "asc");
        } else {
            query.append("order", "desc");
        }
        history.push({ search: query.toString() });
    }

    return (
        <React.Fragment>
            <Table hover tableLayout="fixed">
                <thead>
                    <tr>
                        <Th
                            name="purchaseInvoiceNumber"
                            id="invoiceNumber"
                            onSort={onSort}
                            width="20%"
                        >
                            Number
                        </Th>
                        <Th
                            name="purchaseInvoiceSupplier"
                            id="supplier"
                            onSort={onSort}
                        >
                            Supplier
                        </Th>
                        <Th
                            name="purchaseInvoiceDate"
                            id="invoiceDate"
                            onSort={onSort}
                        >
                            Date
                        </Th>
                        <Th
                            name="purchaseInvoicePaymentDue"
                            id="paymentDue"
                            onSort={onSort}
                        >
                            Payment Due
                        </Th>
                        <Th
                            name="purchaseInvoiceAmount"
                            id="amount"
                            onSort={onSort}
                        >
                            Amount
                        </Th>
                        <Th
                            name="purchaseInvoiceStatus"
                            id="status"
                            onSort={onSort}
                        >
                            Status
                        </Th>
                    </tr>
                </thead>
                <tbody>
                    {procurements.map((procurement, key) => (
                        <tr
                            key={key}
                            onClick={() =>
                                history.push(
                                    `/purchases/invoices/${procurement.shipment.id}/${procurement.invoice.id}`
                                )
                            }
                        >
                            <td>{procurement.invoice.invoiceNumber}</td>
                            <td>
                                {
                                    procurement.invoice.purchaseOrder.supplier
                                        .name || "-" /* bug */
                                }
                            </td>
                            <td>
                                {formatDate(procurement.invoice.generatedOn)}
                            </td>
                            <td>
                                {formatDate(procurement.invoice.paymentDueDate)}
                            </td>
                            <td>
                                {formatCurrency(
                                    procurement.invoice.amount.total.amount
                                )}
                            </td>
                            <td>
                                {
                                    INVOICE_STATUS[
                                        procurement.invoice.invoiceStatus?.id -
                                            1
                                    ]
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </React.Fragment>
    );
}
