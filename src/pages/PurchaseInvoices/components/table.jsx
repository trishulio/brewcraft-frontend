import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Table, { Th } from "../../../component/Common/table";
import { formatCurrency, formatDate } from "../../../helpers/textUtils";
import { useQuery } from "../../../helpers/utils";

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
                if (sort !== "invoiceNumber") {
                    order = undefined;
                }
                query.append("sort", "invoiceNumber");
                break;
            case "purchaseInvoiceSupplier":
                if (sort !== "purchaseOrder.supplier.name") {
                    order = undefined;
                }
                query.append("sort", "purchaseOrder.supplier.name");
                break;
            case "purchaseInvoiceDate":
                if (sort !== "generatedOn") {
                    order = undefined;
                }
                query.append("sort", "generatedOn");
                break;
            case "purchaseInvoicePaymentDue":
                if (sort !== "paymentDueDate") {
                    order = undefined;
                }
                query.append("sort", "paymentDueDate");
                break;
            case "purchaseInvoiceAmount":
                if (sort !== "amount.amount") {
                    order = undefined;
                }
                query.append("sort", "amount.amount");
                break;

            case "purchaseInvoiceStatus":
                if (sort !== "status") {
                    order = undefined;
                }
                query.append("sort", "status");
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
            <Table hover={true}>
                <thead>
                    <tr>
                        <Th
                            name="purchaseInvoiceNumber"
                            id="invoiceNumber"
                            onSort={onSort}
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
                                    procurement.invoice.amount.amount
                                )}
                            </td>
                            <td>{procurement.invoice.invoiceStatus?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </React.Fragment>
    );
}
