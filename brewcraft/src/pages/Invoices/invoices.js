import React, { useEffect, useState } from "react";
import { setBreadcrumbItems } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Col,
  Row,
  CardBody,
  Badge,
  Button,
} from "reactstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import { get,filter } from "lodash";
import Tabs from "./tabs";
import ExpanTable from "./expand-table";
import {formatCurrency,formatPercent} from '../../helpers/textUtils';
export default function Invoices() {
  const [cardData, setCardData] = useState([
    {
      title: "Overdue",
      icon: "mdi-chart-arc",
      result: "-11",
      value: "180000",
      desc: "Last update 9 minutes ago",
      color: "info",
    },
    {
      title: "Due within next 30 days",
      icon: "mdi-chart-bar",
      result: "-29",
      value: "46782",
      desc: "",
      color: "danger",
    },
    {
      title: "Average time to get paid",
      icon: "mdi-chart-histogram",
      result: "0",
      value: "15.9",
      desc: "",
      color: "warning",
    },
  ]);
  // history for push user
  const history = useHistory();
  const {path} = useRouteMatch();
  const dispatch = useDispatch();

  // fetch redux data from store
  const { data, loading, error, formLoading } = useSelector(
    (state) => state.Invoice
  );

  // component did mount alternative for functional component
  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Invoices", [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Invoices", link: "/invoices" },
      ])
    );
  }, []);

  // if contacts is fatching first time
  if (loading) {
    return <div>Loading...</div>;
  }
  // somthing wrong first time
  if (error) {
    return <div>Error</div>;
  }
  // unconditional error occur
  if (!data) {
    return null;
  }
  const send = (row) => {
  };
  const sendReminder = (row) => {
  };
  const recordPayment = (row) => {
    
  };
  const viewInvoice = (row) => history.push(`${path}/view-invoice/${get(row,"id")}`);
  const createInvoice = () => history.push(`/create-invoice`);
  
  const tabList = [
    {
      id: 0,
      title: "Unpaid",
      component: (
        <ExpanTable
          invoicelist={filter(data,(o)=>{return o.unpaid})}
          send={send}
          sendReminder={sendReminder}
          recordPayment={recordPayment}
          viewInvoice={viewInvoice}
        />
      ),
    },
    {
      id: 1,
      title: "Paid",
      component: (
        <ExpanTable
          invoicelist={filter(data,(o)=>{return o.paid})}
          send={send}
          sendReminder={sendReminder}
          recordPayment={recordPayment}
          viewInvoice={viewInvoice}
        />
      ),
    },
    {
      id: 2,
      title: "All Invoices",
      component: (
        <ExpanTable
          invoicelist={data}
          send={send}
          sendReminder={sendReminder}
          recordPayment={recordPayment}
          viewInvoice={viewInvoice}
        />
      ),
    },
  ];

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Button
            className="float-right mb-4"
            color="primary"
            onClick={createInvoice}
          >
            Create Invoice
          </Button>
        </Col>
      </Row>
      <Row>
        {cardData.map((report, key) => (
          <Col xl="4" md="6" key={key}>
            <Card className="mini-stat bg-primary">
              <CardBody className="mini-stat-img">
                <div className="mini-stat-icon">
                  <i className={"mdi " + report.icon + " float-right"}></i>
                </div>
                <div className="text-white">
                  <h6 className="text-uppercase mb-3 font-size-16">
                    {report.title}
                  </h6>
                  <h2 className="mb-4">{formatCurrency(report.value)}</h2>
                  <Badge color={report.color}> {formatPercent(report.result)}</Badge>
                  <span className="ml-2">{report.desc}</span>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Tabs tabitems={tabList} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
