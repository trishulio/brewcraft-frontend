import { get } from "lodash";
import React, { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { fetchVendor } from "../../store/Vendor/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  ModalFooter,
  ModalBody,
} from "reactstrap";
import { MDBDataTable } from "mdbreact";
import { Modalcall } from "../../component/Common/Modalcall";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { fetchCompany, saveCompany } from "../../store/Company/actions";

export default function VendorList() {
  const [isCompanyDialog, setIsCompanyDialog] = useState(false);
  const [isContactDialog, setIsContactDialog] = useState(false);

  // dispatch action
  const { vendorList, loading, error } = useSelector((state) => {
    return get(state, "Vendor");
  });
  const dispatch = useDispatch();
  //   table header defination
  const tabledata = [
    {
      label: "Company Name",
      field: "cname",
      sort: "asc",
      width: 150,
    },
    {
      label: "Contact",
      field: "contact",
      sort: "asc",
      width: 270,
    },
    {
      label: "Phone",
      field: "phone",
      sort: "asc",
      width: 200,
    },
    {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 200,
    },
  ];

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Vendors", [
        { title: "List all vendors", link: "/vendors" },
      ])
    );
    dispatch(fetchVendor());
    dispatch(fetchCompany());
  }, []);
  // if (loading) {
  //     return <div>Loading...</div>;
  //   }

  // somthing wrong first time
  if (error) {
    return <div>Error</div>;
  }

  // unconditional error occur
  if (!vendorList) {
    return null;
  }
  const addCompanyDialog = () => setIsCompanyDialog(!isCompanyDialog);
  const addContactDialog = () => setIsContactDialog(!isContactDialog);

  const companySubmit = (formdata, data) => {
    dispatch(saveCompany(data));
  };

  const companyContact = (formdata, data) => {
    console.log(data);
    // dispatch(saveCompany(data));
  };
  // if customers is fatching first time

  return (
    <Fragment>
      <ModalBody>
        <Row>
          <Col xs="12">
            <div className="float-right mb-3">
              <Button color="link" onClick={addCompanyDialog}>
                Add Company
              </Button>
              <Button color="link" onClick={addContactDialog}>
                Add Contact
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <Card>
              <CardBody>
                <MDBDataTable
                  responsive
                  bordered
                  data={{ columns: tabledata, rows: [...vendorList] }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ModalBody>
      <Modalcall
        show={isCompanyDialog}
        handlerClose={addCompanyDialog}
        title="Add Company"
      >
        <AvForm onValidSubmit={companySubmit}>
          <Card>
            <CardBody>
              <Row>
                <Col lg="12">
                  <AvField
                    name="cName"
                    label="Company Name*"
                    placeholder="Company Name"
                    type="text"
                    errorMessage="Enter Company Name"
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
                onClick={addCompanyDialog}
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
      </Modalcall>
      <Modalcall
        show={isContactDialog}
        handlerClose={addContactDialog}
        title="Add Contact"
      >
        <AvForm onValidSubmit={companyContact}>
          <Card>
            <CardBody>
              <Row>
                <Col lg="6">
                  <AvField
                    name="name"
                    label="First Name*"
                    placeholder="Enter First Name"
                    type="text"
                    errorMessage="Enter First Name"
                    validate={{ required: { value: true } }}
                  />
                </Col>
                <Col lg="6">
                  <AvField
                    name="last"
                    label="Last Name*"
                    placeholder="Enter Last Name"
                    type="text"
                    errorMessage="Enter Last Name"
                    validate={{ required: { value: true } }}
                  />
                </Col>
                <Col lg="6">
                  <AvField
                    name="phone"
                    label="Phone*"
                    placeholder="Enter Phone"
                    type="text"
                    errorMessage="Enter Valid Phone"
                    validate={{  tel: true }}
                  />
                </Col>
                <Col lg="6">
                  <AvField
                    name="email"
                    label="Email*"
                    placeholder="Enter Email"
                    type="text"
                    errorMessage="Enter Valid Email"
                    validate={{ email: true }}
                  />
                </Col>
              </Row>
            </CardBody>
            <ModalFooter>
              <Button
                type="reset"
                color="secondary"
                className="waves-effect"
                onClick={addContactDialog}
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
      </Modalcall>
    </Fragment>
  );
}
