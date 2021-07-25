import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { filter, map } from "lodash";
import {
    Button,
    Input
} from "reactstrap";
import {
    setSuppliersSelectedCompany
} from "../../../store/actions";
import Toolbar from "../../../component/Common/toolbar";

export default function ProductCategoriesToolbar() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { selectedCompany } = useSelector(state => {
        return state.Suppliers;
    });

    const companies = useSelector(state => {
        return state.Companies.all;
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
                    history.push("/companies");
                }}
            >
                    Companies
            </Button>
            <Input
                size="sm"
                type="search"
                name="search"
                id="exampleSearch"
                placeholder="Name"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 170 }}
            />
        </Toolbar>
    );
}