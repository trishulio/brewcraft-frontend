import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchSupplierById,
    saveSupplier,
    editSupplier,
    deleteSupplier,
    resetSupplierDetails,
    fetchAllCompanies
} from "../../store/actions";
import SupplierInner from "./supplier";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Supplier() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const supplier = useSelector(state => {
        return state.Supplier.data;
    });

    const initialSupplier = useSelector(state => {
        return state.Supplier.initial;
    });

    const {
        invalidFirstName,
        invalidLastName,
        invalidPosition,
        invalidEmail,
        invalidPhoneNumber,
        invalidCompany
    } = useSelector(state => {
        return state.Supplier
    });

    useEffect(() => {
        if (id === "new") {
            dispatch(resetSupplierDetails());
            history.replace("/suppliers/new?edit=true");
        } else {
            fetch(id);
        }
        setEditable(editMode && editMode !== "false");

    }, [id, editMode]);

    useEffect(() => {
        dispatch(fetchAllCompanies());

    }, [supplier]);

    useEffect(() => {
        if (supplier.id) {
            dispatch(setBreadcrumbItems(supplier.firstName + " " + supplier.lastName, [
                { title: "Main", link: "#" },
                { title: "Suppliers", link: "#" }]
            ));
        } else {
            dispatch(setBreadcrumbItems("New Supplier", [
                { title: "Main", link: "#" },
                { title: "Suppliers", link: "#" }]
            ));
        }
        setChanged(isChanged());
    }, [supplier]);

    function isChanged() {
        return JSON.stringify(
                (({ id, firstName, lastName, company, position, email, phone }) => ({ id, firstName, lastName, company, position, email, phone }))(initialSupplier))
            !== JSON.stringify(
                (({ id, firstName, lastName, company, position, email, phone }) => ({ id, firstName, lastName, company, position, email, phone }))(supplier))
    }

    function onSave() {
        if (invalidFirstName || invalidLastName || invalidPosition || invalidEmail
            || invalidPhoneNumber || invalidCompany) {
            return;
        }
        if (!isChanged()) {
            history.push("/suppliers/" + id);

        } else if (supplier.id) {
            dispatch(
                editSupplier({
                    id: supplier.id,
                    companyId: supplier.company.id,
                    form: {
                        firstName: supplier.firstName,
                        lastName: supplier.lastName,
                        position: supplier.position,
                        email: supplier.email,
                        phoneNumber: supplier.phoneNumber,
                        version: supplier.version
                    },
                    success: supplier => {
                        history.push("/suppliers/" + supplier.id);
                    }
                })
            );
        } else {
            dispatch(
                saveSupplier({
                    supplierId: supplier.company.id,
                    form: {
                        firstName: supplier.firstName,
                        lastName: supplier.lastName,
                        position: supplier.position,
                        email: supplier.email,
                        phoneNumber: supplier.phoneNumber
                    },
                    success: supplier => {
                        history.push("/suppliers/" + supplier.id);
                    }
                })
            );
        }
    }

    function onDelete() {
        if (supplier.id) {
            dispatch(deleteSupplier({
                id: supplier.id,
                success: () => {
                    history.push("/suppliers");
                }
            }));
        }
    }

    function fetch(id) {
        dispatch(fetchSupplierById({ id } ));
    }

    return (
        <SupplierInner {...{editable, changed, onSave, onDelete}} />
    );
}