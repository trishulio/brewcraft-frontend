import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "reactstrap";
import Toolbar from "./components/toolbar";
import SupplierDetails from "./components/details";

export default function Supplier({ editable, changed, onSave, onDelete }) {
    const error = useSelector((state) => {
        return state.Supplier.error;
    });
    return (
        <React.Fragment>
            {console.log(error)}
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
                <SupplierDetails editable={editable} />
            </div>
        </React.Fragment>
    );
}
