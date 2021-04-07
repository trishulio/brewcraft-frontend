import React, { useEffect, Fragment, useState } from "react";
import { map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteMaterialCategory,
  editMaterialCategory,
  fetchAllCategories,
  fetchMaterialCategoryById,
} from "../../store/Materials/actions";
import { setBreadcrumbItems } from "../../store/actions";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Badge,
  Button,
  Input,
} from "reactstrap";

const units = ["hl", "l", "ml", "kg", "g"];

export default function Material({history}) {
  const [category, setCategory] = useState({});
  const [editable, setEditable] = useState(false);
  let { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.Materials.AllCategories
  );
  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(
      fetchMaterialCategoryById({
        id: id,
        success: (data) => {
          setCategory(data);
          const items = [
            { title: "Main", link: "#" },
            { title: "Raw Materials", link: "#" },
            { title: "Categories", link: "#" },
          ];
          dispatch(setBreadcrumbItems(data.name, items));
        },
      })
    );
  }, []);
  const handleChange = (e) => {
    const { value, name } = e.target;
    const catego={...category}
    catego[name]=value
    setCategory(catego);
  };
  const editCategoryAction = () => {
    dispatch(
      editMaterialCategory({
        id: category.id,
        form: {
          name: category.name,
          parentCategoryId: category.parentCategoryId,
          version : category.version+1
        },
      })
    );
    setEditable(false)
  };
  const deleteCategoryAction = () => {
    dispatch(deleteMaterialCategory({ id: category.id }));
    history.goBack()
  };
  return (
    <Fragment>
      <div className="mb-3">
        <Button
          type="button"
          color="primary"
          onClick={() => editCategoryAction()}
          className="waves-effect mr-2"
          disabled={!editable}
        >
          Save
        </Button>
        <Button
          type="button"
          color="secondary"
          className="waves-effect"
          onClick={() => setEditable(false)}
          disabled={!editable}
        >
          Cancel
        </Button>
      </div>
      <Row>
        <Col xl="9">
          <Card>
            <CardHeader>
              <h4 className="card-title mb-1">Details</h4>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="12">
                  <Row>
                    <Col xs="3">
                      <h3 className="font-size-14 mb-4">Name</h3>
                    </Col>
                    <Col xs="3">
                      {editable && (
                        <Input
                          onChange={handleChange}
                          type="text"
                          name="name"
                          defaultValue={category.name}
                        />
                      )}
                      {!editable && <span name="name">{category.name}</span>}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="3">
                      <h3 className="font-size-14 mb-4">Parent</h3>
                    </Col>
                    <Col xs="3">
                      {editable && (
                        <select onChange={handleChange}>
                          {editable &&
                            map(
                              data.filter((a) => {
                                return a.parentCategoryId === null;
                              }),
                              (value, index) => {
                                return (
                                  <option value={value.id} key={value}>
                                    {value.name}
                                  </option>
                                );
                              }
                            )}
                        </select>
                      )}
                      {!editable && (
                        <span name="name">{category.parentCategoryId}</span>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect"
                onClick={() => setEditable(true)}
                disabled={editable}
              >
                Edit
              </Button>
              <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect btn-danger"
                onClick={() => deleteCategoryAction()}
                disabled={editable}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        </Col>
        <Col md="6" xl="3">
          <Card>
            <CardHeader>
              <h4 className="card-title mb-1">Publish</h4>
            </CardHeader>
            <CardBody>
              <Row>
                <Col xs="6">
                  <h3 className="font-size-14 mb-4">Status</h3>
                </Col>
                <Col xs="6">
                  {editable && (
                    <select>
                      <option>Active</option>
                      <option>Deactive</option>
                    </select>
                  )}
                  {!editable && <Badge color="info">Active</Badge>}
                </Col>
              </Row>
              <Row>
                <Col xs="6">
                  <h3 className="font-size-14 mb-4">Created</h3>
                </Col>
                <Col xs="6">
                  <span name="name">Jan 20, 2021</span>
                </Col>
              </Row>
              <Row>
                <Col xs="6">
                  <h3 className="font-size-14 mb-4">Updated</h3>
                </Col>
                <Col xs="6">
                  <span name="name">Feb 2, 2021</span>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
}
