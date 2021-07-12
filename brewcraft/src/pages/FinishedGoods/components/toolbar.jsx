import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Button,
    Input
} from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";

export default function FinishedGoodsToolbar() {

    const history = useHistory();

    const products = useSelector(state => {
        return state.Products.all.sort((e1, e2) => e1.name.localeCompare(e2.name));
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
                        pathname: "/finished-goods/new",
                        search: "?edit=true"
                    });
                }}
            >
                    New Finished Good
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
            >
                    Repackage
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push("/batches");
                }}
            >
                    Batches
            </Button>
            <Input
                type="select"
                size="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
            >
                <option value="">Product</option>
                {
                    products.map((value, index) => (
                        <option value={value.id} key={index}>
                            {value.name}
                        </option>
                    ))
                }
            </Input>
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