import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Card, CardBody, Button ,ModalFooter} from "reactstrap";
export default function NewMaterialType({submitFn,model, companyContact,close, optionsList }) {
  // const defaultValues = {
  //   firstName:'',
  //   lastName:'',
  //   phoneNumber:'',
  //   email:'',
  //   supplier:""
  // }
  return (
    <AvForm onValidSubmit={submitFn} model={model}>
      <Card className="noshadow">
        <CardBody className="noshadow">
          <Row>
            <Col lg="6">
              <AvField
                name="categoryName"
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
            // disabled={forstatus.loading}
          >
            Save changes
          </Button>
        </ModalFooter>
      </Card>
    </AvForm>
  );
}
