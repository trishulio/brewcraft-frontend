import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchSupplierById,
    saveSupplier,
    editSupplier,
    deleteSupplier,
    resetSupplierDetails
} from "../../store/actions";
import {
    useQuery
} from "../../helpers/utils";
import SupplierInner from "./supplier";

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
        invalidName,
        invalidAddressLine1,
        invalidAddressLine2,
        invalidCity,
        invalidProvince,
        invalidPostalCode,
        invalidCountry
    } = useSelector(state => {
        return state.Supplier
    });

    useEffect(() => {
        if (id === "new") {
            dispatch(resetSupplierDetails());
            history.replace("/suppliers/new?edit=true");
        } else {
            dispatch(fetchSupplierById({ id } ));
        }
        setEditable(editMode && editMode !== "false");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode]);

    useEffect(() => {
        if (supplier.id) {
            dispatch(setBreadcrumbItems(supplier.name, [
                { title: "Main", link: "#" },
                { title: "Companies", link: "#" }]
            ));
        } else {
            dispatch(setBreadcrumbItems("New Supplier", [
                { title: "Main", link: "#" },
                { title: "Companies", link: "#" }]
            ));
        }
        setChanged(isChanged());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supplier]);

    function isChanged() {
        return JSON.stringify(
                (({ id, name }) => ({ id, name }))(initialSupplier))
            !== JSON.stringify(
                (({ id, name }) => ({ id, name }))(supplier))
    }

    function onSave() {
        if (invalidName || invalidAddressLine1 || invalidAddressLine2 || invalidCity
            || invalidProvince || invalidPostalCode || invalidCountry)
        {
            return;
        }
        if (!isChanged()) {
            history.push("/suppliers/" + id);

        } else if (supplier.id) {
            dispatch(
                editSupplier({
                    id: supplier.id,
                    form: {
                        name: supplier.name,
                        address: {
                            id: supplier.addressId,
                            addressLine1: supplier.addressLine1,
                            addressLine2: supplier.addressLine2,
                            city: supplier.city,
                            province: supplier.province,
                            postalCode: supplier.postalCode,
                            country: supplier.country
                        },
                        contacts: supplier.contacts,
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
                    form: {
                        name: supplier.name,
                        address: {
                            addressLine1: supplier.addressLine1,
                            addressLine2: supplier.addressLine2,
                            city: supplier.city,
                            province: supplier.province,
                            postalCode: supplier.postalCode,
                            country: supplier.country
                        },
                        contacts: []
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

    return (
        <SupplierInner {...{editable, changed, onSave, onDelete}} />
    );
}