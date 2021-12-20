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
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={onSave}
                disabled={!changed}
                hidden={!editable}
            >
                Save
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
                Cancel
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
                Edit Contact
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
                New Contact
            </Button>
            <Button
                type="button"
                color="danger"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={onDelete}
                hidden={!contact.id || !editable}
            >
                Delete Contact
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!contact.id || editable}
                outline={true}
                onClick={() => {
                    history.push("/suppliers/contacts");
                }}
            >
                Contacts
            </Button>
        </React.Fragment>
    );
}
