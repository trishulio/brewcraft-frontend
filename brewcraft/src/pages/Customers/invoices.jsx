import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function CustomersInvoices() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Sales Invoices", [
                { title: "Dashboard", link: "/dashboard" },
                { title: "Customers", link: "#" },
            ])
        );
    }, []);

    return <h1>Hello Customers Invoices!</h1>;
}