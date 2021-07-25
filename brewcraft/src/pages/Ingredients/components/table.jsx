import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
    Button
} from "reactstrap";
import Table from "../../../component/Common/table";

export default function IngredientsTable() {

    const history = useHistory();

    const ingredients = useSelector(state => {
        return state.Ingredients.content;
    });

    function onView(id) {
        if (id) {
            history.push("/materials/ingredients/" + id);
        }
    }

    return  (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Category</th>
                    <th>Measure</th>
                    <th>UPC</th>
                </tr>
            </thead>
            <tbody>
                {
                    ingredients.map((ingredient, key) =>
                        <tr key={key}>
                            <td><Link to={"/materials/ingredients/" + ingredient.id}>{ingredient.name || "-"}</Link></td>
                            <td>{ingredient.materialClass?.name ?
                                <Link className="jadc-effect" to={"/materials/categories/" + ingredient.materialClass.id}>{ingredient.materialClass.name}</Link>
                                : "-"
                                }
                            </td>
                            <td>{ingredient.category?.name ?
                                <Link to={"/materials/categories/" + ingredient.category.id}>{ingredient.category.name}</Link>
                                : "-"
                                }
                            </td>
                            <td>{ingredient.baseQuantityUnit || "-"}</td>
                            <td>{ingredient.upc || "-"}</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}