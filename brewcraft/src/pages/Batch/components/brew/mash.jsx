import React from "react";
import { useSelector } from "react-redux";
import {
    Row,
    Col
} from "reactstrap";
import Ingredients from "../mixture/ingredients";
import Details from "../mixture/details";

export default function BrewMash({ editable }) {

    const stage = useSelector(state => {
        return state.Batch.stages.content[0] || {};
    });

    const mixture = useSelector(state => {
        return state.Batch.mixtures.content[0] || {};
    });

    const detailsProps = {
        stage,
        mixture,
        editable
    };

    const ingredientProps = {
        mixture,
        title: "Ingredients",
        mTitle: "Ingredient",
        multiple: true,
        editable
    };

    return (
        <React.Fragment>
            <Row>
                <Col xs="12">
                    <div className="">
                        <Details {...detailsProps}/>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}