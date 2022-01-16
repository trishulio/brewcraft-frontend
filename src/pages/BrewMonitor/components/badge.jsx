import React from "react";
import * as ReactStrap from "reactstrap";

export function Badge(props) {
    return (
        <React.Fragment>
            {props.stage.status.id === 1 && (
                <ReactStrap.Badge className={props.className} color="info">
                    In Progress
                </ReactStrap.Badge>
            )}
            {props.stage.status.id === 2 && (
                <ReactStrap.Badge className={props.className} color="primary">
                    Complete
                </ReactStrap.Badge>
            )}
            {props.stage.status.id === 3 && (
                <ReactStrap.Badge className={props.className} color="danger">
                    Failed
                </ReactStrap.Badge>
            )}
            {props.stage.status.id === 4 && (
                <ReactStrap.Badge className={props.className} color="primary">
                    Init
                </ReactStrap.Badge>
            )}
            {props.stage.status.id === 5 && (
                <ReactStrap.Badge className={props.className} color="warning">
                    Stopped
                </ReactStrap.Badge>
            )}
            {props.stage.status.id === 6 && (
                <ReactStrap.Badge className={props.className} color="primary">
                    Skip
                </ReactStrap.Badge>
            )}
        </React.Fragment>
    );
}
