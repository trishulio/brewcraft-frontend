import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function DelieriesDashboard() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Dashboard", [
                { title: "Dashboard", link: "/dashboard" },
                { title: "Customers", link: "#" },
            ])
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <h1>Hello Deliveries!</h1>;
}
