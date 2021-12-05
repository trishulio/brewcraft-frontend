import React from "react";
import {
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import BatchDetails from "./components/details";
import MiniCard from "./components/mini-card";
import Toolbar from "./components/toolbar";
import BatchFerment from "../Brew/components/stages/ferment";

export default function Batch(props) {

    return (
        <React.Fragment>
            <Toolbar {...props}/>
            {props.batch.id && <div style={{ maxWidth: "70rem" }}>
                <MiniCard/>
            </div>}
            <BatchDetails {...props}/>
            {props.batch.id && <Card style={{ maxWidth: "70rem" }} className="mb-3">
                <CardHeader>
                    <div className="float-left">
                        <h4 className="card-title font-size-14 pt-1">Ferment</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <BatchFerment {...props}/>
                </CardBody>
            </Card>}
        </React.Fragment>
    );
}