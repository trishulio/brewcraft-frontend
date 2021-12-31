import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProcurements,
    fetchAllSuppliers,
    setBreadcrumbItems,
    fetchAllMaterials,
} from "../../store/actions";
import { useQuery } from "../../helpers/utils";
import PurchaseInvoicesInner from "./invoices";

export default function PurchaseInvoices() {
    const dispatch = useDispatch();
    const query = useQuery();
    const invoiceFrom = query.get("invoiceFrom");
    const invoiceTo = query.get("invoiceTo");
    const amountFrom = query.get("amountFrom");
    const amountTo = query.get("amountTo");
    const paymentFrom = query.get("paymentFrom");
    const paymentTo = query.get("paymentTo");
    const supplierId = query.get("supplierId");
    const status = query.get("status");
    const sort = query.get("sort");
    const order = query.get("order");
    const materialIds = query.get("materialIds");

    const { pageIndex, pageSize } = useSelector((state) => {
        return state.Procurements;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Invoices", [
                { title: "Main", link: "#" },
                { title: "Purchases", link: "#" },
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
            amountFrom,
            amountTo,
            paymentFrom,
            paymentTo,
            status,
            materialIds,
            sort,
            order,
        };
        dispatch(fetchProcurements({ ...props }));
        dispatch(fetchAllSuppliers());
        dispatch(fetchAllMaterials());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        pageIndex,
        pageSize,
        invoiceFrom,
        invoiceTo,
        amountFrom,
        amountTo,
        paymentFrom,
        paymentTo,
        supplierId,
        status,
        materialIds,
        sort,
        order,
    ]);

    return <PurchaseInvoicesInner />;
}
