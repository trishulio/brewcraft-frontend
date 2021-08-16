import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchSuppliers,
    setBreadcrumbItems
} from "../../store/actions";
import {
    useQuery
} from "../../helpers/utils";
import SuppliersInner from "./suppliers";

export default function Suppliers() {
    const dispatch = useDispatch();
    const query = useQuery();
    const sort = query.get("sort");
    const order = query.get("order");

    const { pageIndex, pageSize } = useSelector(state => {
        return state.Suppliers;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Suppliers", [
                { title: "Main", link: "#" },
                { title: "Suppliers", link: "#" }
            ])
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const props = {
            pageIndex, pageSize, sort, order
        };
        dispatch(fetchSuppliers({ ...props }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort, order]);

    return (
        <SuppliersInner />
    );
}