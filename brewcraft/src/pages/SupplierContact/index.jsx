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
    fetchAllSuppliers
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

    const initialSupplierContact = useSelector(state => {
        return state.SupplierContact.initial;
    });

    const {
        invalidFirstName,
        invalidLastName,
        invalidPosition,
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
        if (contact.id) {
            dispatch(setBreadcrumbItems(contact.firstName + " " + contact.lastName, [
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
                (({ id, firstName, lastName, company, position, email, phoneNumber }) => ({ id, firstName, lastName, company, position, email, phoneNumber }))(initialSupplierContact))
            !== JSON.stringify(
                (({ id, firstName, lastName, company, position, email, phoneNumber }) => ({ id, firstName, lastName, company, position, email, phoneNumber }))(contact))
    }

    function onSave() {
        if (invalidFirstName || invalidLastName || invalidPosition || invalidEmail
            || invalidPhoneNumber || invalidCompany) {
            return;
        }
        if (!isChanged()) {
            history.push("/suppliers/contacts/" + id);

        } else if (contact.id) {
            dispatch(
                editSupplierContact({
                    id: contact.id,
                    supplierId: contact.company.id,
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
                    supplierId: contact.company.id,
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
                shouldBlockNavigation={() => editMode && isChanged()}
                content="There are unsaved changes. Are you sure want to leave this page?"
            />
            <SupplierContactInner {...{editable, changed, onSave, onDelete}} />
        </React.Fragment>
    );
}