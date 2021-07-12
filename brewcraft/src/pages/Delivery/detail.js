import React, { Fragment } from "react";
import {
  Media,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import Imagefortable from "../../component/Imagefortable";
import Vechicles from '../Vechicles/vechicles';
import { get } from "lodash";
export default function Detail({ detail }) {

  const columns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "name",
      text: "Location",
      style: {
        minWidth: "200px",
        cursor: "pointer",
      },
    },
    {
      dataField: "image",
      text: "Status",
      formatter: (cell) => <Imagefortable cell={cell} />,
    },
    {
      dataField: "license_plate",
      text: "invoice",
    },
    {
      dataField: "company",
      text: "Pickup Time",
    },
    {
      dataField: "last_active",
      text: "Delivery Time",
    },
    {
      dataField: "phone",
      text: "Comments",
    },
  ];

  const dummydata = [
    {
      id: 0,
      name: "Abella",
      image:
        "data:image/jpeg;base64,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",
      license_plate: "120-B-F20",
      company: "Upwork",
      last_active: "Sat Sep 26 2020 13:22:28 GMT+0530 (India Standard Time)",
      phone: 9654106121,
      email: "Abella@yahoo.com",
      last_location: "faridabad",
    },
  ];


  return (
    <Fragment>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="card-title mb-4">Driver details</h4>
              <Media className="mb-4">
                <img
                  className="d-flex mr-3 rounded-circle avatar-sm"
                  src={get(detail, "image")}
                  alt=""
                />
                <Media className="align-self-center" body>
                  <h4 className="font-size-14 m-0">{get(detail, "name")}</h4>
                  <small className="text-muted">{get(detail, "email")}</small>
                  <p className="mt-2"><b>Phone</b>: {get(detail, "phone")}</p>
                  <p><b>Company</b>: {get(detail, "company")}</p>
                  <p><b>License Plate</b>: {get(detail, "license_plate")}</p>
                  <p><b>Last Active</b>: {get(detail, "last_active")}</p>
                  <p><b>Last Location</b>: {get(detail, "last_location")}</p>
                </Media>
              </Media>

            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardBody>
              {
                detail && <Vechicles driverid={get(detail, "id")} />
              }
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h4 className="card-title mb-4">Delivery Details</h4>
              <div className="table-rep-plugin">
                <div
                  className="table-responsive mb-0"
                  data-pattern="priority-columns"
                >
                  <BootstrapTable
                    keyField="id"
                    data={dummydata}
                    columns={columns}
                    striped
                    hover
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}
