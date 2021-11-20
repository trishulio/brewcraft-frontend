import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
    Input
} from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";
import { useQuery } from "../../../helpers/utils";

export default function ProductToolbar() {
    const history = useHistory();
    const query = useQuery();
    const materialId = query.get("material");

    const materials = useSelector(state => {
        return state.Materials.all;
    });

    return (
        <Toolbar>
            <Input
                type="select"
                bsSize="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
                value={materialId || ""}
                onChange={e => {
                    query.delete("material");
                    if (e.target.value) {
                        query.append("material", e.target.value);
                    }
                    history.push({search: query.toString()});
                }}
            >
                <option value="">Material</option>
                {
                    materials.map((value, index) => (
                        <option value={value.id} key={index}>
                            {value.name}
                        </option>
                    ))
                }
            </Input>
            <Input
                bsSize="sm"
                type="search"
                name="search"
                id="rawMaterialsSearch"
                placeholder="Name"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 170 }}
            />
        </Toolbar>
    );
}