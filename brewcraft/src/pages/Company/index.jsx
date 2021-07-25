import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchCompanyById,
    saveCompany,
    editCompany,
    deleteCompany,
    fetchAllMaterialCategories,
    resetCompanyDetails
} from "../../store/actions";
import CompanyInner from "./company";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Company() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const company = useSelector(state => {
        return state.Company.data;
    });

    const initialCompany = useSelector(state => {
        return state.Company.initial;
    });

    const {
        invalidName,
        invalidAddressLine1,
        invalidAddressLine2,
        invalidCity,
        invalidProvince,
        invalidPostalCode,
        invalidCountry
    } = useSelector(state => {
        return state.Company
    });

    useEffect(() => {
        if (id === "new") {
            dispatch(resetCompanyDetails());
            history.replace("/companies/new?edit=true");
        } else {
            fetch(id);
        }
        setEditable(editMode && editMode !== "false");
    }, [id, editMode]);

    useEffect(() => {
        if (company.id) {
            dispatch(setBreadcrumbItems(company.name, [
                { title: "Main", link: "#" },
                { title: "Companies", link: "#" }]
            ));
        } else {
            dispatch(setBreadcrumbItems("New Company", [
                { title: "Main", link: "#" },
                { title: "Companies", link: "#" }]
            ));
        }
        setChanged(isChanged());
    }, [company]);

    function isChanged() {
        return JSON.stringify(
                (({ id, name }) => ({ id, name }))(initialCompany))
            !== JSON.stringify(
                (({ id, name }) => ({ id, name }))(company))
    }

    function onSave() {
        if (invalidName || invalidAddressLine1 || invalidAddressLine2 || invalidCity
            || invalidProvince || invalidPostalCode || invalidCountry)
        {
            return;
        }
        if (!isChanged()) {
            history.push("/companies/" + id);

        } else if (company.id) {
            dispatch(
                editCompany({
                    id: company.id,
                    form: {
                        name: company.name,
                        address: {
                            id: company.addressId,
                            addressLine1: company.addressLine1,
                            addressLine2: company.addressLine2,
                            city: company.city,
                            province: company.province,
                            postalCode: company.postalCode,
                            country: company.country
                        },
                        contacts: company.contacts,
                        version: company.version
                    },
                    success: company => {
                        history.push("/companies/" + company.id);
                    }
                })
            );
        } else {
            dispatch(
                saveCompany({
                    form: {
                        name: company.name,
                        address: {
                            addressLine1: company.addressLine1,
                            addressLine2: company.addressLine2,
                            city: company.city,
                            province: company.province,
                            postalCode: company.postalCode,
                            country: company.country
                        },
                        contacts: []
                    },
                    success: company => {
                        history.push("/companies/" + company.id);
                    }
                })
            );
        }
    }

    function onDelete() {
        if (company.id) {
            dispatch(deleteCompany({
                id: company.id,
                success: () => {
                    history.push("/companies");
                }
            }));
        }
    }

    function fetch(id) {
        dispatch(fetchCompanyById({ id } ));
    }

    return (
        <CompanyInner {...{editable, changed, onSave, onDelete}} />
    );
}