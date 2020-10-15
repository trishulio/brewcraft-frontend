import { get, map, attempt } from "lodash";
import React, { Fragment, useContext } from "react";
import { Row, Col, ListGroupItem, Input } from "reactstrap";
import { ItemSelect } from "../../../component/item-select";
import { Notzero } from "../../../helpers/textUtils";
import ItemExpenseContext from "./item-expense-context";

/**
 *
 * @param {any} value
 * @description repeate row
 * @author Anuj Gupta
 *
 */

// may be can change with css class
const fonSizeicon = {
  fontSize: "1rem",
};

export default function Item({ value, indexv }) {

  const selectoption = useContext(ItemExpenseContext);
  /**
   *
   * @description rececing props from context
   *
   */

  let renderSelect = (data, key) => {
    return map(get(data, key), (val, index) => {
      return (
        <option value={get(val, "id")} key={index}>
          {get(val, "label")}
        </option>
      );
    });
  };

  /**
   *
   * @description change event function push to root component
   *
   */

  const changeevent = (e) =>
    attempt(get(selectoption, "inpuval"), {
      index: indexv,
      key: get(e, "target.name"),
      value: get(e, "target.value"),
    });
  /**
   * @description row delete with index
   */

  const removerowLocal = () => attempt(get(selectoption, "del"), indexv);

  return (
    <Fragment>
      <ListGroupItem>
        <Row>
          <Col xs="2">
            <ItemSelect
              type="select"
              name="item"
              required
              value={get(value, "item")}
              changefn={changeevent}
            >
              <option>Select</option>
              {renderSelect(selectoption, "purchase")}
            </ItemSelect>
          </Col>
          <Col xs="2">
            <ItemSelect
              type="select"
              name="expence_cat"
              required
              value={get(value, "expence_cat")}
              changefn={changeevent}
            >
              <option>Select</option>
              {renderSelect(selectoption, "dxpenseCategory")}
            </ItemSelect>
          </Col>
          <Col xs="2">
            <Input
              type="textarea"
              name="description"
              value={get(value, "description")}
              onChange={changeevent}
            />
          </Col>
          <Col xs="1">
            <Input
              type="number"
              name="qty"
              required
              value={get(value, "qty")}
              onChange={changeevent}
            />
          </Col>
          <Col xs="1">
            <Input
              type="number"
              name="price"
              required
              value={get(value, "price")}
              onChange={changeevent}
            />
          </Col>
          <Col xs="1">
            <Input
              type="number"
              name="tax"
              required
              value={get(value, "qty")}
              onChange={changeevent}
            />
          </Col>
          <Col xs="3">
            {get(value, "price") + get(value, "qty")}
            <Notzero value={indexv}>
              <span className="float-right mt-3">
                <i
                  className="mdi mdi-minus-box-multiple-outline pointer iconhover"
                  style={fonSizeicon}
                  onClick={removerowLocal}
                ></i>
              </span>
            </Notzero>
          </Col>
        </Row>
      </ListGroupItem>
    </Fragment>
  );
}
