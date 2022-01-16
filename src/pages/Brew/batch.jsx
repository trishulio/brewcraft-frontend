import React from "react";
import { useSelector } from "react-redux";
import BatchDetails from "./components/details";
// import Toolbar from "./components/toolbar";
import BrewTabs from "./components/brew-tabs";
import Nav from "./nav";

export default function Batch(props) {
    const { data: batch } = useSelector((state) => {
        return state.Batch.Batch;
    });

    return (
        <React.Fragment>
            <div style={{ maxWidth: "60rem" }}>
                {/* <div className="mb-3">
                    <Toolbar {...props} />
                </div> */}
                {batch.id && <Nav {...props} />}
                {batch.id && <BrewTabs {...props} />}
                {!batch.id && <BatchDetails {...props} />}
            </div>
        </React.Fragment>
    );
}
