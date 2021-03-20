import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function FinshedGoods() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Dashboard", [
                { title: "Dashboard", link: "/dashboard" },
                { title: "Brews", link: "#" },
            ])
        );
    }, []);

    return <h1>Hello Brewmasters!</h1>;
}