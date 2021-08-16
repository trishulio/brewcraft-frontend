import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "../../../component/Common/table";

export default function ProductCategoriesTable() {
    const [tableData, setTableData] = useState([]);

    const categories = useSelector(state => {
        return state.ProductCategories.content;
    });

    const allCategories = useSelector(state => {
        return state.ProductCategories.data;
    });

    useEffect(() => {
        setTableData(categories.map(category => {
            let next = category;
            const parents = [];
            while (next) {
                parents.push(next);
                // eslint-disable-next-line no-loop-func
                next = allCategories.find(c => c.id === next.parentCategoryId);
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
    }, [categories, allCategories]);

    return (
        <React.Fragment>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parent</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tableData.map((category, key) =>
                            <tr key={key}>
                                <td><Link to={"/products/categories/" + category.id}>{category.name}</Link></td>
                                <td>{category.parent}</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </React.Fragment>
    );
}