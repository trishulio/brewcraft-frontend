import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Modal } from "../../component/Common/modal";
import MaterialsTable from "../Materials/components/materials-table";
import MaterialCategoryDialog from "../Materials/components/material-category-dialog";
import MaterialDialog from "../Materials/components/material-dialog";
import { PACKAGING } from "../../helpers/constants";
import { ToastContainer } from "react-toastify";
import Toolbar from "./components/toolbar";

export default function Packaging(props={}, { data, categories, isOpen, isNewMaterialCategoryOpen, newMaterialClose, newMaterialSubmit, newMaterialCategoryClose, newMaterialCategoryOpen, newMaterialCategorySubmit, MaterialModel, TypeOption, nullParentCategories }) {
  return (
    <React.Fragment>
      <Toolbar />
      <Row>
        <Col md="12">
          <Card>
            <CardBody>
              <MaterialsTable
                data={data}
                category={PACKAGING}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!!isOpen && (
        <Modal show={isOpen} close={newMaterialClose} title="New Packaging">
          <MaterialDialog
            to={props.match.url}
            categoryModelOpen={newMaterialCategoryOpen}
            submitFn={newMaterialSubmit}
            close={newMaterialClose}
            model={ MaterialModel}
            optionsList={TypeOption(
              categories.data.filter(
                (item) => item.parentCategoryId === PACKAGING
              )
            )}
          />
        </Modal>
      )}
      {!!isNewMaterialCategoryOpen && (
        <Modal
          show={isNewMaterialCategoryOpen}
          close={newMaterialCategoryClose}
          title="New Material Category"
        >
          <MaterialCategoryDialog
            submitFn={newMaterialCategorySubmit}
            close={newMaterialCategoryClose}
            model={MaterialModel}
            optionsList={TypeOption(nullParentCategories.data)}
          />
        </Modal>
      )}
      <ToastContainer />
    </React.Fragment>
  );
}
