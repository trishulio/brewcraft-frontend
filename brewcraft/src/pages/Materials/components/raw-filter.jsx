import React from "react";
import { AvForm, AvField,AvCheckboxGroup, AvCheckbox } from "availity-reactstrap-validation";
import { Row, Col,Button } from "reactstrap";

export default function NewMaterial({ submitFn, optionsList, model }) {
  return (
    <AvForm onValidSubmit={submitFn} model={model}>
      <Row>
        <Col lg="12">
          <AvField
            name="MaterialName"
            label="Material Name"
            placeholder="Material Name"
            type="text"
          />
        </Col>
        <Col lg="12">
          <AvField
            type="select"
            name="MaterialType"
            label="Material Type"
            default
          >
            <option disabled value="">
              Select
            </option>
            {optionsList}
          </AvField>
        </Col>
        <Col lg="6">
          <AvField
            name="MinTotalCost"
            label="Min. Total Cost"
            placeholder="Min. Total Cost"
            type="text"
          />
        </Col>
        <Col lg="6">
          <AvField
            name="MaxTotalCost"
            label="Max. Tot. Cost"
            placeholder="Enter First Name"
            type="text"
            errorMessage="Enter First Name"
          />
        </Col>
        <Col lg="6">
          <AvField
            name="MinAvgCost"
            label="Min. Avg Cost"
            placeholder="Min. Avg Cost"
            type="text"
          />
        </Col>
        <Col lg="6">
          <AvField
            name="MaxAvgCost"
            label="Max. Avg Cost"
            placeholder="Max. Avg Cost"
            type="text"
          />
        </Col>
        <Col lg="6">
          <AvField
            name="MinUsed"
            label="Min. Used"
            placeholder="Min. Used"
            type="text"
          />
        </Col>
        <Col lg="6">
          <AvField
            name="MaxUsed"
            label="Max. Used"
            placeholder="Max. Used"
            type="text"
          />
        </Col>
        <Col lg="6">
          <AvField
            name="MinWaste"
            label="Min. Waste"
            placeholder="Min. Waste"
            type="text"
          />
        </Col>
        <Col lg="6">
          <AvField
            name="MaxWaste"
            label="Max. Waste"
            placeholder="Max. Waste"
            type="text"
          />
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
            Search
          </Button>
        </Col>
      </Row>
    </AvForm>
  );
}
