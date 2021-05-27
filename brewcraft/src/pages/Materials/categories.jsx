import React, { useEffect, Fragment, useState, useCallback } from "react";
import { map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCategories,
  saveCategory,
  setBreadcrumbItems,
  fetchMaterialCategoryById,
  deleteMaterialCategory,
  editMaterialCategory,
} from "../../store/actions";
import { Row, Col, Card, CardBody, Button } from "reactstrap";
import { Modal } from "../../component/Common/Modal";
import CategoriesTable from "./components/categories-table";
import MaterialCategoryDialog from "./components/material-category-dialog";
import { ToastContainer } from "react-toastify";
import Loading from "../../component/Common/Loading";
export default function Facilities() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.Materials.AllCategories
  );
  const MaterialModel = {
    locationType: "work",
    name: "Availity",
    checkItOut: true,
  };

  useEffect(() => {
    dispatch(
      setBreadcrumbItems("Categories", [
        { title: "Main", link: "#" },
        { title: "Raw Materials", link: "#" },
      ])
    );
    dispatch(fetchAllCategories());
  }, []);

  const TypeOption = useCallback(() => {
    return data.length
      ? map(
          data.filter((a) => a.parentCategoryId === null),
          (dataType) => {
            return (
              <option value={dataType.id} key={dataType.id}>
                {dataType.name}
              </option>
            );
          }
        )
      : [];
  }, [data]);
  if (error) {
    return <div>Error</div>;
  }

  if(loading){
    return <Loading />
  }
  if (!data.length) {
    return null;
  }

  const newMaterialCategoryOpen = () => {
    setIsOpen(true);
  };
  const newMaterialCategoryClose = () => {
    setIsOpen(false);
  };
  const newMaterialCategorySubmit = (e, values) => {
    const { categoryName, materialCategory } = values;

      dispatch(
        saveCategory({ name: categoryName, parentCategoryId: materialCategory })
      );
    

    newMaterialCategoryClose();
  };

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
              <CategoriesTable
                data={data}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isOpen && (
        <Modal
          show={isOpen}
          close={newMaterialCategoryClose}
          title="New Material Category"
        >
          <MaterialCategoryDialog
            submitFn={newMaterialCategorySubmit}
            close={newMaterialCategoryClose}
            model={ MaterialModel}
            optionsList={TypeOption(data)}
          />
        </Modal>
      )}
      <ToastContainer />
    </Fragment>
  );
}
