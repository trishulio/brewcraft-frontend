import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
    Button
} from "reactstrap";
import Table from "../../../component/Common/table";

export default function MaterialCategoriesTable() {

    const history = useHistory();

    const categories = useSelector(state => {
        return state.MaterialCategories.content;
    });

    const allCategories = useSelector(state => {
        return state.MaterialCategories.all;
    });

    function onView(id) {
        history.push("/materials/categories/" + id);
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Parent Category</th>
                </tr>
            </thead>
            <tbody>
                {
                    categories.map((category, key) =>
                        <tr key={key}>
                            <td><Link to={"/materials/categories/" + category.id}>#{category.id}</Link></td>
                            <td><Link to={"/materials/categories/" + category.id}>{category.name}</Link></td>
                            <td>
                                <Link to={"/materials/categories/" + category.parentCategoryId}>
                                    {allCategories.find(c => c.id === category.parentCategoryId)?.name || "-"}
                                </Link>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}
