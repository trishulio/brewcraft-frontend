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
  updateFacility
} from "../../store/Equipment/actions";
import { MDBCard, MDBCardBody, MDBCardHeader, MDBBtn } from "mdbreact";

export default function Facility() {
  const [isOpen, setIsOpen] = useState(false);
  const [editForm, setEditForm] = useState({ edit: false, formData: null });
  const [tableData, setTableData] = useState({
    columns: [
      {
        label: "",
        field: "check",
        // 'sort': 'asc'
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Phone Number",
        field: "phoneNumber",
        sort: "asc",
        width: 270,
      },
      {
        label: "Address Line 1",
        field: "addressLine1",
        sort: "asc",
        width: 200,
      },
      {
        label: "Address Line 2",
        field: "addressLine2",
        sort: "asc",
        width: 200,
      },
      {
        label: "City",
        field: "city",
        sort: "asc",
        width: 200,
      },
      {
        label: "Country",
        field: "country",
        sort: "asc",
        width: 200,
      },
    ],
    rows: [],
  });
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
   *
   * @param {Event} event
   * @param {Number} itemID
   */
  const rowSelectionFn = (event, itemID) => {
    if (event.target.checked) {
      const current = [...selectRows];
      current.push(itemID);
      setSelectRows(current);
    } else {
      const current = selectRows.filter((rowValue) => rowValue != itemID);
      setSelectRows(current);
    }
  };
  /**
   * @description row iteration
   */
  const tableRows = map(facilities, (currentList) => {
    return {
      ...omit({ ...currentList, ...currentList.address }, [
        "address",
        "equipment",
        "storages",
      ]),
      check: (
        <Input
          type="checkbox"
          key={`rows_${currentList.id}`}
          onClick={(e) => rowSelectionFn(e, currentList.id)}
        />
      ),
    };
  });

  const dialogCloseFn = () => {
    setIsOpen(false);
    setEditForm({edit: false, formData: null})
  };
  const dialogOpenFn = () => {
    setIsOpen(true);
  };

  const createFacilities = (e, model) => {
    if(editForm.edit){
      const Model = { ...model, id:get(selectRows,'[0]') };
      dispatch(
        updateFacility({
          formData: Model,
          success: () => {
            dialogCloseFn();
          },
        })
      );

    }else{
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
    const IndexVlaue = findIndex(facilities, (facilitie)=>facilitie.id===selectRows[0])
      if( IndexVlaue != -1){
        setEditForm({edit: true, formData: {...facilities[IndexVlaue]}});
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
    dispatch(deleteFacilities({
      id: selectRows[0],
      success: () => {
        setSelectRows([]);
        dialogOpenDeleteCloseFn();
      },
    }));
  };
  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <MDBCard narrow>
            <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mt-2">
              <div></div>
              <div>
                <MDBBtn onClick={dialogOpenFn}>
                  <i className="fas fa-plus mt-0 mr-1"></i> Add Facility
                </MDBBtn>
                <MDBBtn
                  disabled={selectRows.length == 0 || selectRows.length > 1}
                  onClick={dialogOpenEditFn}
                >
                  <i className="fas fa-pencil-alt mt-0 mr-1"></i>Edit Facility
                </MDBBtn>
                <MDBBtn
                  disabled={selectRows.length == 0 || selectRows.length > 1}
                  onClick={dialogOpenDeleteFn}
                >
                  <i className="fas fa-times mt-0 mr-1"></i>Delete Facility
                </MDBBtn>
              </div>
            </MDBCardHeader>
            <MDBCardBody>
              <FacilityTable
                facilities={{ ...tableData, rows: tableRows }}
                editFn={dialogCloseFn}
              />
            </MDBCardBody>
          </MDBCard>
        </Col>
      </Row>
      {!!isOpen && (
        <Modal show={isOpen} close={dialogCloseFn} title={editForm.edit?"Edit Facility":"Add Facility"}>
          <FacilityForm
            FormModal={editForm.edit?editForm.formData:FormModal}
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
