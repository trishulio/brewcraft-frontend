import React from "react";
import Toolbar from "./components/toolbar";
import Invoice from "./components/invoice";
import { Alert } from "reactstrap";
import { useSelector } from "react-redux";

export default function PurchaseInvoice({ editable, changed, onSave, onDelete }) {

    const error = useSelector(state => {
        return state.PurchaseInvoice.error;
    })

    return (
        <React.Fragment>
            <Toolbar
                editable={editable}
                changed={changed}
                onSave={onSave}
                onDelete={onDelete}
            />
            <div style={{ maxWidth: "1200px" }}>
                {error &&
                    <Alert color="info" className="mt-2 mb-4">
                        <strong>Oh snap!</strong> Change a few things up and try submitting again.
                    </Alert>
                }
                <Invoice editable={editable} />
            </div>
        </React.Fragment>
    );
}