import React from "react";
import { Link, withRouter } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Card, CardBody, Button, ModalFooter } from "reactstrap";

export default function MaterialDialog({to, submitFn, close, optionsList, model , categoryModelOpen }) {

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
          </Row>
          <Row>
          <Col lg="6">
              <AvField
                name="materialBaseQuantityUnit"
                label="Base Quantity Unit"
                placeholder="Enter Base Quantity Unit"
                type="text"
                errorMessage="Enter Valid Base Quantity Unit"
                validate={{ required: { value: true } }}
              />
            </Col>
            <Col lg="6">
              <AvField
                name="materialDescription"
                label="Description"
                placeholder="Enter Description"
                type="textarea"
                errorMessage="Enter Valid Description"
                validate={{ required: { value: true } }}
              />
              <Link to={to} onClick={categoryModelOpen} >Add Category</Link>
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
