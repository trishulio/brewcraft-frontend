import React from "react";
import {
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
import { MDBBtn, MDBDataTable } from "mdbreact";
import Select from "react-select";
//Import Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import "../Tables/datatables.scss";

const optionGroup = [
  {
    label: "Vendors",
    options: [
      { label: "Amazon", value: "Amazon" },
      { label: "Google", value: "Google" },
      { label: "Evanto", value: "Evanto" },
    ],
  },
];

const BillsTable = () => {
  const [selectedMulti, setSelectedMulti] = React.useState(null);
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [rowActionStatus, setRowActionStatus] = React.useState({
    open: false,
    id: null,
  });
  const { bills } = useSelector((state) => state.Purchases);

  const data = {
    columns: [
      {
        label: "Date",
        field: "date",
        sort: "asc",
        width: 150,
      },
      {
        label: "Number",
        field: "number",
        sort: "asc",
        width: 100,
      },
      {
        label: "Vendor",
        field: "vendor",
        sort: "asc",
        width: 250,
      },
      {
        label: "Amount due",
        field: "amountDue",
        sort: "asc",
        width: 150,
      },
      {
        label: "Payment status",
        field: "paymentStatus",
        sort: "asc",
        width: 150,
      },
      {
        label: "Actions",
        field: "actions",
        sort: "asc",
        width: 170,
      },
    ],
    rows: bills.map((row) => ({
      date: [<div className="text-primary font-weight-bold">{row.date}</div>],
      number: [
        <div className="text-primary font-weight-bold">{row.number}</div>,
      ],
      vendor: [
        <div className="text-primary font-weight-bold">{row.vendor}</div>,
        "Vendor",
      ],
      amountDue: [
        <div className="text-primary text-right font-weight-bold">
          ${row.amountDue}
        </div>,
        <div className="text-right">Total ${row.totalAmount}</div>,
      ],
      paymentStatus: [<div className="cell-status bg-success py-1 text-center rounded-pill">{row.paymentStatus}</div>],
      actions: [
        <div className="d-flex align-items-center justify-content-between">
          <div className="text-primary font-weight-bold">Record a payment</div>
          <Dropdown
            isOpen={rowActionStatus.id === row.id && rowActionStatus.open}
            toggle={() =>
              setRowActionStatus({
                open: !rowActionStatus.open,
                id: row.id,
              })
            }
            className="mr-1 mt-2"
          >
            <DropdownToggle className="text-secondary border-secondary px-2 py-1 rounded-circle bg-transparent" caret>
              <i className="mdi mdi-menu-down"></i>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href="#">Action</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>,
      ],
    })),
  };

  const handleMulti = (selectedOption) => {
    setSelectedMulti(selectedOption);
  };

  return (
    <Card>
      <CardBody>
        <Row>
          <Col xs="12">
            <div className="d-flex justify-content-end align-items-center mt-4">
              <MDBBtn rounded color="primary">
                Create a bill
              </MDBBtn>
            </div>
            <div className="mt-4 mb-4">
              <Row>
                <Col xs={3}>
                  <Select
                    value={selectedMulti}
                    isMulti={true}
                    onChange={handleMulti}
                    options={optionGroup}
                    className="select2 select2-multiple"
                    placeholder="All vendors"
                  />
                </Col>
                <Col>
                  <div className="d-flex align-items-center">
                    <DatePicker
                      className="form-control"
                      selected={fromDate}
                      onChange={setFromDate}
                      placeholderText="From"
                    />
                    <span className="ml-2 mr-2">To</span>
                    <DatePicker
                      className="form-control"
                      selected={toDate}
                      onChange={setToDate}
                      placeholderText="To"
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <MDBDataTable
              fixed
              scrollX
              btn
              data={data}
              noBottomColumns
              searching={false}
              displayEntries={false}
              striped
              className="bills-table"
            ></MDBDataTable>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default BillsTable;
