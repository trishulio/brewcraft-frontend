import React from "react";
import { useHistory } from "react-router-dom";
import {
    Button,
    Input
} from "reactstrap";
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
                outline={true}
                onClick={() => {
                    history.push("/suppliers/contacts");
                }}
            >
                    All Contacts
            </Button>
            <Input
                bsSize="sm"
                type="search"
                name="search"
                id="suppliersSearch"
                placeholder="Name"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 170 }}
            />
        </Toolbar>
    );
}