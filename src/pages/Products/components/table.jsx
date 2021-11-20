import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Table, { Th } from "../../../component/Common/table";
import { useQuery } from "../../../helpers/utils";

export default function ProductsList() {
    const history = useHistory();
    const query = useQuery();

    const products = useSelector(state => {
        return state.Products.content;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        let order = query.get("order");
        query.delete("sort");
        query.delete("order");
        switch(name) {
            case "productsName":
                if (sort !== "name") {
                    order = undefined;
                }
                query.append("sort", "name");
                break;
            case "productsClass":
                if (sort !== "class") {
                    order = undefined;
                }
                query.append("sort", "class");
                break;
            case "productsType":
                if (sort !== "type") {
                    order = undefined;
                }
                query.append("sort", "type");
                break;
            case "productsStyle":
                if (sort !== "style") {
                    order = undefined;
                }
                query.append("sort", "style");
                break;
            default:
                break;
        }
        if (!order || order !== "asc") {
            query.append("order", "asc");
        } else {
            query.append("order", "desc");
        }
        history.push({search: query.toString()});
    }

    return (
        <React.Fragment>
            <Table>
                <thead>
                    <tr>
                        <Th
                            name="productsName"
                            id="name"
                            onSort={onSort}
                        >
                            Name
                        </Th>
                        <th>Product Class</th>
                        <th>Type</th>
                        <th>Style</th>
                        {/*
                        Waiting for backend to support sorting on product
                        class, type and style.
                        https://github.com/northstacksoftware/brewcraft-backend/issues/79
                        <Th
                            name="productsClass"
                            id="class"
                            onSort={onSort}
                        >
                            Class
                        </Th>
                        <Th
                            name="productsType"
                            id="type"
                            onSort={onSort}
                        >
                            Type
                        </Th>
                        <Th
                            name="productsStyle"
                            id="style"
                            onSort={onSort}
                        >
                            Style
                        </Th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, key) =>
                            <tr key={key}>
                                <td><Link to={"/products/" + product.id}>{product.name && product.name}</Link></td>
                                <td>{product.productClass ? product.productClass.name : "-"}</td>
                                <td>{product.type ? product.type.name : "-"}</td>
                                <td>{product.style ? product.style.name : "-"}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </React.Fragment>
    );
}