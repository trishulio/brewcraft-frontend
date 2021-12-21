import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "../../../helpers/utils";
import Table, { Th } from "../../../component/Common/table";

export default function MaterialCategoriesTable() {
    const history = useHistory();
    const query = useQuery();

    const categories = useSelector((state) => {
        return state.MaterialCategories.content;
    });

    const allCategories = useSelector((state) => {
        return state.MaterialCategories.all;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        let order = query.get("order");
        query.delete("sort");
        query.delete("order");
        switch (name) {
            case "materialCategoryName":
                if (sort !== "name") {
                    order = undefined;
                }
                query.append("sort", "name");
                break;
            case "materialCategoryParentCategory":
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
        <Table hover>
            <thead>
                <tr>
                    <Th name="materialCategoryName" id="name" onSort={onSort}>
                        Name
                    </Th>
                    <Th
                        name="materialCategoryParentCategory"
                        id="parentCategory"
                        onSort={onSort}
                    >
                        Parent Category
                    </Th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category, key) => (
                    <tr
                        key={key}
                        onClick={() =>
                            history.push("/materials/categories/" + category.id)
                        }
                        data-testid="tabledata"
                    >
                        <td>{category.name}</td>
                        <td>
                            {allCategories.find(
                                (c) => c.id === category.parentCategoryId
                            )?.name || "-"}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
