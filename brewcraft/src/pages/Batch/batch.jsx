import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button
} from "reactstrap";
import Details from "./components/batch-details";
import BrewToolbar from "./components/brew/brew-toolbar";
import TabContent from "./components/brew/brew-tab-content";
import Toolbar from "./components/toolbar";

export default function Batch(props) {

    return (
        <React.Fragment>
            <div className="mb-3">
                <Toolbar {...props}/>
            </div>
            <Card className="mb-3">
                <CardHeader>
                    <div className="float-left">
                        <h4 className="card-title font-size-14 pt-1">Brew</h4>
                    </div>
                    <div className="float-right"><BrewToolbar {...props}/></div>
                </CardHeader>
                <CardBody>
                    <Details {...props}/>
                    <TabContent {...props}/>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}