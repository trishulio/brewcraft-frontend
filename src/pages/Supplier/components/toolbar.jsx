import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
    Button
} from "reactstrap";

export default function Toolbar({ editable, changed, onSave, onDelete }) {
    const history = useHistory();

    const supplier = useSelector(state => {
        return state.Supplier.data;
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
                hidden={!supplier.id || editable}
                outline={true}
                onClick={() => {
                    history.push({
                        pathname: "/suppliers/" + supplier.id,
                        search: "?edit=true"
                    });
                }}
            >
                Edit
            </Button>
            <Button
                type="button"
                color="danger"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={onDelete}
                hidden={!supplier.id || !editable}
                disabled={changed}
            >
                Delete Supplier
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!supplier.id || editable}
                outline={true}
                onClick={() => {
                    history.push("/suppliers");
                }}
            >
                Suppliers
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!supplier.id || editable}
                outline={true}
                onClick={() => {
                    history.push({
                        pathname: "/suppliers/new",
                        search: "?edit=true"
                    });
                }}
            >
                New Supplier
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!supplier.id }
                outline={true}
                onClick={() => {
                    history.push({
                        pathname: "/suppliers/contacts"
                    });
                }}
            >
                Contacts
            </Button>
        </React.Fragment>
    );
}