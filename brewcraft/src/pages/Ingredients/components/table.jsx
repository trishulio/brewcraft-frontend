import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Table, { Th } from "../../../component/Common/table";
import { useQuery } from "../../../helpers/utils";

export default function IngredientsTable() {
    const history = useHistory();
    const query = useQuery();

    const ingredients = useSelector(state => {
        return state.Ingredients.content;
    });

    function onSort(e) {
        const name = e.target.getAttribute("name");
        const sort = query.get("sort");
        let order = query.get("order");
        query.delete("sort");
        query.delete("order");
        switch(name) {
            case "ingredientsName":
                if (sort !== "name") {
                    order = undefined;
                }
                query.append("sort", "name");
                break;
            case "ingredientsUpc":
                if (sort !== "upc") {
                    order = undefined;
                }
                query.append("sort", "upc");
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

    return  (
        <Table>
            <thead>
                <tr>
                    <Th
                        name="ingredientsName"
                        id="name"
                        onSort={onSort}
                    >
                        Name
                    </Th>
                    <th>Class</th>
                    <th>Category</th>
                    <th>Measure</th>
                    <Th
                        name="ingredientsUpc"
                        id="upc"
                        onSort={onSort}
                    >
                        UPC
                    </Th>
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