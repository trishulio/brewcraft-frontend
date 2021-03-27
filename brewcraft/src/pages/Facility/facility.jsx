import React, { useEffect, Fragment, useState } from "react";
import { findIndex, map, omit, get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Row, Col, Button } from "reactstrap";
import { Modal } from "../../component/Common/Modal";
import FacilityForm from "./facility-form";
import {
  fetchFacilities,
  createFacility,
  deleteFacilities,
  updateFacility,
} from "../../store/Equipment/actions";
import BootstrapTable from "../../component/Tables/bootstrap-table";
import { MDBCard, MDBCardBody } from "mdbreact";

export default function Facility() {
  const [isOpen, setIsOpen] = useState(false);
  const [editForm, setEditForm] = useState({ edit: false, formData: null });
  const [tableColumn, setTableColumn] = useState([
    {
      text: "Name",
      dataField: "name",
      sort: true,
    },
    {
      text: "Phone Number",
      dataField: "phoneNumber",
      sort: true,
    },
    {
      text: "Address Line 1",
      dataField: "addressLine1",
      sort: true,
    },
    {
      text: "Address Line 2",
      dataField: "addressLine2",
      sort: true,
    },
    {
      text: "City",
      dataField: "city",
      sort: true,
    },
    {
      text: "Country",
      dataField: "country",
      sort: true,
    },
  ]);
  const [deleteIsopen, setDeleteIsopen] = useState(false);
  const dispatch = useDispatch();
  const { facilities } = useSelector((state) => state.Equipment);
  const [selectRows, setSelectRows] = useState([]);

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
      ...omit({ ...currentList, ...omit(currentList.address, "id") }, [
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
  const dialogOpenEditFn = (selectRows) => {
    // selectRows
    const IndexVlaue = findIndex(
      facilities,
      (facilitie) => facilitie.id === selectRows[0]
    );
    if (IndexVlaue != -1) {
      setEditForm({ edit: true, formData: { ...facilities[IndexVlaue] } });
      setIsOpen(true);
    }
    setSelectRows(selectRows);
  };
  /**
   * @delete Fun
   */
  const dialogOpenDeleteFn = (rows) => {
    setSelectRows(rows);
    setDeleteIsopen(true);
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

  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <MDBCard narrow>
            <MDBCardBody>
              <BootstrapTable
                column={tableColumn}
                data={tableRows}
                tableName="Facility"
                addOnClick={dialogOpenFn}
                editOnClick={dialogOpenEditFn}
                deletOnClick={dialogOpenDeleteFn}
              />
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
