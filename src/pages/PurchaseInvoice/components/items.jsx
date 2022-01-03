import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, ListGroupItem, ListGroup } from "reactstrap";
import { isFloat } from "../../../helpers/textUtils";
import Item from "./item";
import { setPurchaseInvoiceItems } from "../../../store/actions";

export default function PurchaseInvoiceItems({ editable }) {
    const [subtotal, setSubtotal] = useState(0.0);
    const [taxTotal, setTaxTotal] = useState(0.0);
    const [total, setTotal] = useState(0.0);

    const dispatch = useDispatch();

    const { procurementItems: items } = useSelector((state) => {
        return state.Procurement.data;
    });

    useEffect(() => {
        let amountSubtotal = 0.0,
            amountTax = 0.0,
            amountTotal = 0.0;
        items.forEach(({ invoiceItem }) => {
            if (invoiceItem.quantity.value && invoiceItem.price.amount) {
                const amountItemSubtotalItem =
                    parseFloat(invoiceItem.quantity.value) *
                    parseFloat(invoiceItem.price.amount);
                if (
                    Number.isInteger(amountItemSubtotalItem) ||
                    isFloat(amountItemSubtotalItem)
                ) {
                    amountSubtotal += amountItemSubtotalItem;
                    amountTotal += amountItemSubtotalItem;
                    if (invoiceItem.tax.amount.amount) {
                        const amountItemTax =
                            amountItemSubtotalItem *
                            parseFloat(invoiceItem.tax.amount.amount);
                        if (
                            Number.isInteger(amountItemTax) ||
                            isFloat(amountItemTax)
                        ) {
                            amountTax += amountItemTax;
                            amountTotal += amountItemTax;
                        }
                    }
                }
            }
        });
        setSubtotal(amountSubtotal);
        setTaxTotal(amountTax);
        setTotal(amountTotal);
    }, [items, items.length]);

    function addItem() {
        const newItems = [...items];
        newItems.push({
            invoiceItem: {
                description: "",
                quantity: {
                    value: "",
                },
                price: {
                    amount: "",
                },
                tax: {
                    amount: {
                        amount: "",
                    },
                },
                material: "",
            },
            materialLot: {},
        });
        dispatch(setPurchaseInvoiceItems(newItems));
    }

    return (
        <React.Fragment>
            <ListGroup>
                <ListGroupItem>
                    <Row>
                        <Col xs="3">Item</Col>
                        <Col xs="3">Description</Col>
                        <Col xs="1">Lot</Col>
                        <Col xs="1">Qty</Col>
                        <Col xs="1">Price</Col>
                        <Col xs="1">Tax</Col>
                        <Col xs="2">Amount</Col>
                    </Row>
                </ListGroupItem>
                {items.map((value, index) => (
                    <Item key={index} indexv={index} editable={editable} />
                ))}
                <ListGroupItem>
                    <Row>
                        <Col xs="8">
                            <span hidden={!editable}>
                                <i
                                    className="mdi mdi-plus-box-multiple-outline mr-2 pointer iconhover iconfont"
                                    title="add item"
                                    onClick={addItem}
                                ></i>
                                Add an item
                            </span>
                        </Col>
                        <Col xs="2" className="text-right">
                            <strong>Subtotal</strong>
                        </Col>
                        <Col xs="2" className="text-center">
                            <strong>{subtotal.toFixed(2)}</strong>
                        </Col>
                        <Col xs="8"></Col>
                        <Col xs="2" className="text-right">
                            <strong>Tax</strong>
                        </Col>
                        <Col xs="2" className="text-center">
                            <strong>{taxTotal.toFixed(2)}</strong>
                        </Col>
                    </Row>
                </ListGroupItem>
                <ListGroupItem>
                    <Row>
                        <Col xs="9"></Col>
                        <Col xs="1" className="text-right">
                            <strong>Total</strong>
                        </Col>
                        <Col xs="2" className="text-center">
                            <strong>$ {total.toFixed(2)}</strong>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </React.Fragment>
    );
}
