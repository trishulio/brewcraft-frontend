import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function InProcess() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("In-Process Materials", [
                { title: "Dashboard", link: "/dashboard" },
                { title: "Materials", link: "/materials" },
            ])
        );
    }, []);

    return <h1>Hello In-Process!</h1>;
}