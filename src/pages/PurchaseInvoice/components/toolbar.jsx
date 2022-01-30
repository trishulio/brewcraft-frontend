import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "reactstrap";

export default function Toolbar({ editable, changed, onSave, onDelete }) {
    const history = useHistory();

    const { shipment, invoice } = useSelector((state) => {
        return state.Procurement.data;
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
                data-testid="invoice-save"
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
                hidden={!invoice.id || editable}
                onClick={() => {
                    history.push({
                        pathname: `/purchases/invoices/${shipment.id}/${invoice.id}`,
                        search: "?edit=true",
                    });
                }}
                data-testid="invoice-edit"
            >
                Edit Invoice
            </Button>
            <Button
                type="button"
                color="danger"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={onDelete}
                hidden={!invoice.id || !editable}
                data-testid="invoice-delete"
            >
                Delete Invoice
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!invoice.id || editable}
                outline={true}
                onClick={() => {
                    history.push({
                        pathname: "/purchases/invoices/new",
                        search: "?edit=true",
                    });
                }}
            >
                New Invoice
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                hidden={!invoice.id || editable}
                outline={true}
                onClick={() => {
                    history.push("/purchases/invoices");
                }}
            >
                Purchase Invoices
            </Button>
        </React.Fragment>
    );
}
