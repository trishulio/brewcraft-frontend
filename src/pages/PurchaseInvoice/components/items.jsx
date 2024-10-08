import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, ListGroupItem, ListGroup } from "reactstrap";
import { formatCurrency, isFloat } from "../../../helpers/textUtils";
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
                const pstRate =
                    parseFloat(invoiceItem.tax.pstRate.value / 100) || 0;
                const gstRate =
                    parseFloat(invoiceItem.tax.gstRate.value / 100) || 0;
                const hstRate =
                    parseFloat(invoiceItem.tax.hstRate.value / 100) || 0;
                const taxRate = pstRate + gstRate + hstRate;
                const amountItemSubtotalItem =
                    parseFloat(invoiceItem.quantity.value) *
                    parseFloat(invoiceItem.price.amount);
                if (
                    Number.isInteger(amountItemSubtotalItem) ||
                    isFloat(amountItemSubtotalItem)
                ) {
                    amountSubtotal += amountItemSubtotalItem;
                    amountTotal += amountItemSubtotalItem;
                    if (
                        invoiceItem.tax.pstRate.value ||
                        invoiceItem.tax.gstRate.value ||
                        invoiceItem.tax.hstRate.value
                    ) {
                        const amountItemTax = amountItemSubtotalItem * taxRate;
                        if (
                            Number.isInteger(amountItemTax) ||
                            isFloat(amountItemTax)
                        ) {
                            amountTax += amountItemTax;
                            amountTotal += amountItemTax;
                            invoiceItem.taxAmount = amountItemTax;
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
                    pstRate: {
                        value: "",
                    },
                    gstRate: {
                        value: "",
                    },
                    hstRate: {
                        value: "",
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
                        <Col xs="2">Description</Col>
                        <Col xs="1">Lot</Col>
                        <Col xs="1">Qty</Col>
                        <Col xs="1">Unit</Col>
                        <Col xs="1">Price</Col>
                        <Col xs="1">PST (%)</Col>
                        <Col xs="1">GST (%)</Col>
                        <Col xs="1">HST (%)</Col>
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
                            <strong>{formatCurrency(subtotal)}</strong>
                        </Col>
                        <Col xs="8"></Col>
                        <Col xs="2" className="text-right">
                            <strong>Tax</strong>
                        </Col>
                        <Col xs="2" className="text-center">
                            <strong>{formatCurrency(taxTotal)}</strong>
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
                            <strong>{formatCurrency(total)}</strong>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </React.Fragment>
    );
}
