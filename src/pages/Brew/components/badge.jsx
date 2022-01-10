import React from "react";
import * as ReactStrap from "reactstrap";

export function Badge(props) {
    return (
        <React.Fragment>
            {props.stage.status.id === 1 && (
                <ReactStrap.Badge color="info">In Progress</ReactStrap.Badge>
            )}
            {props.stage.status.id === 2 && (
                <ReactStrap.Badge color="primary">Complete</ReactStrap.Badge>
            )}
            {props.stage.status.id === 3 && (
                <ReactStrap.Badge color="danger">Failed</ReactStrap.Badge>
            )}
            {/* {props.stage.status.id === 4 && (
                <ReactStrap.Badge color="primary">Init</ReactStrap.Badge>
            )} */}
            {props.stage.status.id === 5 && (
                <ReactStrap.Badge color="warning">Stopped</ReactStrap.Badge>
            )}
            {props.stage.status.id === 6 && (
                <ReactStrap.Badge color="primary">Skip</ReactStrap.Badge>
            )}
        </React.Fragment>
    );
}
