import { attempt, get, map, sumBy } from "lodash";
import React, { Fragment, useContext } from "react";
import { Col, Row, ListGroupItem, ListGroup } from "reactstrap";
import {
  Notzero,
  formatCurrency,
  formatPercent,
} from "../../../helpers/textUtils";
import ItemExpenseContext from "./item-expense-context";
import Item from "./item";

/**
 * @param {Object} item
 * @description Po Form
 * @author Anuj Gupta
 *
 */
export default function Itemsection({ item }) {
  const select = useContext(ItemExpenseContext);

  /**
   *
   * Add click FN
   *
   */
  const addrow = () => attempt(get(select, "add"));

  /**
   * Sum of amount
   */
  const sum = sumBy(
    item,
    (o) => (o.qty * o.price * o.tax) / 100 + o.qty * o.price
  );

  return (
    <Fragment>
      <ListGroup>
        <ListGroupItem>
          <Row>
            <Col xs="3">Item</Col>
            <Col xs="3">Description</Col>
            <Col xs="1">Qty</Col>
            <Col xs="1">Price</Col>
            <Col xs="1">Tax</Col>
            <Col xs="3">Amount</Col>
          </Row>
        </ListGroupItem>
        {map(item, (val, index) => (
          <Item key={index} value={val} indexv={index} />
        ))}
        <ListGroupItem>
          <Row>
            <Col xs="9">
              <span>
                <i
                  className="mdi mdi-plus-box-multiple-outline pointer iconhover iconfont"
                  title="add item"
                  onClick={addrow}
                ></i>
                Add an item
              </span>
            </Col>
            <Col xs="1" className="text-center">
              <strong>Subtotal</strong>
            </Col>
            <Col xs="2" className="text-center">
              <strong>
                <Notzero value={sum}>{formatCurrency(sum)}</Notzero>
              </strong>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <Col xs="9"></Col>
            <Col xs="1" className="text-center">
              <strong>Total</strong>
            </Col>
            <Col xs="2" className="text-center">
              <strong>
                <Notzero value={sum}>{formatCurrency(sum)}</Notzero>
              </strong>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Fragment>
  );
}
