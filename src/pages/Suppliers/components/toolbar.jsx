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
                        pathname: "/suppliers/new",
                        search: "?edit=true",
                    });
                }}
                data-testid="newSupplier"
            >
                <i className="fa fa-plus"></i> New Supplier
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push("/suppliers/contacts");
                }}
            >
                <i className="fa fa-user"></i> Contacts
            </Button>
        </Toolbar>
    );
}
