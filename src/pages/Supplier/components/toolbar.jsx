import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "reactstrap";

export default function Toolbar({ editable, changed, onSave, onDelete }) {
    const history = useHistory();

    const supplier = useSelector((state) => {
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
                hidden={!supplier.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/suppliers/" + supplier.id,
                        search: "?edit=true",
                    });
                }}
            >
                <i className="fa fa-edit"></i> Edit
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
                <i className="fa fa-minus-circle"></i> Delete Supplier
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!supplier.id || editable}
                onClick={() => {
                    history.push({
                        pathname: "/suppliers/new",
                        search: "?edit=true",
                    });
                }}
            >
                <i className="fa fa-plus"></i> New Supplier
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!supplier.id || editable}
                onClick={() => {
                    history.push("/suppliers");
                }}
            >
                <i className="fa fa-industry"></i> Suppliers
            </Button>
        </React.Fragment>
    );
}
