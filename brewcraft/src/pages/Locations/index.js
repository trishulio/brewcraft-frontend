import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function Locations() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Locations", [
                { title: "Dashboard", link: "/dashboard" }
            ])
        );
    }, []);

    return <h1>Hello Locations!</h1>;
}