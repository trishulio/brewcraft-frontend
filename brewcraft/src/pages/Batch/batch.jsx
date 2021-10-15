import React from "react";
import {
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import Details from "./components/batch-details";
import Toolbar from "./components/toolbar";
import TabContent from "./components/brew-tab-content";

export default function Batch(props) {

    return (
        <React.Fragment>
            <Card className="mb-3">
                <CardHeader>
                    <div className="float-right">
                        <Toolbar {...props}/>
                    </div>
                </CardHeader>
                <CardBody>
                    <Details {...props}/>
                    <TabContent {...props}/>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}