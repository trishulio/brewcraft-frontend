import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllSuppliers,
    fetchSupplierContacts,
    setBreadcrumbItems
} from "../../store/actions";
import {
    useQuery
} from "../../helpers/utils";
import SupplierContactsInner from "./contacts";

export default function SupplierContacts() {
    const dispatch = useDispatch();
    const query = useQuery();
    const supplierId = query.get("supplier");
    const sort = query.get("sort");
    const order = query.get("order");

    const { pageIndex, pageSize } = useSelector(state => {
        return state.SupplierContacts;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Contacts", [
                { title: "Main", link: "#" },
                { title: "Suppliers", link: "#" }
            ])
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const props = {
            pageIndex, pageSize, supplierId, sort, order
        };
        dispatch(fetchSupplierContacts({ ...props }));
        dispatch(fetchAllSuppliers());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, supplierId, sort, order]);

    return (
        <SupplierContactsInner />
    );
}