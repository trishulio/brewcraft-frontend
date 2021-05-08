import React, { useEffect, Fragment, useState, useMemo } from "react";
import { get, map, findIndex, omit } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { Modal } from "../../component/Common/Modal";
import {
  fetchStorages,
  createStorage,
  updateStorage,
  deleteStorage,
} from "../../store/Storages/actions";
import BootstrapTable from "../../component/Tables/bootstrap-table";
import StorageForm from "./storage-form";

export default function Storage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectRows, setSelectRows] = useState([]);
  const [deleteIsopen, setDeleteIsopen] = useState(false);
  const [editForm, setEditForm] = useState({ edit: false, formData: null });
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.Storages);
  const [tableColumn, setTableColumn] = useState([
    {
      text: "Storage Name",
      dataField: "name",
      sort: true,
    },
    {
      text: "Storage Type",
      dataField: "type",
      sort: true,
    },
    {
      text: "Facility Name",
      dataField: "facility_name",
      sort: true,
    },
    {
      text: "Facility AddressLine1",
      dataField: "addressLine1",
      sort: true,
    },
    {
      text: "Facility Country",
      dataField: "country",
      sort: true,
    },
  ]);

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Facility Storage", [
        { title: "Dashboard", link: "/dashboard" },
      ])
    );
    dispatch(fetchStorages());
  }, []);

  const onAdd = () => {
    setIsOpen(true);
    setEditForm({ edit: false, formData: null });
  };
  const dialogOpenEditFn = (selectRows) => {
    // selectRows
    const IndexVlaue = findIndex(
      data,
      (storage) => storage.id === selectRows[0]
    );
    if (IndexVlaue != -1) {
      setEditForm({ edit: true, formData: { ...data[IndexVlaue] } });
      setIsOpen(true);
    }
    setSelectRows(selectRows);
  };

  //delete
  const dialogOpenDeleteFn = (rows) => {
    setSelectRows(rows);
    setDeleteIsopen(true);
  };
  const dialogOpenDeleteCloseFn = () => setDeleteIsopen(false);
  const deleteConfirmFn = () => {
    dispatch(
      deleteStorage({
        id: selectRows[0],
        success: () => {
          setSelectRows([]);
          dialogOpenDeleteCloseFn();
        },
      })
    );
  };

  const onDialogClose = (isSave, formFields) => {
    if (isSave) {
      if (editForm.edit) {
        dispatch(
          updateStorage({
            formData: { id: editForm.formData.id, ...formFields },
            success: () => {
              setIsOpen(false);
            },
          })
        );
      } else {
        dispatch(
          createStorage({
            formData: { ...formFields },
            success: () => {
              setIsOpen(false);
            },
          })
        );

      }
    }
    setIsOpen(false);
  };

  const TableData = useMemo(() => {
    return map(data, (storage) =>
      omit(
        {
          ...storage.facility.address,
          ...storage.facility,
          ...storage,
          facility_name: get(storage, "facility.name"),
          facility_id: get(storage, "facility.id"),
        },
        ["facility", "address"]
      )
    );
  }, [data]);

  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <Button onClick={onAdd} color="primary" className="mb-4">
            Add Storage
          </Button>
          <Card>
            <CardBody className="p-0 pl-2 pr-2">
              <BootstrapTable
                column={tableColumn}
                data={TableData}
                tableName="Storage"
                editOnClick={dialogOpenEditFn}
                deletOnClick={dialogOpenDeleteFn}

              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isOpen && (
        <Modal
          show={isOpen}
          close={onDialogClose}
          title={editForm.edit ? "Edit Storage" : "Add Storage"}
        >
          <StorageForm
            close={onDialogClose}
            formModal={editForm.edit ? editForm.formData : []}
          />
        </Modal>
      )}
      {!!deleteIsopen && (
        <Modal
          show={deleteIsopen}
          close={dialogOpenDeleteCloseFn}
          title="Delete Storage"
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
