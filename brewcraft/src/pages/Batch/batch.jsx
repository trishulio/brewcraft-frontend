import React from "react";
import {
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import BatchDetails from "./components/batch-details";
import BrewToolbar from "./components/brew/toolbar";
import TabContent from "./components/brew/tab-content";
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
                    <BatchDetails {...props}/>
                    {props.showTabContent && <TabContent {...props}/>}
                </CardBody>
            </Card>
        </React.Fragment>
    );
}