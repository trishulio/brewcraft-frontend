import React, { useEffect, useState } from "react";
import { setBreadcrumbItems } from "../../store/actions";
import BootstrapTable from "react-bootstrap-table-next";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Col,
  Row,
  Button,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { Modalcall } from "./components/Modalcall";
import Contact from "./components/Contact";
import {
  saveContact,
  editContact,
  deleteContact,
} from "../../store/Contacts/actions";
import cellEditFactory from 'react-bootstrap-table2-editor';
import { get, filter, forEach } from "lodash";

export default function Contacts() {
  //local state
  // dialog open & close
  const [show, setShow] = useState(false);

  // delete button disabled
  const [deleteshow, setDeleteshow] = useState(false);

  // form type open state
  const [modaldata, setModaldata] = useState({
    title: "",
    type: null,
    formData: null,
  });
  const [btnprimary1, setBtnprimary1] = useState(false);

  const [rowSelection, setRowSelection] = useState([]);
  // fetch redux data from store
  const { data, loading, error, formLoading } = useSelector(
    (state) => state.Contacts
  );

  // dispatch action
  const dispatch = useDispatch();

  // component did mount alternative for functional component
  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Contacts", [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Contacts", link: "#" },
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
      text: "Product ID",
    },
    {
      dataField: "username",
      text: "NAME",
      style: {
        minWidth: "200px",
        cursor: "pointer",
      },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => editFormshow(row),
      },
    },
    {
      dataField: "email",
      text: "EMAIL",
    },
    {
      dataField: "phone_number",
      text: "PHONE NUMBER",
    },
    {
      dataField: "Contact_owner",
      text: "CONTACT OWNER",
    },
    {
      dataField: "associated_company",
      text: "ASSOCIATED COMPANY",
    },
    {
      dataField: "last_acitivity",
      text: "LAST ACITIVITY DATE (GMT+5:30)",
    },
    {
      dataField: "lead_status",
      text: "LEAD STATUS",
    },
    {
      dataField: "create_date",
      text: "CREATE DATE (GMT+5:30)",
    },
  ];

  // open form for create new contact
  const createFormshow = () => {
    setModaldata({ title: "Create Contact", type: "create", formData: null });
    setShow(true);
  };

  // open form for edit  contact
  const editFormshow = (formData) => {
    setModaldata({ title: "Edit Contact", type: "edit", formData });
    setShow(true);
  };

  // open form for delete a contact
  const deleteFormshow = () => {
    setModaldata({ title: "Create Contact", type: "create", formData: null });
    setShow(true);
  };

  // close form dialog
  const closeDialog = () => {
    setShow(false);
  };
  // delete contact list to saga
  const deleteDispatch = () => {
    const idData = forEach(rowSelection, (value) => {
      return get(data, ["value", "id"]);
    });
    dispatch(deleteContact(idData.sort()));
    setDeleteshow(false);
  };
  // form submit function edit, new
  const handleValidSubmit = (event, values) => {
    const { type, formData } = modaldata;
    if (type == "edit") {
      // edit contact data send to redux
      dispatch(editContact({ ...values, id: get(formData, "id") }));
    } else {
      // create new contact data send to redux
      dispatch(saveContact(values));
    }
    setShow(false);
  };

  // if form is invalid
  const handleInvalidSubmit = (event, values) => {
    // console.log(event, values);
  };

  //table check box check/uncheck
  const singleColmunselect = (row, isSelect, rowIndex, e) => {
    if (isSelect) {
      setRowSelection([...rowSelection, rowIndex]);
    } else {
      const rowupdate = filter(rowSelection, (arrayValue) => {
        return arrayValue != rowIndex;
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
  const editforFromlist = () => editFormshow(data[rowSelection]);

  const deleteDialogopen = () => setDeleteshow(true);

  return (
    <>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Dropdown
                isOpen={btnprimary1}
                toggle={() => setBtnprimary1(!btnprimary1)}
              >
                <DropdownToggle tag="button" className="btn btn-primary">
                  Contact<i className="mdi mdi-chevron-down"></i>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="#" onClick={createFormshow}>
                    Create
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={editforFromlist}
                    disabled={rowSelection.length != 1}
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    href="#"
                    onClick={deleteDialogopen}
                    disabled={rowSelection.length == 0}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <div className="table-rep-plugin">
                <div
                  className="table-responsive mb-0"
                  data-pattern="priority-columns"
                >
                  <BootstrapTable
                    className="pd-0"
                    cellEdit={ cellEditFactory({ mode: 'click' }) }
                   
                    keyField="id"
                    data={data}
                    columns={columns}
                    striped
                    hover
                    selectRow={{
                      mode: "checkbox",
                      clickToSelect: false,
                      onSelect: (row, isSelect, rowIndex, e) =>
                        singleColmunselect(row, isSelect, rowIndex, e),
                      onSelectAll: (isSelect, rows, e) =>
                        allSelection(isSelect, rows, e),
                    }}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* if show is false it will not effect modal && if the state is changing this will not render */}
      {show && (
        <Modalcall
          show={show}
          handlerClose={setShow}
          title={modaldata.title}
          size="lg"
        >
          <Contact
            submit={handleValidSubmit}
            invalid={handleInvalidSubmit}
            close={closeDialog}
            forstatus={formLoading}
            predata={modaldata}
          />
        </Modalcall>
      )}
      {deleteshow && (
        <Modalcall
          show={deleteshow}
          handlerClose={setDeleteshow}
          title="Delete Contact"
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
        </Modalcall>
      )}
    </>
  );
}
