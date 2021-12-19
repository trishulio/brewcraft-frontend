import React from "react";
import * as ReactStrap from "reactstrap";

export const CardHeader = ({ children }) => {
    return (
        <ReactStrap.CardHeader className="font-size-14 mb-2">
            {children}
        </ReactStrap.CardHeader>
    );
};

export const CardBody = (props) => {
    return <ReactStrap.CardBody>{props.children}</ReactStrap.CardBody>;
};

export const Card = (props) => {
    return <ReactStrap.Card>{props.children}</ReactStrap.Card>;
};
