import React, { useEffect, Fragment, useState } from "react";
import { findIndex, map, omit, get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Row, Col, Button, Input } from "reactstrap";
import { Modal } from "../../component/Common/Modal";
import FacilityTable from "./facility-table";
import FacilityForm from "./facility-form";
import {
  fetchFacilities,
  createFacility,
  deleteFacilities,
  updateFacility,
} from "../../store/Equipment/actions";
import IconsTable from "../../component/IconsTable";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  ColumnToggle,
  Search,
} from "react-bootstrap-table2-toolkit";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBBtn } from "mdbreact";

export default function Facility() {
  const [isOpen, setIsOpen] = useState(false);
  const [editForm, setEditForm] = useState({ edit: false, formData: null });
  const [tableData, setTableData] = useState([     
      {
        text: "Name",
        dataField: "name",
        sort: true
      },
      {
        text: "Phone Number",
        dataField: "phoneNumber",
        sort: true
      },
      {
        text: "Address Line 1",
        dataField: "addressLine1",
        sort: true
      },
      {
        text: "Address Line 2",
        dataField: "addressLine2",
        sort: true
      },
      {
        text: "City",
        dataField: "city",
        sort: true
      },
      {
        text: "Country",
        dataField: "country",
        sort: true
      },
    ]  
    
  );
  const { ToggleList } = ColumnToggle;
  const { SearchBar } = Search;
  const [selectRows, setSelectRows] = useState([]);
  const [deleteIsopen, setDeleteIsopen] = useState(false);
  const dispatch = useDispatch();
  const { facilities } = useSelector((state) => state.Equipment);

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Facility", [
        { title: "Dashboard", link: "/dashboard" },
      ])
    );
    facilities && dispatch(fetchFacilities());
  }, []);

  const FormModal = {
    name: "",
    address: {
      addressLine1: "",
      addressLine2: "",
      country: "",
      province: "",
      city: "",
      postalCode: "",
    },
    phoneNumber: "",
    faxNumber: "",
    equipment: [],
    storages: [],
  };
  /**
   * @description row iteration
   */
  const tableRows = map(facilities, (currentList) => {
    return {
      ...omit({ ...currentList, ...omit(currentList.address,'id') }, [
        "address",
        "equipment",
        "storages",
      ]),
    };
  });

  const dialogCloseFn = () => {
    setIsOpen(false);
    setEditForm({ edit: false, formData: null });
  };
  const dialogOpenFn = () => {
    setIsOpen(true);
  };

  const createFacilities = (e, model) => {
    if (editForm.edit) {
      const Model = { ...model, id: get(selectRows, "[0]") };
      dispatch(
        updateFacility({
          formData: Model,
          success: () => {
            dialogCloseFn();
          },
        })
      );
    } else {
      //
      const Model = { ...FormModal, ...model };
      dispatch(
        createFacility({
          formData: Model,
          success: () => {
            dialogCloseFn();
          },
        })
      );
    }
  };
  const dialogOpenEditFn = () => {
    // selectRows
    const IndexVlaue = findIndex(
      facilities,
      (facilitie) => facilitie.id === selectRows[0]
    );
    if (IndexVlaue != -1) {
      setEditForm({ edit: true, formData: { ...facilities[IndexVlaue] } });
      setIsOpen(true);
    }
  };
  /**
   * @delete Fun
   */
  const dialogOpenDeleteFn = () => {
    if (selectRows.length) {
      setDeleteIsopen(true);
    }
  };
  const dialogOpenDeleteCloseFn = () => setDeleteIsopen(false);
  const deleteConfirmFn = () => {
    dispatch(
      deleteFacilities({
        id: selectRows[0],
        success: () => {
          setSelectRows([]);
          dialogOpenDeleteCloseFn();
        },
      })
    );
  };
  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      const current = [...selectRows];
      console.log(row);
      current.push(row.id);
      setSelectRows(current);
    } else {
      const current = selectRows.filter((rowValue) => rowValue != row.id);
      setSelectRows(current);
    }
  };
 const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map((r) => r.id);
    if (isSelect) {
      setSelectRows(ids);
    } else {
      setSelectRows([]);
    }
  };
  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    selected: selectRows,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll,
  };

  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <MDBCard narrow>
            <MDBCardBody>
              <ToolkitProvider
                keyField="id"
                data={tableRows}
                columns={tableData}
                columnToggle
                search
              >
                {(props) => (
                  <div>
                    <div className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-0 mt-2 pr-0 pt-1">
                      <ToggleList {...props.columnToggleProps} />
                      <div>
                        <div>
                          <MDBBtn onClick={dialogOpenFn}>
                            <i className="fas fa-plus mt-0 mr-1"></i> Add
                            Facility
                          </MDBBtn>
                          <MDBBtn
                            disabled={
                              selectRows.length == 0 || selectRows.length > 1
                            }
                            onClick={dialogOpenEditFn}
                          >
                            <i className="fas fa-pencil-alt mt-0 mr-1"></i>Edit
                            Facility
                          </MDBBtn>
                          <MDBBtn
                            disabled={
                              selectRows.length == 0 || selectRows.length > 1
                            }
                            onClick={dialogOpenDeleteFn}
                          >
                            <i className="fas fa-times mt-0 mr-1"></i>Delete
                            Facility
                          </MDBBtn>
                          <SearchBar {...props.searchProps} />
                        </div>
                      </div>
                    </div>
                    <BootstrapTable
                      {...props.baseProps}
                      pagination={paginationFactory()}
                      selectRow={selectRow}
                      filter={filterFactory()}
                    />
                  </div>
                )}
              </ToolkitProvider>
            </MDBCardBody>
          </MDBCard>
        </Col>
      </Row>
      {!!isOpen && (
        <Modal
          show={isOpen}
          close={dialogCloseFn}
          title={editForm.edit ? "Edit Facility" : "Add Facility"}
        >
          <FacilityForm
            FormModal={editForm.edit ? editForm.formData : FormModal}
            close={dialogCloseFn}
            companySubmit={createFacilities}
          />
        </Modal>
      )}
      {!!deleteIsopen && (
        <Modal
          show={deleteIsopen}
          close={dialogOpenDeleteCloseFn}
          title="Delete Facility"
        >
          are you sure, to delete?
          <Button color="danger" onClick={deleteConfirmFn}>
            Delete
          </Button>
        </Modal>
      )}
    </Fragment>
  );
}
