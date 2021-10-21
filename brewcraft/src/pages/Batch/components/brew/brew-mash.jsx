import React from "react";
import { useSelector } from "react-redux";
import {
    Row,
    Col
} from "reactstrap";
import { setProductsPageSize } from "../../../../store/actions";
import Ingredients from "../ingredients";
import Times from "../times";

export default function BrewMash({ editable }) {

    const stage = useSelector(state => {
        return state.Batch.stages.content[0] || {};
    });

    const mixture = useSelector(state => {
        return state.Batch.mixtures.content[0] || {};
    });

    const ingredientProps = {
        mixture,
        title: "Mash Ingredients",
        mTitle: "Mash Ingredient",
        multiple: true,
        editable
    };

    return (
        <React.Fragment>
            <Row>
                <Col xs="12">
                    <div className="mb-3">
                        <Times {...{stage, editable}}/>
                    </div>
                </Col>
                <Col sm="6" xl="4">
                    <div className="mb-3">
                        <Ingredients {...ingredientProps}/>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}