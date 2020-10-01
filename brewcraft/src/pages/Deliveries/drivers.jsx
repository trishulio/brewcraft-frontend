import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function DeliveryDrivers() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Delivery Drivers", [
                { title: "Dashboard", link: "/dashboard" },
                { title: "Deliveries", link: "/deliveries" },
            ])
        );
    }, []);

    return <h1>Hello Delivery Drivers!</h1>;
}