import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function BrewsActive() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Active", [
                { title: "Dashboard", link: "/dashboard" },
                { title: "Brews", link: "#" },
            ])
        );
    }, []);

    return <h1>Hello Active Brewmasters!</h1>;
}