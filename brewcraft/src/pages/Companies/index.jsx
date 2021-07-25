import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCompanies,
    setBreadcrumbItems
} from "../../store/actions";
import CompaniesInner from "./companies";

export default function Companies() {
    const dispatch = useDispatch();

    const companies = useSelector(state => {
        return state.Companies.content;
    });

    const { pageIndex, pageSize } = useSelector(state => {
        return state.Companies;
    });

    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Companies", [
                { title: "Main", link: "#" },
                { title: "Companies", link: "#" }
            ])
        );
        fetchPage();
    }, []);

    function fetchPage() {
        const props = {
            pageIndex, pageSize
        };
        dispatch(fetchCompanies({ ...props }))
    }

    return (
        <CompaniesInner
            companies={companies} fetchPage={fetchPage}
        />
    );
}