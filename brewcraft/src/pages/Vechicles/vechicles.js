import React, { Fragment, useState } from "react";
import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import Imagefortable from "../../component/Imagefortable";
import VechicleForm from "./vechicle-form";
import { Modal } from "../../component/Common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { get, filter } from "lodash";
import {
  saveVechicle,
  editVechicle,
  deleteVechicle,
} from "../../store/Vechicles/actions";

export default function Vechicles({ driverid }) {
  const [show, setShow] = useState(false);
  const [deleteshow, setDeleteshow] = useState(false);
  const [btnprimary1, setBtnprimary1] = useState(false);
  const [rowSelection, setRowSelection] = useState([]);
  const [modaldata, setModaldata] = useState({
    title: "",
    type: null,
    formData: null,
  });
  const dispatch = useDispatch();

  const { data, loading, error, formLoading } = useSelector(
    (state) => state.Vechicles
  );

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
  const columns = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "Model",
      text: "Model",
      style: {
        minWidth: "200px",
        cursor: "pointer",
      },
    },
    {
      dataField: "image",
      text: "Image",
      formatter: (cell) => <Imagefortable cell={cell} />,
    },
    {
      dataField: "license_plate",
      text: "License Plate",
    },
  ];
  const closeDialogWhenSuccess = (e) => {
    setShow(false);
    // show massage you vechiles added
  };
  // open form dialog
  const openDialogFunc = () => {
    setModaldata({ title: "Create Vechicle", type: "create", formData: null });
    setShow(true);
  };
  // open form for edit  contact
  const editFormshow = (formData) => {
    setModaldata({ title: "Edit Vechicle", type: "edit", formData });
    setShow(true);
  };

  // open form for delete a contact
  const deleteFormshow = () => {
    setModaldata({ title: "Delete Vechicle", type: "delete", formData: null });
    setShow(true);
  };

  // close form when click on close btn
  const closeDialog = () => setShow(false);

  // delete contact list to saga
  const deleteDispatch = () => {
    dispatch(deleteVechicle(rowSelection));
    setDeleteshow(false);
  };

  // form submit
  const handleValidSubmit = (event, values) => {
    const { type, formData } = modaldata;
    if (type == "edit") {
      // edit contact data send to redux
      dispatch(
        editVechicle({
          ...values,
          id: get(formData, "[0]id"),
          driver_id: driverid,
          dialog: closeDialogWhenSuccess,
        })
      );
    } else {
      dispatch(
        saveVechicle({
          ...values,
          driver_id: driverid,
          dialog: closeDialogWhenSuccess,
        })
      );
    }
  };

  // if form is invalid
  const handleInvalidSubmit = (event, values) => {
    // console.log(event, values);
  };
  const singleColmunselect = (row, isSelect, rowIndex, e) => {
    if (isSelect) {
      setRowSelection([...rowSelection, row]);
    } else {
      const rowupdate = filter(rowSelection, (arrayValue) => {
        return arrayValue.id != row.id;
      });
      setRowSelection([...rowupdate]);
    }
  };
  //table allcheck box check/uncheck
  const allSelection = (isSelect, rows, e) => {
    if (isSelect) {
      setRowSelection([...rows]);
    } else {
      setRowSelection([]);
    }
  };
  // top btn active when single check box select
  const editforFromlist = () => editFormshow(rowSelection);

  const deleteDialogopen = () => setDeleteshow(true);

  return (
    <Fragment>
      <Row>
        <Col>
          <h4 className="card-title mb-4">Vechicles</h4>
        </Col>
        <Col>
          <Dropdown
            isOpen={btnprimary1}
            toggle={() => setBtnprimary1(!btnprimary1)}
            className="float-right"
          >
            <DropdownToggle tag="button" className="btn btn-primary">
              Vechicles<i className="mdi mdi-chevron-down"></i>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={openDialogFunc}>Create New</DropdownItem>
              <DropdownItem
                onClick={editforFromlist}
                disabled={rowSelection.length != 1}
              >
                Edit
              </DropdownItem>
              <DropdownItem
                onClick={deleteDialogopen}
                disabled={rowSelection.length == 0}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="table-rep-plugin">
            <div
              className="table-responsive mb-0"
              data-pattern="priority-columns"
            >
              <BootstrapTable
                keyField="id"
                data={filter(data, (o) => {
                  return get(o, "driver_id") == driverid;
                })}
                columns={columns}
                // rowEvents={rowEvents}
                striped
                hover
                selectRow={{
                  mode: "checkbox",
                  clickToSelect: true,
                  onSelect: (row, isSelect, rowIndex, e) =>
                    singleColmunselect(row, isSelect, rowIndex, e),
                  onSelectAll: (isSelect, rows, e) =>
                    allSelection(isSelect, rows, e),
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
      {show && (
        <Modal
          show={show}
          close={setShow}
          title={modaldata.title}
          size="lg"
        >
          <VechicleForm
            submit={handleValidSubmit}
            invalid={handleInvalidSubmit}
            close={closeDialog}
            forstatus={formLoading}
            predata={modaldata}
          />
        </Modal>
      )}
      {deleteshow && (
        <Modal
          show={deleteshow}
          close={setDeleteshow}
          title="Delete Vechicles"
          size="sm"
        >
          <Button
            type="button"
            outline
            color="danger"
            className="waves-effect waves-light"
            onClick={deleteDispatch}
          >
            are you sure to delete?
          </Button>
        </Modal>
      )}
    </Fragment>
  );
}
