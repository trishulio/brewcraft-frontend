import { map } from 'lodash';
import React,{Fragment} from 'react';
import { Col, Row,ListGroupItem, ListGroup } from 'reactstrap';
import {Notzero, formatCurrency,formatPercent} from '../../../helpers/textUtils';
import Item from './item'
const fonSizeicon = {
    fontSize: "1rem",
  };
export default function Itemsection({item}){
   
  const addrow = () =>{

  }
 
  const sum =1;
    return <Fragment>
        <ListGroup>
        <ListGroupItem>
          <Row>
            <Col xs="2">Item</Col>
            <Col xs="2">Expense Category</Col>
            <Col xs="2">Description</Col>
            <Col xs="1">Qty</Col>
            <Col xs="1">Price</Col>
            <Col xs="1">Tax</Col>
            <Col xs="3">Amount</Col>
          </Row>
        </ListGroupItem>
        {
            map(item, (val, index)=><Item key={index} value={val} />)
        }
        <ListGroupItem>
          <Row>
            <Col xs="9">
              <span>
                <i
                  className="mdi mdi-plus-box-multiple-outline pointer iconhover"
                  style={fonSizeicon}
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
}