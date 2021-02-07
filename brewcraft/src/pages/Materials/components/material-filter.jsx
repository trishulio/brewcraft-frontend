import React from "react";
import { AvForm, AvField,AvCheckboxGroup, AvCheckbox } from "availity-reactstrap-validation";
import { Row, Col,Button } from "reactstrap";

export default function MaterialFilter({ submitFn, optionsList, model }) {
  return (
    <AvForm onValidSubmit={submitFn} model={model}>
      <Row>
        <Col lg="12">
          <AvField
            type="select"
            name="materialName"
            label="Name"
            default
          >
            <option disabled value="">
              Select
            </option>
            {optionsList}
          </AvField>
        </Col>
        <Col lg="12">
          <AvField
            type="select"
            name="materialCategory"
            label="Category"
            default
          >
            <option disabled value="">
              Select
            </option>
            {optionsList}
          </AvField>
        </Col>
        <Col lg="12">
        <AvCheckboxGroup inline name="hideItemsWithNoQuantity">
            <AvCheckbox label="Hide items with no quantity" value="true" />
          </AvCheckboxGroup>
       </Col>
        <Col lg="12">
          <Button
            type="submit"
            color="primary"
            className="waves-effect waves-light"
            // disabled={forstatus.loading}
          >
            Filter
          </Button>
        </Col>
      </Row>
    </AvForm>
  );
}
