import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {  fetchMaterialCategories, saveCategory ,setBreadcrumbItems } from "../../store/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button
} from "reactstrap";
import { Modal } from "../../component/Common/Modal";
import CategoriesTable from "./components/categories-table";
import MaterialCategoryDialog from "./components/material-category-dialog";
import { ALL } from "../../helpers/constants";

export default function Facilities() {
  const [isNewMaterialCategoryOpen, setIsNewMaterialCategoryOpen] = useState(false);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.Materials.MaterialCategories
  );
  const MaterialModel = {
    locationType: 'work',
    name: 'Availity',
    checkItOut: true,
  };

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Categories", [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Materials", link: "#" },
      ])
    );
    dispatch(
      fetchMaterialCategories(ALL)
    );
  }, []);

  const TypeOption = useCallback(()=>{
    return data.length ? map(data.filter((a)=>a.parentCategoryId===null), (dataType)=>{
      return <option value={dataType.id} key={dataType.id} >{dataType.name}</option>
    }): []
},[data])
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
  const newMaterialCategorySubmit = (e,values) =>{
    const {categoryName , materialCategory} = values
    dispatch(saveCategory({name : categoryName,parentCategoryId : materialCategory}))

    newMaterialCategoryClose()
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
              <CategoriesTable data={data}   />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isNewMaterialCategoryOpen && (
        <Modal
          show={isNewMaterialCategoryOpen}
          handlerClose={newMaterialCategoryClose}
          title="New Material Category"
        >
          <MaterialCategoryDialog submitFn={newMaterialCategorySubmit} close={newMaterialCategoryClose} model={MaterialModel} optionsList={TypeOption(data)} />
        </Modal>
      )}
    </Fragment>
  );
}
