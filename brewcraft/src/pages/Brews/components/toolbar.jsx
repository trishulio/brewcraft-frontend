import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Button,
    Input,
    FormGroup,
    Label
} from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";
import { useQuery } from "../../../helpers/utils";

export default function ProductCategoriesToolbar() {
    const history = useHistory();
    const query = useQuery();

    const products = useSelector(state => {
        return state.Products.all;
    });

    return (
        <Toolbar>
            <div className="clearfix">
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect mr-2"
                    onClick={() => {
                        history.push({
                            pathname: "/batches/new",
                            search: "?edit=true"
                        });
                    }}
                >
                        New Brew
                </Button>
                <FormGroup className="waves-effect float-right mb-2">
                    <Label for="purchaseInvoicesFromDate" className="waves-effect float-left mt-1 mr-1">Started from</Label>
                    <Input
                        bsSize="sm"
                        type="date"
                        name="purchaseInvoicesFromDate"
                        className="waves-effect float-left"
                        style={{ width: 170 }}
                        value={query.get("batchFrom") || ""}
                        onChange={e => {
                            query.delete("batchFrom");
                            if (e.target.value) {
                                query.append("batchFrom", e.target.value);
                            }
                            history.push({search: query.toString()});
                        }}
                    />
                    <Label for="purchaseInvoicesToDate" className="waves-effect float-left mt-1 mr-1 ml-2">Started to</Label>
                    <Input
                        bsSize="sm"
                        type="date"
                        name="purchaseInvoicesToDate"
                        className="waves-effect float-left"
                        style={{ width: 170 }}
                        value={query.get("batchTo") || ""}
                        onChange={e => {
                            query.delete("batchTo");
                            if (e.target.value) {
                                query.append("batchTo", e.target.value);
                            }
                            history.push({search: query.toString()});
                        }}
                    />
                    <Button
                        type="button"
                        color="primary"
                        size="sm"
                        className="waves-effect float-left ml-2"
                        disabled={!(query.get("batchTo") || query.get("batchFrom"))}
                        onClick={() => {
                            query.delete("batchTo");
                            query.delete("batchFrom");
                            history.push({search: query.toString()});
                        }}
                    >
                            Reset
                    </Button>
                </FormGroup>
            </div>
            <div className="clearfix">
                <Input
                    type="select"
                    bsSize="sm"
                    className="waves-effect float-right mb-3 ml-2"
                    style={{ width: 100 }}
                    value={query.get("product") || ""}
                    onChange={e => {
                        query.delete("product");
                        if (e.target.value) {
                            query.append("product", e.target.value);
                        }
                        history.push({search: query.toString()});
                    }}
                >
                    <option value="">Product</option>
                    {
                        products.map((value, index) =>
                            <option key={index} value={value.id}>{value.name}</option>
                        )
                    }
                </Input>
                <Input
                    bsSize="sm"
                    type="search"
                    name="search"
                    id="batchesSearch"
                    placeholder="Search"
                    className="waves-effect float-right mb-3 ml-2"
                    style={{ width: 170 }}
                />
            </div>
        </Toolbar>
    );
}