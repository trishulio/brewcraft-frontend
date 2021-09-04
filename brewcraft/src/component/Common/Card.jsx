import React from "react";
import * as ReactStrap from "reactstrap";

export const CardHeader = props => {
    return (
        <ReactStrap.CardHeader>
            <h4 className="card-title font-size-12 align-middle mb-2">{props.children}</h4>
        </ReactStrap.CardHeader>
    );
};

export const CardBody = props => {
    return (
        <ReactStrap.CardBody>{props.children}</ReactStrap.CardBody>
    );
};

export const Card = props => {
    return (
        <ReactStrap.Card>{props.children}</ReactStrap.Card>
    );
};