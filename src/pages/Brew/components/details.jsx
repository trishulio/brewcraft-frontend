import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "reactstrap";
import BrewMiniCard from "./mini-card";

export default function BatchMetadata() {
    const { error } = useSelector((state) => {
        return state.Batch.Batch;
    });

    return (
        <React.Fragment>
            {error && (
                <Alert color="info" className="mt-2 mb-4">
                    <strong>Oh snap!</strong> Change a few things up and try
                    submitting again.
                </Alert>
            )}
            <BrewMiniCard />
        </React.Fragment>
    );
}
