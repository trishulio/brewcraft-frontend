import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function Vendors() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Vendors", [
                { title: "Dashboard", link: "/dashboard" }
            ])
        );
    }, []);

    return <h1>Hello Vendors!</h1>;
}