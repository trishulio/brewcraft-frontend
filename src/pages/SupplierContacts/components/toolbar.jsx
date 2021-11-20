import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Button,
    Input
} from "reactstrap";
import {
    useQuery
} from "../../../helpers/utils";
import Toolbar from "../../../component/Common/toolbar";

export default function ProductCategoriesToolbar() {
    const history = useHistory();
    const query = useQuery();
    const supplierId = query.get("supplier");

    const suppliers = useSelector(state => {
        return state.Suppliers.all;
    });

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
                        search: "?edit=true"
                    });
                }}
            >
                    New Contact
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                outline={true}
                onClick={() => {
                    history.push("/suppliers");
                }}
            >
                    Suppliers
            </Button>
            <Input
                name="supplierContactSearch"
                type="search"
                bsSize="sm"
                placeholder="Search"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 170 }}
            />
            <Input
                type="select"
                bsSize="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
                value={supplierId || ""}
                onChange={e => {
                    if (e.target.value) {
                        history.push("/suppliers/contacts?supplier=" + e.target.value);
                    } else {
                        history.push("/suppliers/contacts");
                    }
                }}
            >
                <option value="">Select</option>
                {
                    suppliers.map((value, index) =>
                        <option key={index} value={value.id}>{value.name}</option>
                    )
                }
            </Input>
        </Toolbar>
    );
}