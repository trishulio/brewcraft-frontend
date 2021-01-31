import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map, pick, reduce, set } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { Modalcall } from "../../component/Common/Modalcall";
import RawMaterials from "./components/raw-materials-table";
import RawFilter from "./components/raw-filter";
import NewMaterial from "./components/new-material";
import NewMaterialType from "./components/new-material-type";

export default function Facilities() {
  const [isNewMaterialOpen, setIsNewMaterialOpen] = useState(false);
  const [isNewMaterialTypeOpen, setIsNewMaterialTypeOpen] = useState(false);
  const [btnprimary1, setBtnprimary1] = useState(false);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.Materials.RawMaterial
  );
  const MaterialModel = {
    locationType: 'work',
    name: 'Availity',
    checkItOut: true,
  };
  let filterModel = {
    MaterialName:'',
    MaterialType:'',
    MinTotalCost:'',
    MaxTotalCost:'',
    MinAvgCost:'',
    MaxAvgCost:'',
    MinUsed:'',
    MaxUsed:'',
    MinWaste:'',
    MaxWaste:'',
    hideItemsWithNoQuantity:true
  };
  const TypeOption = useCallback(()=>{
      return map(get(data,'types'), (dataType)=>{
        return <option value={dataType}>{dataType}</option>
      })
  },[get(data,'types')])

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Raw Materials", [
        { title: "Materials", link: "/materials" },
        { title: "Raw Materials", link: "#" },
      ])
    );
    // dispatch(getEquipments());
  }, []);
  // somthing wrong first time
  if (error) {
    return <div>Error</div>;
  }
  // unconditional error occur
  if (!data) {
    return null;
  }
  const filterSubmit = (e) =>{
    console.log(filterModel);
  }
  const newMaterialOpen = () =>{
    setIsNewMaterialOpen(true)
  }
  const newMaterialClose = () =>{
    setIsNewMaterialOpen(false)
  }
  const newMaterialSubmit = (e) =>{
    console.log(e);
  }
  const newMaterialTypeOpen = () =>{
    setIsNewMaterialTypeOpen(true)
  }
  const newMaterialTypeClose = () =>{
    setIsNewMaterialTypeOpen(false)
  }
  const newMaterialTypeSubmit = (e) =>{
    console.log(e);
  }

  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <Dropdown
            isOpen={btnprimary1}
            toggle={() => setBtnprimary1(!btnprimary1)}
            className="float-right mb-2"
          >
            <DropdownToggle tag="button" className="btn btn-primary">
              Material<i className="mdi mdi-chevron-down"></i>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="#" onClick={newMaterialOpen}>
                New Material
              </DropdownItem>
              <DropdownItem href="#" onClick={newMaterialTypeOpen}>
                Record Waste
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col xs="3">
          <Card>
            <CardBody>
              <RawFilter submitFn={filterSubmit} model={filterModel} optionsList={TypeOption()} />
            </CardBody>
          </Card>
        </Col>
        <Col xs="9">
          <Card>
            <CardBody>
              <RawMaterials data={data}  />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isNewMaterialOpen && (
        <Modalcall
          show={isNewMaterialOpen}
          handlerClose={newMaterialClose}
          title="New Material"
        >
          <NewMaterial submitFn={newMaterialSubmit} close={newMaterialClose} model={MaterialModel} optionsList={TypeOption()} />
        </Modalcall>
      )}
      {!!isNewMaterialTypeOpen && (
        <Modalcall
          show={isNewMaterialTypeOpen}
          handlerClose={newMaterialTypeClose}
          title="New Material Type"
        >
          <NewMaterialType submitFn={newMaterialTypeSubmit} close={newMaterialTypeClose} model={MaterialModel}  />
        </Modalcall>
      )}
    </Fragment>
  );
}
