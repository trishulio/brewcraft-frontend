import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, isArray, map, findIndex, filter, set } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Row, Col, Card, CardBody, CardFooter, Button } from "reactstrap";
import { Modal } from "../../component/Common/Modal";
import EquipmentTable from "./component/table";
import {
  fetchFacilities,
  fetchEquipment,
  fetchEquipmentItem,
  createEquipmentItem,
  updateEquipmentItem,
  deleteEquipmentItem
} from "../../store/Equipment/actions";
import { togglePreloader } from "../../store/layout/actions";
import EquipmentForm from "./component/form";
import BootstrapTable from "../../component/Tables/bootstrap-table";

export default function Storage() {
  const [isOpen, setIsOpen] = useState(false);
  const [equipmentItem, setEquipmentItem] = useState(null);
  const dispatch = useDispatch();
  const { equipment, facilities } = useSelector((state) => state.Equipment);
  const [tableColumn, setTableColumn] = useState([
    {
      text: "Name",
      dataField: "name",
      sort: true,
    },
    {
      text: "Type",
      dataField: "type",
      sort: true,
    },
    {
      text: "Facility",
      dataField: "facility",
      sort: true,
    },
    {
      text: "Max Capacity",
      dataField: "maxCapacity",
      sort: true,
    },
    {
      text: "Status",
      dataField: "status",
      sort: true,
    },

  ]);

  const typeSelection = [
    "Barrel",
    "Boil Kettle",
    "Brite Tank",
    "Fermenter",
    "Mix Tank",
    "Serving Tank",
    "Tote",
    "Whirl Pool",
    "Masher", 
    "Lauter Tun",
    "Conditioner"
  ];

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Facility Storage", [
        { title: "Dashboard", link: "/dashboard" },
      ])
    );
    dispatch(fetchEquipment());
    dispatch(fetchFacilities());
  }, []);

  const onAddEquipment = () => {
    setEquipmentItem(null);
    setIsOpen(true);
  };

  const onEditEquipment = equipmentId => {
    dispatch(
      fetchEquipmentItem({
        id: equipmentId,
        success: (data) => {
          setEquipmentItem(data);
          setIsOpen(true);
        }
      }));
  };

  const onDeleteEquipment = equipmentId => {
    dispatch(
      deleteEquipmentItem({
        id: equipmentId,
        success: () => {
          dispatch(fetchEquipment());
        }
      }));
  };

  const onDialogClose = (isSave, data) => {
    if (isSave) {
      if (equipmentItem) {
        dispatch(
          updateEquipmentItem({
            ...equipmentItem,
            ...data,
            success: () => {
              dispatch(fetchEquipment());
              setIsOpen(false);
            }
          }));
      } else {
        dispatch(
          createEquipmentItem({
            ...data,
            success: () => {
              dispatch(fetchEquipment());
              setIsOpen(false);
            }
          }));
      }
    }
    setIsOpen(false);
  };

  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <Button onClick={onAddEquipment} color="primary" className="mb-4">
            Add Storage
          </Button>
          <Card>
            <CardBody className="p-0 pl-2 pr-2">
              <BootstrapTable
                column={tableColumn}
                data={equipment}
                tableName="Storage"
                editOnClick={onEditEquipment}
                deletOnClick={onDeleteEquipment}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isOpen && (
        <Modal
          show={isOpen}
          close={onDialogClose}
          title={equipmentItem ? "Edit Equipment" : "Add Equipment"}
        >
          <EquipmentForm
            close={onDialogClose}
            equipmentTypes={typeSelection}
            facilities={facilities}
            formModal={equipmentItem}
          />
        </Modal>
      )}
    </Fragment>
  );
}
