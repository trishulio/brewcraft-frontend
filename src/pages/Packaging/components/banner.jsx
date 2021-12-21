import React from "react";
import { UncontrolledAlert } from "reactstrap";

export default function FinshedGoodsInfo() {
    return (
        <React.Fragment>
            <UncontrolledAlert color="info">
                <strong>Heads up!</strong> You have{" "}
                <strong> 40 additional</strong> Warm Stout 325ml bottles x 12
                items.
            </UncontrolledAlert>
        </React.Fragment>
    );
}
