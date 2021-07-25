import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllCompanies,
    fetchSuppliers,
    setBreadcrumbItems
} from "../../store/actions";
import SuppliersInner from "./suppliers";

export default function Suppliers() {
    const dispatch = useDispatch();

    const suppliers = useSelector(state => {
        return state.Suppliers.content;
    });

    const { pageIndex, pageSize, selectedCompany } = useSelector(state => {
        return state.Suppliers;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Suppliers", [
                { title: "Main", link: "#" },
                { title: "Purchases", link: "#" }
            ])
        )
        fetchPage();
    }, []);

    useEffect(() => {
        fetchPage();

    }, [selectedCompany]);

    useEffect(() => {
        dispatch(fetchAllCompanies());

    }, [suppliers]);

    function fetchPage() {
        const props = {
            pageIndex, pageSize
        };
        dispatch(fetchSuppliers({ ...props }))
    }

    return (
        <SuppliersInner
            suppliers={suppliers} fetchPage={fetchPage}
        />
    );
}