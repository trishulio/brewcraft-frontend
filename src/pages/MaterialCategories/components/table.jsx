import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useQuery } from "../../../helpers/utils";
import Table, { Th } from "../../../component/Common/table";

export default function MaterialCategoriesTable() {
    const history = useHistory();
    const query = useQuery();

    const categories = useSelector(state => {
        return state.MaterialCategories.content;
    });

    const allCategories = useSelector(state => {
        return state.MaterialCategories.all;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        let order = query.get("order");
        query.delete("sort");
        query.delete("order");
        switch(name) {
            case "materialCategoryName":
                if (sort !== "name") {
                    order = undefined;
                }
                query.append("sort", "name");
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
        <Table hover>
            <thead>
                <tr>
                    <Th
                        name="materialCategoryName"
                        id="name"
                        onSort={onSort}
                    >
                        Name
                    </Th>
                    <th>Parent Category</th>
                </tr>
            </thead>
            <tbody>
                {
                    categories.map((category, key) =>
                        <tr key={key} onClick={() => history.push("/materials/categories/" + category.id)}>
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
