import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Button
  } from "reactstrap";
import noImage from "../../../assets/images/no-image.jpg";
import Table from "../../../component/Common/table";

export default function ProductsList() {

    const products = useSelector(state => {
        return state.Products.content;
    });

    const history = useHistory();

    function onSort(e) {
        // TODO
        // add some sorting here ..
        console.log(e);
    }

    function onView(id) {
        history.push("/products/" + id);
    }

    return (
        <React.Fragment>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th></th>
                        <th onClick={onSort}>Name</th>
                        <th>Class</th>
                        <th>Type</th>
                        <th>Style</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, key) =>
                            <tr key={key}>
                                <td>#{product.id}</td>
                                <td><img src={noImage} alt="user" className="avatar-xs mr-2 rounded-circle" /></td>
                                <td>{product.name && product.name}</td>
                                <td>{product.productClass ? product.productClass.name : "-"}</td>
                                <td>{product.type ? product.type.name : "-"}</td>
                                <td>{product.style ? product.style.name : "-"}</td>
                                <td>
                                    <Button color="secondary" size="sm" className="waves-effect waves-light" onClick={() => onView(product.id)}>View</Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </React.Fragment>
    );
}