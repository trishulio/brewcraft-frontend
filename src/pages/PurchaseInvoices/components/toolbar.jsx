import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";

export default function PurchaseInvoicesToolbar() {
    const history = useHistory();

    return (
        <Toolbar>
            <div className="clearfix mb-3">
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect mr-2"
                    onClick={() => {
                        history.push({
                            pathname: "/purchases/invoices/new",
                            search: "?edit=true",
                        });
                    }}
                    data-testid="newInvoice"
                >
                    New Invoice
                </Button>
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect mr-2"
                    outline={true}
                    onClick={() => {
                        history.push("/suppliers");
                    }}
                >
                    Suppliers
                </Button>
            </div>
        </Toolbar>
    );
}
