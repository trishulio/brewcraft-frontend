import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function FinishedGoodsInventory() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Finished Goods Inventory", [
                { title: "Dashboard", link: "/dashboard" },
                { title: "Finished Goods", link: "/finished-goods/dashboard" },
            ])
        );
    }, []);

    return <h1>Hello Finished Goods Inventory!</h1>;
}