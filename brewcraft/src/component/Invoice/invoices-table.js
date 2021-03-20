import React from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
} from "reactstrap";
import { MDBDataTable } from "mdbreact";
import Select from "react-select";
//Import Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import "../Tables/datatables.scss";
import { useHistory } from 'react-router-dom';
import { get } from 'lodash';

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

const InvoicesTable = () => {

  const [selectedMulti, setSelectedMulti] = React.useState(null);
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const history = useHistory();
  const [rowActionStatus, setRowActionStatus] = React.useState({
    open: false,
    id: null,
  });

  const { invoices } = useSelector((state) => state.Purchases);

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
        sort: "disabled",
        width: 170,
      },
    ],
    rows: invoices.map((row) => ({
      date: (
        <div
          className="text-primary font-weight-bold"
          key="date"
          searchvalue={row.date}
        >
          {row.date}
        </div>
      ),
      number: (
        <div
          className="text-primary font-weight-bold"
          key="number"
          searchvalue={row.number}
        >
          {row.number}
        </div>
      ),
      vendor: (
          <div
            className="text-primary font-weight-bold"
            key="vender"
            searchvalue={row.vendor}
          >
            {row.vendor}
          </div>
      ),
      amountDue: (
        <div searchvalue={row.amountDue}>
          <div
            className="text-primary text-right font-weight-bold"
            key="amount"
          >
            ${row.amountDue}
          </div>
          <div className="text-right" key="total">
            Total ${row.totalAmount}
          </div>
        </div>
      ),
      paymentStatus: (
        <div
          className="d-flex align-items-center justify-content-center"
          searchvalue={row.paymentStatus}
        >
          <h5>
            <Badge color="success" className="mr-1">
              {row.paymentStatus}
            </Badge>
          </h5>
        </div>
      ),
      actions: [
        <div
          className="d-flex align-items-center justify-content-between"
          key="actions"
        >
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
            <DropdownToggle
              className="text-secondary border-secondary px-2 py-1 rounded-circle bg-transparent"
              caret
            >
              <i className="mdi mdi-menu-down"></i>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={()=>{editInvoice(row)}}>Edit</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>,
      ],
    })),
  };

  const handleMulti = (selectedOption) => {
    setSelectedMulti(selectedOption);
  };

  const editInvoice = (invoice) => {
    history.push(`/purchases/${get(invoice, 'id')}`);
  }

  const createInvoice = () => {
    history.push(`/purchases/create`);
  }

  return (
    <React.Fragment>
    <Row>
      <Col xs="12">
        <div className="float-left mb-3">
            <Button
              color="primary"
              className="waves-effect waves-light"
              onClick={createInvoice}
            >
              New Invoice
            </Button>
        </div>
      </Col>
    </Row>
    <Card>
      <CardBody>
        <Row>
          <Col xs="12">
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
              // searching={false}
              displayEntries={false}
              striped
              sortRows={[
                "date",
                "number",
                "vendor",
                "amountDue",
                "paymentStatus",
              ]}
              className="bills-table"
            ></MDBDataTable>
          </Col>
        </Row>
      </CardBody>
    </Card>
    </React.Fragment>
  );
};

export default InvoicesTable;
