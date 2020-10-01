import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function Facilities() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Facilities", [
                { title: "Dashboard", link: "/dashboard" }
            ])
        );
    }, []);

    return <h1>Hello Facilities!</h1>;
}