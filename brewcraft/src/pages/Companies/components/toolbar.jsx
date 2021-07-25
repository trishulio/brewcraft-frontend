import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { filter, map } from "lodash";
import {
    Button,
    Input
} from "reactstrap";
import {
    setCompaniesSelectedCategory
} from "../../../store/actions";
import Toolbar from "../../../component/Common/toolbar";

export default function ProductCategoriesToolbar() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { selectedCategory } = useSelector(state => {
        return state.Companies;
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
                        pathname: "/companies/new",
                        search: "?edit=true"
                    });
                }}
            >
                    New Company
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
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                outline={true}
                onClick={() => {
                    history.push("/customers");
                }}
            >
                    Customers
            </Button>
            <Input
                size="sm"
                type="search"
                name="search"
                id="companiesSearch"
                placeholder="Name"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 170 }}
            />
        </Toolbar>
    );
}