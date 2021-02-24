import React from "react";
import { Link, withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Card, CardBody, Button, ModalFooter } from "reactstrap";

export default function MaterialDialog({ submitFn, close, optionsList, model }) {


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
              <AvField
                type="select"
                name="materialCategory"
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
              <Link to="/materials/categories">Add Category</Link>
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
