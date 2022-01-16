import React from "react";
import * as ReactStrap from "reactstrap";
import { ContentLoader } from "./loading";

export const Card = (props) => {
    return (
        <ReactStrap.Card
            className={props.className ? " " + props.className : ""}
        >
            {props.children}
        </ReactStrap.Card>
    );
};

export const CardHeader = (props) => {
    return (
        <ReactStrap.CardHeader
            className={`font-size-14${
                props.className ? " " + props.className : ""
            }`}
        >
            {props.children}
        </ReactStrap.CardHeader>
    );
};

export const CardBody = (props) => {
    return (
        <ContentLoader isLoading={props.isLoading}>
            <ReactStrap.CardBody
                className={props.className ? " " + props.className : ""}
            >
                {props.hasOwnProperty("isOpen") ? (
                    <ReactStrap.Collapse isOpen={props.isOpen}>
                        {props.children}
                    </ReactStrap.Collapse>
                ) : (
                    props.children
                )}
            </ReactStrap.CardBody>
        </ContentLoader>
    );
};

export const CardFooter = (props) => {
    return (
        <ReactStrap.CardFooter
            className={props.className ? " " + props.className : ""}
        >
            {props.children}
        </ReactStrap.CardFooter>
    );
};
