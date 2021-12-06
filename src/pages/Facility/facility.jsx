import React, { useEffect, Fragment, useState, useMemo } from "react";
import { findIndex, map, omit, get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Button } from "reactstrap";
import { Modal } from "../../component/Common/modal";
import FacilityForm from "./facility-form";
import {
  fetchFacilities,
  createFacility,
  deleteFacilities,
  updateFacility,
} from "../../store/Equipment/actions";
import BootstrapTable from "../../component/Tables/bootstrap-table";
import { TableProvider } from "../../component/Tables/table-context";

export default function Facility() {
  const [isOpen, setIsOpen] = useState(false);
  const [editForm, setEditForm] = useState({ edit: false, formData: null });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formModel = {
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
  const tableRows = React.useMemo(()=>{
   return map(facilities, (currentList) => {
    return {
      ...omit({ ...currentList, ...omit(currentList.address, "id") }, [
        "address",
        "equipment",
        "storages",
      ]),
    };
    }
)},[facilities]);

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
      const Model = { ...formModel, ...model };
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
    if (IndexVlaue !== -1) {
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
  const ButtonFormatter = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div className="text-center">
        <Button size="sm" onClick={() => dialogOpenEditFn(row)} className="mr-2">
          Edit
        </Button>
        <Button size="sm" color="warning" onClick={() => dialogOpenDeleteFn(row)}>
          Delete
        </Button>
      </div>
    );
  };
  const tableColumn = [
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
    {
      dataField: "view",
      text: "view",
      headerAlign: "center",
      formatter: ButtonFormatter,
    },
  ];
  const Table_props = useMemo(
    () => ({
      column: tableColumn,
      data:tableRows,
      headerComponent: (
        <Button onClick={dialogOpenFn} color="primary mr-4" >
          Add Facility
      </Button>
      ),
    }),
    // eslint-disable-next-line
    [tableRows]
  );

  return (
    <Fragment>
        <TableProvider value={Table_props}>
          <BootstrapTable />
        </TableProvider>
      {/* <Row>
        <Col xs="12">

          <Card>
            <CardBody className="py-0 px-2">
              <BootstrapTable
                column={tableColumn}
                data={tableRows}
                tableName="Facility"
                editOnClick={dialogOpenEditFn}
                deletOnClick={dialogOpenDeleteFn}
              />
            </CardBody>
          </Card>
        </Col>
      </Row> */}
      {!!isOpen && (
        <Modal
          show={isOpen}
          close={dialogCloseFn}
          title={editForm.edit ? "Edit Facility" : "Add Facility"}
        >
          <FacilityForm
            formModel={editForm.edit ? editForm.formData : formModel}
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