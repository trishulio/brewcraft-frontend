import React from "react";
import { useHistory } from "react-router-dom";
import {
    Button,
    Input
} from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";

export default function ProductCategoriesToolbar() {
    const history = useHistory();
    // const query = useQuery();
    // const supplierId = query.get("supplier");

    // const users = useSelector(state => {
    //     return state.Users.all;
    // });

    return (
        <Toolbar>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push({
                        pathname: "/users/new",
                        search: "?edit=true"
                    });
                }}
            >
                    New User
            </Button>
            <Input
                name="usersSearch"
                type="search"
                bsSize="sm"
                placeholder="Search"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 170 }}
            />
        </Toolbar>
    );
}