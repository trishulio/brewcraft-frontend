import React from "react";
import { Card, CardBody, Col, Row, Button } from "reactstrap";
import Vendorsection from "./vendorsection";
import Itemsection from "./itemsection";
import { omit, get } from "lodash";
import { useHistory} from 'react-router-dom';
export default function InvoiceForm({ detail, removebill, type }) {
  const history = useHistory();
  const gobackup = () =>{
   history.goBack();
  }
  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <Row>
              <Col>
                <h5>{type == "edit" ? "Edit" : "Create"} bill</h5>
              </Col>
              <Col>
                {type == "edit" && (
                  <span className="float-right mt-3">
                    <i
                      className="mdi mdi-delete-forever pointer iconhover iconfont"
                      title="delete bill"
                      onClick={removebill}
                    ></i>
                  </span>
                )}
              </Col>
            </Row>
            <div className="mt-5">
              <Vendorsection vendor={omit(detail, "item_list")} />
              <Itemsection item={get(detail, "item_list")} />
              <div className="mt-2">
                <Button
                  type="submit"
                  color="primary"
                  className="waves-effect waves-light mr-1"
                >
                  {detail ? "Update" : "Submit"}
                </Button>
                <Button type="reset" color="secondary" className="waves-effect" onClick={gobackup}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
