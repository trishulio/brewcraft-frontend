import React, { Fragment } from "react";
import { ListGroupItem, Row, Col, ListGroup, Input, Button } from "reactstrap";
import {
    sortableContainer,
    sortableElement,
    sortableHandle,
} from "react-sortable-hoc";
import { get } from "lodash";
import { sumBy } from "lodash";
import { ItemSelect } from "../../component/Invoice/item-select";
import {
    formatPercent,
    formatCurrency,
    Notzero,
} from "../../helpers/textUtils";
// dragable Icon
const DragHandle = sortableHandle(() => (
    <Fragment>
        <i className="mdi mdi-drag-variant DragHandler iconhover"></i>
    </Fragment>
));

// may be can change with css class
const fonSizeicon = {
    fontSize: "1rem",
};
// drag row
const DragableItem = sortableElement(
    ({
        item: argumentItme,
        quanityhandler,
        rowid,
        removerow,
        selecthandler,
        selectoption,
        taxoption,
        taxHandler,
    }) => {
        const { item, description, quantity, price, tax, taxpercentage } =
            argumentItme;
        const handerlLocal = (e) =>
            quanityhandler(
                rowid,
                get(e, "target.value"),
                get(e, "target.name")
            );
        const selectLocal = (e) => selecthandler(rowid, get(e, "target.value"));
        const taxLocal = (e) => taxHandler(rowid, get(e, "target.value"));
        const removerowLocal = () => removerow(rowid);

        return (
            <ListGroupItem>
                <Row>
                    <Col xs="8">
                        <Row>
                            <Col xs="1">
                                <DragHandle />
                            </Col>
                            <Col xs="4">
                                <ItemSelect
                                    changefn={selectLocal}
                                    value={item}
                                    name="item"
                                >
                                    {selectoption}
                                </ItemSelect>
                            </Col>
                            <Col>
                                <Input
                                    type="textarea"
                                    name="description"
                                    value={description}
                                    onChange={handerlLocal}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="2" className="text-center">
                        <Row>
                            <Col>
                                <Input
                                    type="number"
                                    value={quantity}
                                    onChange={handerlLocal}
                                    name="quantity"
                                />
                            </Col>
                            <Col>
                                <Input type="text" value={price} readOnly />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col xs="3">Tax:</Col>
                            <Col>
                                <ItemSelect
                                    changefn={taxLocal}
                                    value={tax}
                                    name="tax"
                                >
                                    {taxoption}
                                </ItemSelect>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="2" className="text-center">
                        <Row>
                            <Col>
                                <Notzero value={quantity * price}>
                                    {formatCurrency(quantity * price)}
                                </Notzero>
                                <span className="float-right mt-3">
                                    <Notzero value={rowid}>
                                        <i
                                            className="mdi mdi-minus-box-multiple-outline pointer iconhover"
                                            style={fonSizeicon}
                                            onClick={removerowLocal}
                                        />
                                    </Notzero>
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Notzero value={taxpercentage}>
                                    {formatPercent(taxpercentage)}
                                </Notzero>
                                <br />
                                <span>
                                    <Notzero value={quantity * price}>
                                        <strong>Total: </strong>
                                        {formatCurrency(
                                            (quantity * price * taxpercentage) /
                                                100 +
                                                quantity * price
                                        )}
                                    </Notzero>
                                </span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }
);
// table
const DragableTable = sortableContainer(({ children, calculation, addrow }) => {
    // sum of all total cart
    const sum = sumBy(
        calculation,
        (o) =>
            (o.quantity * o.price * o.taxpercentage) / 100 +
            o.quantity * o.price
    );

    return (
        <Fragment>
            <ListGroup>
                <ListGroupItem>
                    <Row>
                        <Col xs="8">
                            <Row>
                                <Col xs="1"></Col>
                                <Col xs="8">Item</Col>
                            </Row>
                        </Col>
                        <Col xs="1" className="text-center">
                            Quantity
                        </Col>
                        <Col xs="1" className="text-center">
                            Price
                        </Col>
                        <Col xs="2" className="text-center">
                            Amount
                        </Col>
                    </Row>
                </ListGroupItem>
                {children}
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
                                <Notzero value={sum}>
                                    {formatCurrency(sum)}
                                </Notzero>
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
                                <Notzero value={sum}>
                                    {formatCurrency(sum)}
                                </Notzero>
                            </strong>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        </Fragment>
    );
});

export { DragableTable, DragableItem };
