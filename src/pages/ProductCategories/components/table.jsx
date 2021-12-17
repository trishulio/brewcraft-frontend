import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Table, { Th } from "../../../component/Common/table";
import { useQuery } from "../../../helpers/utils";

export default function ProductCategoriesTable() {
    const [tableData, setTableData] = useState([]);

    const history = useHistory();
    const query = useQuery();

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

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        let order = query.get("order");
        query.delete("sort");
        query.delete("order");
        switch (name) {
            case "productCategoryName":
                if (sort !== "name") {
                    order = undefined;
                }
                query.append("sort", "name");
                break;
            case "productCategoryParentCategory":
                if (sort !== "parentCategory") {
                    order = undefined;
                }
                query.append("sort", "parentCategory");
                break;
            default:
                break;
        }
        if (!order || order !== "asc") {
            query.append("order", "asc");
        } else {
            query.append("order", "desc");
        }
        history.push({ search: query.toString() });
    }

    return (
        <React.Fragment>
            <Table>
                <thead>
                    <tr>
                        <Th
                            name="productCategoryName"
                            id="name"
                            onSort={onSort}
                        >
                            Name
                        </Th>
                        <Th
                            name="productCategoryParentCategory"
                            id="parentCategory"
                            onSort={onSort}
                        >
                            Parent
                        </Th>
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