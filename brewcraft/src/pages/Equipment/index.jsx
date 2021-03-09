import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, isArray, map, findIndex, filter, set } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { Modal } from "../../component/Common/Modal";
import EquipmentTable from "./EquipmentTable";
import {
  getFacilities,
  editEquipments,
  saveEquipments,
} from "../../store/Equipment/actions";
import EquipmentForm from "./EquipmentForm";

export default function Equipments() {
  const [isOpen, setIsOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    edit: false,
    heading: "Add Equipment",
  });
  const [formModel, setFormModel] = useState({
    id: null,
    name: "",
    type: "",
    status: "Active",
    maxCapacity: {
      value: "",
      symbol: "l",
    },
  });
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.Equipments);
  const typeSelection = [
    "Barrel",
    "Boil Kettle",
    "Brite Tank",
    "Fermenter",
    "Mix Tank",
    "Serving Tank",
    "Tote",
    "Whirl Pool",
  ];
  useEffect(() => {
    /**
     * @description setting current page breadcrub
     *
     */
    dispatch(
      setBreadcrumbItems("Equipments", [
        { title: "Dashboard", link: "/dashboard" },
      ])
    );
    /**
     * @description get facilities if data type is array
     *
     */
    isArray(data) && dispatch(getFacilities());
  }, []);

  const tableData = useCallback(() => {
    return map(get(data, "content[0].equipment", []), (currentList) => {
      return { ...currentList, ...currentList.maxCapacity };
    });
  }, [data]);
  const selectType = useCallback(() => {
    return map(typeSelection, (currentList, key) => {
      return (
        <option type={currentList} key={key}>
          {currentList}
        </option>
      );
    });
  }, [typeSelection]);
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
  const dialogCloseFn = () => {
    setIsOpen(false);
  };
  const dialogOpenFn = () => {
    setFormModel({
      id: null,
      name: "",
      type: "",
      status: "",
      maxCapacity: {
        value: "",
        symbol:""
      },
    });
    setIsOpen(true);
    setEditForm({ edit: false, heading: "Add Equipment" });
  };
  const createEquipment = (e, model) => {
    const Model = {
      ...formModel,
      ...model,
      maxCapacity: {
        ...formModel.maxCapacity,
        ...model.maxCapacity,
      },
      equipmentId: get(data, "content[0].id"),
    };
    if(editForm.edit){
      dispatch(editEquipments({ form: Model, successFn: dialogCloseFn }));
    }else{
      dispatch(saveEquipments({ form: Model, successFn: dialogCloseFn }));
    }
  };

  const editEnable = (rowId) => {
    const data_filter = filter(tableData(), (o) => o.id === rowId);
    setFormModel({
      id: get(data_filter[0], "id"),
      name: get(data_filter[0], "name"),
      type: get(data_filter[0], "type"),
      status: get(data_filter[0], "status"),
      maxCapacity: {
        value: get(data_filter[0], "value"),
        symbol: get(data_filter[0], "symbol"),
      },
    });
    setEditForm({ edit: true, heading: "Edit Equipment" });
    setIsOpen(true);
  };
  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <div className="float-right mb-3">
            <Button color="link" onClick={dialogOpenFn}>
              Add Equipment
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <EquipmentTable facilities={tableData()} editFn={editEnable} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isOpen && (
        <Modal
          show={isOpen}
          close={dialogCloseFn}
          title={editForm.heading}
        >
          <EquipmentForm
            companySubmit={createEquipment}
            close={dialogCloseFn}
            formModal={formModel}
            type={selectType()}
          />
        </Modal>
      )}
    </Fragment>
  );
}
