import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";

export default function ProductCategoriesToolbar() {
    const history = useHistory();

    return (
        <Toolbar>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push({
                        pathname: "/suppliers/contacts/new",
                        search: "?edit=true",
                    });
                }}
                data-testid="newSupplierContact"
            >
                <i className="fa fa-plus"></i> New Contact
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push("/suppliers");
                }}
            >
                <i className="fa fa-industry"></i> Suppliers
            </Button>
        </Toolbar>
    );
}
