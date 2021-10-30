import React from "react";
import { useSelector } from "react-redux";
import {
    Row,
    Col
} from "reactstrap";
import Ingredients from "../mixture/ingredients";
import MixtureRecordings from "../mixture/recording";
import Temperatures from "../mixture/temperature";
import Times from "../mixture/details";

export default function BrewKettle({ editable }) {

    const stage = useSelector(state => {
        return state.Batch.stages.content[1] || {};
    });

    const mixture = useSelector(state => {
        return state.Batch.mixtures.content[1] || {};
    });

    const ingredientProps = {
        mixture,
        title: "Kettle Ingredients",
        mTitle: "Kettle Ingredient",
        multiple: true,
        editable
    };

    const recordingsProps = {
        mixture,
        measureId: 4, // mash temperature
        title: "Mash Temperatures",
        mTitle: "Mash Temperature Record",
        mUnit: "°C",
        multiple: true,
        editable
    };

    return (
        <React.Fragment>
            <Row>
                <Col xs="12">
                    <div className="m=">
                        <Times {...{stage, editable}}/>
                    </div>
                </Col>
                {/* <Col md="6">
                    <div className="mb-3">
                        <Temperatures {...recordingsProps}/>
                    </div>
                </Col>
                <Col md="6">
                    <div className="">
                        <Ingredients {...ingredientProps}/>
                    </div>
                </Col> */}
            </Row>
        </React.Fragment>
    );
}