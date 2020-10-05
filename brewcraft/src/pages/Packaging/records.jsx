import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function PackagingRecords() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Packaging Records", [
                { title: "Dashboard", link: "/dashboard" },
                { title: "Packaging", link: "/packaging" },
            ])
        );
    }, []);

    return <h1>Hello Packaging Records!</h1>;
}