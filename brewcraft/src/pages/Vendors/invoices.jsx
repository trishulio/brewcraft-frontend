import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function PurchaseInvoices() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Purchase Invoices", [
                { title: "Dashboard", link: "/dashboard" },
                { title: "Vendors", link: "/vendors/dashboard" }
            ])
        );
    }, []);

    return <h1>Hello Purchase Invoices!</h1>;
}