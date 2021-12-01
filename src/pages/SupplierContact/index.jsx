import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    setBreadcrumbItems,
    fetchSupplierContactById,
    saveSupplierContact,
    editSupplierContact,
    deleteSupplierContact,
    resetSupplierContactDetails,
    fetchAllSuppliers,
    setSupplierContactDetails
} from "../../store/actions";
import {
    useQuery
} from "../../helpers/utils";
import SupplierContactInner from "./contact";
import DeleteGuard from "../../component/Prompt/DeleteGuard";
import RouteLeavingGuard from "../../component/Prompt/RouteLeavingGuard";

export default function SupplierContact() {
    const [editable, setEditable] = useState(false);
    const [changed, setChanged] = useState(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState(false);
    const [showRouterPrompt, setShowRouterPrompt] = useState(false);

    const { id } = useParams();
    const history = useHistory();
    const query = useQuery();
    const editMode = query.get("edit");
    const dispatch = useDispatch();

    const contact = useSelector(state => {
        return state.SupplierContact.data;
    });

    const initialContact = useSelector(state => {
        return state.SupplierContact.initial;
    });

    const {
        invalidFirstName,
        invalidLastName,
        invalidEmail,
        invalidPhoneNumber,
        invalidCompany
    } = useSelector(state => {
        return state.SupplierContact
    });

    useEffect(() => {
        if (id === "new") {
            dispatch(resetSupplierContactDetails());
            history.replace("/suppliers/contacts/new?edit=true");
        } else {
            dispatch(fetchSupplierContactById({ id }));
        }
        if (editMode) {
            dispatch(fetchAllSuppliers());
        }
        setEditable(editMode && editMode !== "false");
        setShowRouterPrompt(!!editMode);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, editMode]);

    useEffect(() => {
        if (initialContact.id) {
            dispatch(setBreadcrumbItems(initialContact.firstName + " " + initialContact.lastName, [
                { title: "Main", link: "#" },
                { title: "Suppliers", link: "#" },
                { title: "Contacts", link: "#" }]
            ));
        } else {
            dispatch(setBreadcrumbItems("New Contact", [
                { title: "Main", link: "#" },
                { title: "Suppliers", link: "#" },
                { title: "Contacts", link: "#" }]
            ));
        }
        setChanged(isChanged());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contact]);

    function isChanged() {
        return JSON.stringify(
            (({ id, firstName, lastName, supplier, position, email, phoneNumber }) => ({ id, firstName, lastName, supplier, position, email, phoneNumber }))(initialContact))
            !== JSON.stringify(
                (({ id, firstName, lastName, supplier, position, email, phoneNumber }) => ({ id, firstName, lastName, supplier, position, email, phoneNumber }))(contact))
    }
    function onSave() {


        if (contact.firstName.length === 0 || contact.lastName.length === 0 || contact.email.length === 0
            || contact.phoneNumber.length === 0 || contact.supplier.length === 0) {
            dispatch(setSupplierContactDetails({
                invalidFirstName: contact.firstName.length === 0,
                invalidLastName: contact.lastName.length === 0,
                invalidEmail: contact.email.length === 0,
                invalidPhoneNumber: contact.phoneNumber.length === 0,
                invalidCompany: contact.supplier.length === 0,
            }));
            return;
        }

        if (!isChanged()) {
            history.push("/suppliers/contacts/" + id);

        } else if (contact.id) {
            dispatch(
                editSupplierContact({
                    id: contact.id,
                    supplierId: contact.supplier.id,
                    form: {
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        position: contact.position,
                        email: contact.email,
                        phoneNumber: contact.phoneNumber,
                        version: contact.version
                    }
                })
            );
        } else {
            dispatch(
                saveSupplierContact({
                    supplierId: contact.supplier.id,
                    form: {
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        position: contact.position,
                        email: contact.email,
                        phoneNumber: contact.phoneNumber
                    }
                })
            );
        }
    }

    function onDelete() {
        setShowDeletePrompt(!!contact.id);
    }

    return (
        <React.Fragment>
            <DeleteGuard
                when={showDeletePrompt}
                confirm={() => {
                    dispatch(deleteSupplierContact(contact.id));
                    setShowRouterPrompt(false);
                }}
                close={() => {
                    setShowDeletePrompt(false);
                }}
                content="This cannot be undone. Are you sure want to delete this contact?"
            />
            <RouteLeavingGuard
                when={showRouterPrompt}
                navigate={path => {
                    history.push(path);
                }}
                shouldBlockNavigation={() => {
                    return editMode && isChanged()
                }
                }
                content="There are unsaved changes. Are you sure want to leave this page?"
            />
            <SupplierContactInner {...{ editable, changed, onSave, onDelete }} />
        </React.Fragment>
    );
}