import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row
} from "reactstrap";
import BatchDetails from "./components/batch-details";
import MiniCard from "./components/mini-card";
import Mash from "./components/brew/mash";
import Kettle from "./components/brew/kettle";
import Whirlpool from "./components/brew/whirlpool";

export default function Batch(props) {

    return (
        <React.Fragment>
            <Row>
                <MiniCard/>
            </Row>
            <BatchDetails {...props}/>
            <Card className="mb-3">
                <CardHeader>
                    <div className="float-left">
                        <h4 className="card-title font-size-14 pt-1">Mash Lauter</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    {props.showTabContent && <Mash {...props}/>}
                </CardBody>
            </Card>
            <Card className="mb-3">
                <CardHeader>
                    <div className="float-left">
                        <h4 className="card-title font-size-14 pt-1">Boil</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    {props.showTabContent && <Kettle {...props}/>}
                </CardBody>
            </Card>
            <Card className="mb-3">
                <CardHeader>
                    <div className="float-left">
                        <h4 className="card-title font-size-14 pt-1">Whirlpool</h4>
                    </div>
                </CardHeader>
                <CardBody>
                    {props.showTabContent && <Whirlpool {...props}/>}
                </CardBody>
            </Card>
        </React.Fragment>
    );
}