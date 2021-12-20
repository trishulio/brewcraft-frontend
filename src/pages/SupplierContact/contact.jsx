import React from "react";
import { Alert } from "reactstrap";
import Toolbar from "./components/toolbar";
import SupplierContactDetails from "./components/details";
import { useSelector } from "react-redux";

export default function SupplierContact({
    editable,
    changed,
    onSave,
    onDelete,
}) {
    const { error } = useSelector((state) => {
        return state.SupplierContact;
    });
    return (
        <React.Fragment>
            <Toolbar
                editable={editable}
                changed={changed}
                onSave={onSave}
                onDelete={onDelete}
            />
            <div style={{ maxWidth: "576px" }}>
                {error && (
                    <Alert color="info" className="mt-2 mb-4">
                        <strong>Oh snap!</strong> Change a few things up and try
                        submitting again.
                    </Alert>
                )}
                <SupplierContactDetails editable={editable} />
            </div>
        </React.Fragment>
    );
}
