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
        <React.Fragment>
        {/* <Toolbar>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push({
                        pathname: "/brews/new",
                        search: "?edit=true"
                    });
                }}
            >
                    New Batch
            </Button>
        </Toolbar> */}
        <div className="px-2">
            <Label
                for="brewsProduct"
                className="d-inline-block font-size-12 mb-3"
                style={{
                    width: "10rem"
                }}
            >
                Product
            </Label>
            <FormGroup
                className="d-inline-block mb-3"
            >
                <Input
                    type="select"
                    name="brewsProduct"
                    bsSize="sm"
                    className="waves-effect"
                    style={{ width: "10rem" }}
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
            </FormGroup>
            <div className="clearfix"></div>
            <Label
                for="batchesStatus"
                className="d-inline-block font-size-12 mb-3"
                style={{
                    width: "10rem"
                }}
            >
                Status
            </Label>
            <FormGroup
                className="d-inline-block mb-3"
            >
                <Input
                    type="select"
                    name="batchesStatus"
                    bsSize="sm"
                    className="waves-effect"
                    style={{ width: "10rem" }}
                    onChange={e => {

                    }}
                >
                    <option value="">All</option>
                    <option value="">In-process</option>
                    <option value="">Complete</option>
                    <option value="">Failed</option>
                </Input>
            </FormGroup>
            <div className="clearfix"></div>
            <Label
                for="brewsSearch"
                className="d-inline-block font-size-12 mb-3"
                style={{
                    width: "10rem"
                }}
            >
                Search
            </Label>
            <FormGroup
                className="d-inline-block mb-3"
            >
                <Input
                    type="search"
                    name="brewsSearch"
                    bsSize="sm"
                    id="batchesSearch"
                    placeholder="Filter"
                    className="waves-effect"
                    style={{ width: "10rem" }}
                    disabled={true} // not supported
                />
            </FormGroup>
            <div className="clearfix"></div>
            <Label
                for="brewsStartedFromDate"
                className="d-inline-block font-size-12 mb-3"
                style={{
                    width: "10rem"
                }}
            >
                Start Date
            </Label>
            <FormGroup
                className="d-inline-block mb-3"
            >
                <Input
                    bsSize="sm"
                    type="date"
                    name="brewsStartedFromDate"
                    className="waves-effect mr-2"
                    style={{ width: "14rem" }}
                    value={query.get("batchFrom") || ""}
                    onChange={e => {
                        query.delete("batchFrom");
                        if (e.target.value) {
                            query.append("batchFrom", e.target.value);
                        }
                        history.push({search: query.toString()});
                    }}
                />
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect"
                    disabled={!query.get("batchFrom")}
                    onClick={() => {
                        query.delete("batchFrom");
                        history.push({search: query.toString()});
                    }}
                >
                        Clear
                </Button>
            </FormGroup>
            <div className="clearFix"></div>
            <Label
                for="brewsCompletedDate"
                className="d-inline-block font-size-12 mb-3"
                style={{
                    width: "10rem"
                }}
            >
                End Date
            </Label>
            <FormGroup
                className="d-inline-block mb-3"
            >
                <Input
                    bsSize="sm"
                    type="date"
                    name="brewsStartedToDate"
                    className="waves-effect mr-2"
                    style={{ width: "14rem" }}
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
                    color="secondary"
                    size="sm"
                    className="waves-effect"
                    disabled={!query.get("batchTo")}
                    onClick={() => {
                        query.delete("batchTo");
                        history.push({search: query.toString()});
                    }}
                >
                        Clear
                </Button>
            </FormGroup>
        </div>
        </React.Fragment>
    );
}