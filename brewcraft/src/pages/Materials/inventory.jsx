import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function RawMaterials() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Raw Materials", [
                { title: "Dashboard", link: "/dashboard" },
                { title: "Materials", link: "/materials" },
            ])
        );
    }, []);

    return <h1>Hello Raw Materials!</h1>;
}