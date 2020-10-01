import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";

export default function FinishedGoodsRecords() {
    // dispatch action
    const dispatch = useDispatch();

    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Finished Goods Records", [
                { title: "Dashboard", link: "/dashboard" },
                { title: "Finished Goods", link: "/finished-goods/dashboard" },
            ])
        );
    }, []);

    return <h1>Hello Finished Goods Records!</h1>;
}