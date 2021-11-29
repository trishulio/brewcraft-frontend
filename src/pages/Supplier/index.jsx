import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchSupplierById,
    saveSupplier,
    editSupplier,
    deleteSupplier,
    resetSupplierDetails,
    setSupplierDetails
} from "../../store/actions";
import {
    useQuery
} from "../../helpers/utils";
import SupplierInner from "./supplier";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";

export default function Supplier() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

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
        dispatch(resetSupplierDetails());
        if (id === "new") {
            history.replace("/suppliers/new?edit=true");
        } else {
            dispatch(fetchSupplierById({ id } ));
        }
        setEditable(editMode && editMode !== "false");
        setShowRouterPrompt(!!editMode);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode]);

    useEffect(() => {
        if (initialSupplier.id) {
            dispatch(setBreadcrumbItems(initialSupplier.name, [
                { title: "Main", link: "#" },
                { title: "Purchases", link: "#" },
                { title: "Suppliers", link: "#" }]
            ));
        } else {
            dispatch(setBreadcrumbItems("New Supplier", [
                { title: "Main", link: "#" },
                { title: "Purchases", link: "#" },
                { title: "Suppliers", link: "#" }]
            ));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialSupplier]);

    useEffect(() => {
        setChanged(isChanged());
    }, [supplier]);

    function isChanged() {
        return JSON.stringify(
                (({ id, name, address }) => ({ id, name, address }))(initialSupplier))
            !== JSON.stringify(
                (({ id, name, address }) => ({ id, name, address }))(supplier))
    }

    function onSave() {
        dispatch(setSupplierDetails({
            invalidName : supplier.name.length === 0,
            invalidAddressLine1 : supplier.address.addressLine1.length === 0,
            invalidAddressLine2 : supplier.address.addressLine2.length === 0,
            invalidCity : supplier.address.city.length === 0,
            invalidProvince : supplier.address.province.length === 0,
            invalidPostalCode : supplier.address.postalCode.length === 0 ,
            invalidCountry : supplier.address.country.length === 0
        }));
        if (
            invalidName
            || invalidAddressLine1
            || invalidAddressLine2
            || invalidCity
            || invalidProvince
            || invalidPostalCode
            || invalidCountry) {

            dispatch(setSupplierDetails({
                error: true
            }));
        } else if (isChanged() && supplier.id) {
            dispatch(
                editSupplier({
                    id: supplier.id,
                    form: {
                        name: supplier.name,
                        address: {
                            id: supplier.addressId,
                            addressLine1: supplier.address.addressLine1,
                            addressLine2: supplier.address.addressLine2,
                            city: supplier.address.city,
                            province: supplier.address.province,
                            postalCode: supplier.address.postalCode,
                            country: supplier.address.country
                        },
                        contacts: supplier.contacts,
                        version: supplier.version
                    }
                })
            );
        } else {
            dispatch(
                saveSupplier({
                    form: {
                        name: supplier.name,
                        address: {
                            addressLine1: supplier.address.addressLine1,
                            addressLine2: supplier.address.addressLine2,
                            city: supplier.address.city,
                            province: supplier.address.province,
                            postalCode: supplier.address.postalCode,
                            country: supplier.address.country
                        },
                        contacts: []
                    }
                })
            );
        }
    }

    function onDelete() {
        setShowDeletePrompt(!!supplier.id);
    }

    const props = {
        editable,
        changed,
        onSave,
        onDelete
    };

    return (
        <React.Fragment>
            <DeleteGuard
                    when={showDeletePrompt}
                    confirm={() => {
                        dispatch(deleteSupplier(supplier.id));
                        setShowRouterPrompt(false);
                    }}
                    close={() => {
                        setShowDeletePrompt(false);
                    }}
                    content="This cannot be undone. Are you sure want to delete this supplier?"
                />
                <RouteLeavingGuard
                    when={showRouterPrompt}
                    navigate={path => {
                        history.push(path);
                    }}
                    shouldBlockNavigation={() => editMode && isChanged()}
                    content="There are unsaved changes. Are you sure want to leave this page?"
                />
            <SupplierInner {...props}/>
        </React.Fragment>
    );
}