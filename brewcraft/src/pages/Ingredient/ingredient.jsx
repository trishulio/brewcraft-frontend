import React from "react";
import {
  Row,
  Col
} from "reactstrap";
import Toolbar from "./components/toolbar";
import IngredientDetails from "./components/details";
// import IngredientImage from "./components/image";


export default function Ingredient({ editable, changed, onSave, onDelete }) {
    return (
        <React.Fragment>
            <Toolbar
                editable={editable}
                changed={changed}
                onSave={onSave}
                onDelete={onDelete}
            />
            <Row>
                <Col md={9} xl={8}>
                    <IngredientDetails
                        editable={editable}
                    />
                </Col>
                {/* <Col md="3">
                    <IngredientImage editable={editable} />
                </Col> */}
            </Row>
        </React.Fragment>
    );
}