import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function WastedMaterials() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Wasted Materials", [
                { title: "Dashboard", link: "/dashboard" },
                { title: "Materials", link: "/materials" },
            ])
        );
    }, []);

    return <h1>Hello Wasted Materials!</h1>;
}