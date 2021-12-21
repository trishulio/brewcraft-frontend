import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function FormsN10() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("N10 - Application for Refund/Drawback", [
                { title: "Dashboard", link: "/dashboard" },
            ])
        );
    });

    return <h1>Hello N10!</h1>;
}
