import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPurchaseInvoices,
    fetchAllSuppliers,
    setBreadcrumbItems
} from "../../store/actions";
import {
    useQuery
} from "../../helpers/utils";
import PurchaseInvoicesInner from "./invoices";

export default function PurchaseInvoices() {
    const dispatch = useDispatch();
    const query = useQuery();
    const invoiceFrom = query.get("invoiceFrom");
    const invoiceTo = query.get("invoiceTo");
    const supplierId = query.get("supplier");
    const status = query.get("status");

    const { pageIndex, pageSize } = useSelector(state => {
        return state.PurchaseInvoices;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Purchase Invoices", [
                { title: "Main", link: "#" },
                { title: "Purchases", link: "#" }
            ])
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const props = {
            pageIndex,
            pageSize,
            invoiceFrom,
            invoiceTo,
            supplierId,
            status
        };
        dispatch(fetchPurchaseInvoices({ ...props }));
        dispatch(fetchAllSuppliers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, invoiceFrom, invoiceTo, supplierId, status]);

    return (
        <PurchaseInvoicesInner />
    );
}