import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Row, Col, Card, CardBody, Button ,ModalFooter} from "reactstrap";

export default function NewMaterialType({ companyContact,close, optionsList }) {
  const defaultValues = {
    firstName:'',
    lastName:'',
    phoneNumber:'',
    email:'',
    supplier:""
  }
  return (
    <AvForm onValidSubmit={companyContact} model={defaultValues}>
      <Card>
        <CardBody>
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
