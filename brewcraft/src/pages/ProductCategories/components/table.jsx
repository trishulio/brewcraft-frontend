import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Button
  } from "reactstrap";
import Table from "../../../component/Common/table";

export default function ProductCategoriesTable() {
    const [tableData, setTableData] = useState([]);

    const history = useHistory();

    const categories = useSelector(state => {
        return state.ProductCategories.content;
    });

    const allCategories = useSelector(state => {
        return state.ProductCategories.data;
    });

    useEffect(() => {
        setTableData(categories.map(category => {
            let c = category;
            const parents = [];
            while (c) {
                parents.push(c);
                c = c.parentCategoryId ? allCategories.find(category => category.id === c.parentCategoryId) : null;
            }
            switch(parents.length) {
                case 1:
                    return {
                        id: category.id,
                        name: category.name,
                        type: "Class",
                        parent: "-"
                    };
                case 2:
                    return {
                        id: category.id,
                        name: category.name,
                        type: "Type",
                        parent: parents[1].name
                    };
                case 3:
                    return {
                        id: category.id,
                        name: category.name,
                        type: "Style",
                        parent: parents[1].name
                    };
                default:
                    return {
                        id: category.id,
                        name: category.name,
                        type: "",
                        parent: parents[1].name
                    };
            }
        }));
    }, [categories]);

    function onSort(e) {
        // TODO
        // add some sorting here ..
        console.log(e);
    }

    function onView(id) {
        history.push("/products/categories/" + id);
    }

    return (
        <React.Fragment>
            <Table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category Type</th>
                        <th>Category Parent</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((category, key) =>
                            <tr key={key}>
                                <td>#{category.id}</td>
                                <td>{category.name}</td>
                                <td>{category.type}</td>
                                <td>{category.parent}</td>
                                <td>
                                    <Button color="secondary" size="sm" className="waves-effect waves-light" onClick={() => onView(category.id)}>View</Button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </React.Fragment>
    );
}