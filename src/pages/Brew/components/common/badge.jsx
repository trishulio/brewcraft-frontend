import React from "react";
import * as ReactStrap from "reactstrap";

export function Badge(props) {
    return (
        <React.Fragment>
            {props.statusId === 1 && (
                <ReactStrap.Badge className={props.className} color="info">
                    In Progress
                </ReactStrap.Badge>
            )}
            {props.statusId === 2 && (
                <ReactStrap.Badge className={props.className} color="primary">
                    Complete
                </ReactStrap.Badge>
            )}
            {props.statusId === 3 && (
                <ReactStrap.Badge className={props.className} color="danger">
                    Failed
                </ReactStrap.Badge>
            )}
            {props.statusId === 4 && (
                <ReactStrap.Badge className={props.className} color="primary">
                    Not Started
                </ReactStrap.Badge>
            )}
            {props.statusId === 5 && (
                <ReactStrap.Badge className={props.className} color="warning">
                    Stopped
                </ReactStrap.Badge>
            )}
            {props.statusId === 6 && (
                <ReactStrap.Badge className={props.className} color="primary">
                    Skip
                </ReactStrap.Badge>
            )}
        </React.Fragment>
    );
}
