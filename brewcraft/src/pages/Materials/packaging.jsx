import React, { useEffect, Fragment, useState, useCallback } from "react";
import { get, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { savePackagingMaterial, fetchPackagingMaterial, fetchMaterialCategories, setBreadcrumbItems, fetchCategories,saveCategory } from "../../store/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button
} from "reactstrap";
import { Modal } from "../../component/Common/Modal";
import MaterialsTable from "./components/materials-table";
import MaterialCategoryDialog from "./components/material-category-dialog";
import MaterialDialog from "./components/material-dialog";
import { PACKAGING } from "../../helpers/constants";
import { ToastContainer } from 'react-toastify';
export default function Facilities(props) {

  const [isNewMaterialCategoryOpen, setIsNewMaterialCategoryOpen] = useState(false);
  const [isNewMaterialOpen, setIsNewMaterialOpen] = useState(false);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.Materials.PackagingMaterial
  );
  const categories = useSelector(
    (state) => {
      return state.Materials.MaterialCategories
    }
  );
  const nullParentCategories = useSelector(
    (state) => {
      return state.Materials.Categories
    }
  );
  const MaterialModel = {
    locationType: 'work',
    name: 'Availity',
    checkItOut: true,
  };
  const TypeOption = useCallback((categories) => {
    return categories.length ? map(categories.sort((a, b) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    }), (dataType) => {
      return <option value={dataType.id} key={dataType.id} >{dataType.name}</option>
    }) : []
  }, [categories])
  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Packaging", [
        { title: "Dashboard", link: "/dashboard" },
        { title: "Materials", link: "#" },
      ])
    );
    dispatch(
      fetchPackagingMaterial()
    );
    dispatch(
      fetchMaterialCategories(PACKAGING)
    );
    dispatch(
      fetchCategories()
    );
  }, []);

  if (error) {
    return <div>Error</div>;
  }

  if (!data) {
    return null;
  }
  if (categories.loading) { return null; }

  const newMaterialOpen = () => {
    setIsNewMaterialOpen(true)
  }

  const newMaterialClose = () => {
    setIsNewMaterialOpen(false)
  }
  const newMaterialCategoryOpen = () =>{
    setIsNewMaterialCategoryOpen(true)
  }
  const newMaterialCategoryClose = () =>{
    setIsNewMaterialCategoryOpen(false)
  }
  const newMaterialSubmit = (e, values) => {
    const {
      materialName,
      materialCategoryId,
      materialBaseQuantityUnit,
      materialDescription
    } = values
    dispatch(savePackagingMaterial({
      name: materialName,
      categoryId: materialCategoryId,
      baseQuantityUnit: materialBaseQuantityUnit,
      description: materialDescription,
      upc : ""
    }))
    newMaterialClose()
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
            <Button color="link" onClick={newMaterialOpen}>
              Add Packaging
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <MaterialsTable data={data} />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isNewMaterialOpen && (
        <Modal
          show={isNewMaterialOpen}
          handlerClose={newMaterialClose}
          title="New Packaging"
        >
          <MaterialDialog to={props.match.url} categoryModelOpen={newMaterialCategoryOpen} submitFn={newMaterialSubmit} close={newMaterialClose} model={MaterialModel} optionsList={TypeOption(categories.data.filter(item=>item.parentCategoryId===PACKAGING))} />
        </Modal>
      )}
        {!!isNewMaterialCategoryOpen && (
        <Modal
          show={isNewMaterialCategoryOpen}
          handlerClose={newMaterialCategoryClose}
          title="New Material Category"
        >
          <MaterialCategoryDialog  submitFn={newMaterialCategorySubmit} close={newMaterialCategoryClose} model={MaterialModel} optionsList={TypeOption(nullParentCategories.data)} />
        </Modal>
      )}
      <ToastContainer />
    </Fragment>
  );
}
