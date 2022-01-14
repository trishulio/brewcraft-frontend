import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "reactstrap";

export default function SupplierContactToolbar({
    editable,
    changed,
    onSave,
    onDelete,
}) {
    const history = useHistory();

    const contact = useSelector((state) => {
        return state.SupplierContact.data;
    });

    return (
        <React.Fragment>
            <Button
                type="button"
                color="primary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={onSave}
                disabled={!changed}
                hidden={!editable}
            >
                <i className="fa fa-save"></i> Save
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.goBack();
                }}
                hidden={!editable}
            >
                <i className="fa fa-ban"></i> Cancel
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                disabled={editable}
                hidden={!contact.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/suppliers/contacts/" + contact.id,
                        search: "?edit=true",
                    });
                }}
            >
                <i className="fa fa-edit"></i> Edit Contact
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!contact.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/suppliers/contacts/new",
                        search: "?edit=true",
                    });
                }}
            >
                <i className="fa fa-plus"></i> New Contact
            </Button>
            <Button
                type="button"
                color="danger"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={onDelete}
                hidden={!contact.id || !editable}
            >
                <i className="fa fa-minus-circle"></i> Delete Contact
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!contact.id || editable}
                onClick={() => {
                    history.push("/suppliers/contacts");
                }}
            >
                <i className="fa fa-user"></i> Contacts
            </Button>
        </React.Fragment>
    );
}
