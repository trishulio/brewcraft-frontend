import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbItems } from "../../store/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button
} from "reactstrap";
import { Modalcall } from "../../component/Common/Modalcall";
import CategoriesTable from "./components/categories-table";
import MaterialCategoryDialog from "./components/material-category-dialog";

export default function Facilities() {
  const [isNewMaterialCategoryOpen, setIsNewMaterialCategoryOpen] = useState(false);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.Materials.RawMaterial
  );
  const MaterialModel = {
    locationType: 'work',
    name: 'Availity',
    checkItOut: true,
  };
  const TypeOption = useCallback(()=>{
      return map(get(data,'types'), (dataType)=>{
        return <option value={dataType}>{dataType}</option>
      })
  },[get(data,'types')])

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Categories", [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Materials", link: "#" },
      ])
    );
  }, []);

  if (error) {
    return <div>Error</div>;
  }

  if (!data) {
    return null;
  }

  const newMaterialCategoryOpen = () =>{
    setIsNewMaterialCategoryOpen(true)
  }
  const newMaterialCategoryClose = () =>{
    setIsNewMaterialCategoryOpen(false)
  }
  const newMaterialCategorySubmit = (e) =>{
    console.log(e);
  }

  return (
    <Fragment>
      <Row>
        <Col xs="12">
          <div className="float-right mb-3">
            <Button color="link" onClick={newMaterialCategoryOpen}>
              Add Category
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <CategoriesTable data={data}  />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isNewMaterialCategoryOpen && (
        <Modalcall
          show={isNewMaterialCategoryOpen}
          handlerClose={newMaterialCategoryClose}
          title="New Material Category"
        >
          <MaterialCategoryDialog submitFn={newMaterialCategorySubmit} close={newMaterialCategoryClose} model={MaterialModel}  />
        </Modalcall>
      )}
    </Fragment>
  );
}
