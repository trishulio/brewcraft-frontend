import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchPurchaseInvoices,
    fetchAllPurchaseInvoices,
    setBreadcrumbItems
} from "../../store/actions";
import PurchaseInvoicesInner from "./purchase-invoices";

export default function PurchaseInvoices() {
    const dispatch = useDispatch();

    const invoices = useSelector(state => {
        return state.PurchaseInvoices.content;
    });

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
        fetchPage();
    }, []);

    useEffect(() => {
        dispatch(fetchAllPurchaseInvoices());
    }, [invoices]);

    function fetchPage() {
        const props = {
            pageIndex, pageSize
        };

        dispatch(fetchPurchaseInvoices({ ...props }));
    }

    return (
        <PurchaseInvoicesInner
            invoices={invoices} fetchPage={fetchPage}
        />
    );
}