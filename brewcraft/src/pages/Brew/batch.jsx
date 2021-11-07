import React from "react";
import {
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import BatchDetails from "./components/details";
import MiniCard from "./components/mini-card";
import Mash from "./components/stages/mash";
import Kettle from "./components/stages/kettle";
import Whirlpool from "./components/stages/whirlpool";
import Toolbar from "./components/toolbar";

export default function Batch(props) {

    return (
        <React.Fragment>
            <Toolbar {...props}/>
            <div style={{ maxWidth: "70rem" }}>
                <MiniCard/>
            </div>
            <BatchDetails {...props}/>
            {props.batch.id && <Card style={{ maxWidth: "70rem" }}className="mb-3">
                <CardHeader>
                    <div className="float-left">
                        <h4 className="card-title font-size-14 pt-1">Mash Lauter</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <Mash {...props}/>
                </CardBody>
            </Card>}
            {props.batch.id && <Card style={{ maxWidth: "70rem" }} className="mb-3">
                <CardHeader>
                    <div className="float-left">
                        <h4 className="card-title font-size-14 pt-1">Boil</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <Kettle {...props}/>
                </CardBody>
            </Card>}
            {props.batch.id && <Card style={{ maxWidth: "70rem" }} className="mb-3">
                <CardHeader>
                    <div className="float-left">
                        <h4 className="card-title font-size-14 pt-1">Whirlpool</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    <Whirlpool {...props}/>
                </CardBody>
            </Card>}
        </React.Fragment>
    );
}