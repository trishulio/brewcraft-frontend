import React, { useEffect, useState } from "react";
import { setBreadcrumbItems } from "../../store/actions";
import BootstrapTable from "react-bootstrap-table-next";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Col,
  Row,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import Imagefortable from '../../component/Imagefortable';
import { Modal } from "../../component/Common/Modal";
import DriverForm from './driver-form';
import { get } from "lodash";
import {saveDelivery, editDelivery,deleteDelivery} from '../../store/Driver/actions';

export default function Delivery() {
   // dialog open & close
  const [show, setShow] = useState(false);
  const [btnprimary1, setBtnprimary1] = useState(false);
   // dialog open & close

  const history = useHistory();
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  // fetch redux data from store
  const { data, loading, error, formLoading } = useSelector(
    (state) => state.Driver
  );
  // component did mount alternative for functional component
  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Delivery", [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Delivery", link: "/delivery" },
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
  // table columns dataset
  const columns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "name",
      text: "NAME",
      style: {
        minWidth: "200px",
        cursor: "pointer",
      },
    },
    {
      dataField: "image",
      text: "IMAGE",
      formatter: (cell) => <Imagefortable cell={cell} />,
    },
    {
      dataField: "license_plate",
      text: "LICENSE PLATE",
    },
    {
      dataField: "company",
      text: "COMPANY",
    },
    {
      dataField: "last_active",
      text: "LAST ACTIVE",
    },
    {
      dataField: "phone",
      text: "PHONE",
    },
    {
      dataField: "email",
      text: "EMAIL",
    },
    {
      dataField: "last_location",
      text: "LAST LOCATION",
    },
  ];
  const rowEvents = {
    onClick: (e, row, rowIndex) => history.push(`${path}/${get(row, "id")}`),
  };
  const closeDialogWhenSuccess = (id) =>{
    // setShow(false);
    history.push(`${path}/${id}`);
  }
  const openDialogFunc = () =>setShow(true);
   // close form dialog
  const closeDialog = () =>setShow(false);
  const handleValidSubmit = (event, values) => dispatch(saveDelivery({ ...values, dialog:closeDialogWhenSuccess}));
    // if form is invalid
  const handleInvalidSubmit = (event, values) => {
    // console.log(event, values);
  };

  return (
    <>
    <Row>
      <Col>
        <Card>
          <CardBody>
            <Dropdown
              isOpen={btnprimary1}
              toggle={() => setBtnprimary1(!btnprimary1)}
              className="float-right"
            >
              <DropdownToggle tag="button" className="btn btn-primary">
                Delivery<i className="mdi mdi-chevron-down"></i>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="#" onClick={openDialogFunc}>Create</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div className="table-rep-plugin">
              <div
                className="table-responsive mb-0"
                data-pattern="priority-columns"
              >
                <BootstrapTable
                  keyField="id"
                  data={data}
                  columns={columns}
                  rowEvents={rowEvents}
                  striped
                  hover
                />
              </div>
            </div>

          </CardBody>
        </Card>
      </Col>
    </Row>
    {show && (
      <Modal
        show={show}
        close={setShow}
        title={"Create Delivery Driver"}
        size="lg"
      >
       <DriverForm  submit={handleValidSubmit}
            invalid={handleInvalidSubmit}
            close={closeDialog}
            forstatus={formLoading}
            />

      </Modal>
    )}
    </>
  );
}