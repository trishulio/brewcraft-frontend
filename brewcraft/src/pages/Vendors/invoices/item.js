import { get } from "lodash";
import React, { Fragment } from "react";
import { Row, Col, ListGroupItem } from "reactstrap";
import ItemExpenseContext from './item-expense-context';
export default function Item({value}) {
//   const ItemExpenseContext = val =>{
//       console.log(val);
//   }
console.log(ItemExpenseContext);
  return (
    <Fragment>
      <ListGroupItem>
        <Row>
          <Col xs="2">
              {get(value,'item')}
          </Col>
          <Col xs="2">{get(value,'item')}</Col>
          <Col xs="2">{get(value,'item')}</Col>
          <Col xs="1">{get(value,'item')}</Col>
          <Col xs="1">{get(value,'item')}</Col>
          <Col xs="1">{get(value,'item')}</Col>
          <Col xs="3">{get(value,'item')}</Col>
        </Row>
      </ListGroupItem>
    </Fragment>
  );
}
