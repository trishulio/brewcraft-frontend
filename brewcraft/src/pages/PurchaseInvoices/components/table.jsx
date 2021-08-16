import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "../../../component/Common/table";
import { formatCurrency, formatDate } from "../../../helpers/textUtils";

export default function PurchaseInvoicesTable() {

    const invoices = useSelector(state => {
        return state.PurchaseInvoices.content;
    });

    return (
        <React.Fragment>
            <Table>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Supplier</th>
                        <th>Date</th>
                        <th>Payment Due</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        invoices.map((invoice, key) =>
                            <tr key={key}>
                                <td><Link to={"/purchases/invoices/" + invoice.id}>{invoice.invoiceNumber}</Link></td>
                                <td>{invoice.purchaseOrder?.supplier.name || "-" /* bug */}</td>
                                <td>{formatDate(invoice.generatedOn)}</td>
                                <td>{formatDate(invoice.paymentDueDate)}</td>
                                <td>{formatCurrency(invoice.amount.amount)}</td>
                                <td>{invoice.status.id}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </React.Fragment>
    );
}