import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Row, Col, Card, CardBody, Button, ModalFooter } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { map } from "lodash";

export default function MaterialDialog({to, submitFn, close, optionsList, model , categoryModelOpen }) {

  const units = ["hl", "l", "ml", "kg", "g"];

  return (
    <AvForm onValidSubmit={submitFn} model={model}>
      <Card>
        <CardBody>
          <Row>
            <Col lg="6">
              <AvField
                name="materialName"
                label="Name"
                placeholder="Enter Name"
                type="text"
                errorMessage="Enter Valid Name"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="6">
              <AvField type="select" name="materialBaseQuantityUnit" label="Unit of Measure" placeholder="Unit" errorMessage="Enter Unit" validate={{ required: { value: true } }}>
              <option disabled value="">Select Unit</option>
                {
                  map(units, (value, index) => (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  ))
                }
              </AvField>
            </Col>
          </Row>
          <Row className="container-fluid d-flex row-no-padding full-height align-items-center justify-content-center">
            <Col xs="6" style={{paddingLeft: 0}}>
              <AvField
                type="select"
                name="materialCategoryId"
                label="Category"
                default
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Select a valid category",
                  },
                }}
              >
                <option disabled value="">
                  Select Category
                </option>
                {optionsList}
              </AvField>
            </Col>
            <Col xs="6">
              <div className="mt-2">
                <Link to={to} onClick={categoryModelOpen} >Add Category</Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <AvField
                name="materialDescription"
                label="Description"
                placeholder="Enter Description"
                type="textarea"
                errorMessage="Enter Valid Description"
                rows={5}
                validate={{ required: { value: false } }}
              />
            </Col>
          </Row>
        </CardBody>
        <ModalFooter>
          <Button
            type="reset"
            color="secondary"
            className="waves-effect"
            onClick={close}
          >
            Close
          </Button>
          <Button
            type="submit"
            color="primary"
            className="waves-effect waves-light"
          >
            Save changes
          </Button>
        </ModalFooter>
      </Card>
    </AvForm>
  );
}
