import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";

export default function ProductCategoriesToolbar() {
    const history = useHistory();

    return (
        <React.Fragment>
            <Toolbar>
                <Button
                    type="button"
                    color="secondary"
                    className="waves-effect mr-2 mb-3"
                    onClick={() => {
                        history.push({
                            pathname: "/brews/new",
                            search: "?edit=true",
                        });
                    }}
                >
                    New Brew
                </Button>
            </Toolbar>
        </React.Fragment>
    );
}
