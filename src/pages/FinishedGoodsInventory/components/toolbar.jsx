import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";

export default function FinishedGoodsInventoryToolbar() {
    const history = useHistory();

    return (
        <Toolbar>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push({
                        pathname: "/finishedgoods/new",
                        search: "?edit=true",
                    });
                }}
            >
                New Finished Good
            </Button>
        </Toolbar>
    );
}
