import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import Toolbar from "../../../component/Common/toolbar";

export default function FinishedGoodsToolbar() {
    const history = useHistory();
    return <Toolbar></Toolbar>;
}
