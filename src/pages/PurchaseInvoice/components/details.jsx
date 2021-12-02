import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Col,
    Row,
    FormGroup,
    Label,
    Input,
    FormFeedback
} from "reactstrap";
import {
    setPurchaseInvoiceSupplier,
    setPurchaseInvoiceInvoiceDate,
    setPurchaseInvoiceInvoiceNumber,
    setPurchaseInvoiceDueDate,
    setPurchaseInvoicePurchaseOrder
} from "../../../store/actions";

export default function PurchaseInvoiceDetails({ editable }) {

    const dispatch = useDispatch();

    const {
        data: invoice,
        invalidSupplier,
        invalidGeneratedOn,
        invalidInvoiceNumber,
        invalidPaymentDueDate,
        invalidPurchaseOrder
    } = useSelector(state => {
        return state.PurchaseInvoice;
    });

    const suppliers = useSelector(state => {
        return state.Suppliers.all;
    });

    return (
        <React.Fragment>
            <Row className="mb-2">
            <Col sm="4">
                    <Label
                        for="invoiceDetailsPoSo"
                        style={{width: "6rem"}}
                        className="col-form-label float-left"
                    >
                        P.O./S.O.
                    </Label>
                    <FormGroup
                        className="float-left"
                        style={{
                            width: "100%",
                            maxWidth: "16rem"
                        }}
                    >
                        <Input
                            type="text"
                            name="invoiceDetailsPoSo"
                            className="mb-2"
                            value={invoice.purchaseOrder.orderNumber || ""}
                            onChange={e => {
                                dispatch(setPurchaseInvoicePurchaseOrder(e.target.value));
                            }}
                            hidden={!editable}
                            invalid={invalidPurchaseOrder}
                        />
                        <div
                            className="float-left"
                            style={{ lineHeight: "2rem", verticalAlign: "middle" }}
                            width="100%"
                            hidden={editable}>
                            {invoice.purchaseOrder.orderNumber || "-"}
                        </div>
                        <FormFeedback>Invalid purchase invoice field</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm="4">
                    <Label
                        for="invoiceDetailsInvoiceDate"
                        style={{width: "6rem"}}
                        className="col-form-label float-left"
                    >
                        * Invoice Date
                    </Label>
                    <FormGroup
                        className="float-left"
                        style={{
                            width: "100%",
                            maxWidth: "16rem"
                        }}
                    >
                        <Input
                            type="date"
                            name="invoiceDetailsInvoiceDate"
                            placeholder="Enter Date"
                            className="mb-2"
                            value={invoice.generatedOn}
                            onChange={e => {
                                dispatch(setPurchaseInvoiceInvoiceDate(e.target.value));
                            }}
                            hidden={!editable}
                            invalid={invalidGeneratedOn}
                        />
                        <div
                            className="float-left"
                            style={{ lineHeight: "2rem", verticalAlign: "middle" }}
                            width="100%"
                            hidden={editable}>
                            {invoice.generatedOn || "-"}
                        </div>
                        <FormFeedback>{
                            !invoice.generatedOn
                                ? "Invoice date must not be empty"
                                : "Invalid purchase invoice field"
                        }
                        </FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm="4">
                    <Label
                        for="invoiceDetailsInvoiceNumber"
                        style={{width: "6rem"}}
                        className="col-form-label float-left"
                    >
                        * Invoice #
                    </Label>
                    <FormGroup
                        className="float-left"
                        style={{
                            width: "100%",
                            maxWidth: "16rem"
                        }}
                    >
                        <Input
                            type="text"
                            name="invoiceDetailsInvoiceNumber"
                            required={true}
                            className="mb-2"
                            value={invoice.invoiceNumber}
                            onChange={e => {
                                dispatch(setPurchaseInvoiceInvoiceNumber(e.target.value));
                            }}
                            hidden={!editable}
                            invalid={invalidInvoiceNumber}
                        />
                        <div
                            className="float-left"
                            style={{ lineHeight: "2rem", verticalAlign: "middle" }}
                            width="100%"
                            hidden={editable}>
                            {invoice.invoiceNumber || "-"}
                        </div>
                        <FormFeedback>{
                            !invoice.invoiceNumber.length
                                ? "Invoice number must not be empty"
                                : "Invalid purchase invoice field"
                        }
                        </FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row className="mb-4">
            <Col sm="4">
                    <Label
                        for="invoiceDetailsSupplier"
                        style={{
                            width: "6rem"
                        }}
                        className="col-form-label float-left"
                    >
                        * Supplier
                    </Label>
                    <FormGroup
                        className="float-left"
                        style={{
                            width: "100%",
                            maxWidth: "16rem"
                        }}
                    >
                        <Input
                            type="select"
                            name="invoiceDetailsSupplier"
                            className="mb-2"
                            value={invoice.purchaseOrder.supplier.id || ""}
                            onChange={e => {
                                const supplier = suppliers.find(s => s.id === parseInt(e.target.value)) || "";
                                dispatch(setPurchaseInvoiceSupplier(supplier))
                            }}
                            hidden={!editable}
                            invalid={invalidSupplier}
                        >
                            <option value="">Select</option>
                            {
                                suppliers.map((value, index) => {
                                    return (
                                        <option value={value.id} key={index}>
                                            {value.name}
                                        </option>
                                    );
                                })
                            }
                        </Input>
                        <div
                            className="float-left"
                            style={{
                                lineHeight: "2rem",
                                verticalAlign: "middle"
                            }}
                            width="100%"
                            hidden={editable}>
                            {invoice.purchaseOrder.supplier.name || "-"}
                        </div>
                        <FormFeedback>{
                            !invoice.purchaseOrder.supplier.id
                                ? "Supplier is required"
                                : "Invalid purchase invoice field"
                        }
                        </FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm="4">
                    <Label
                        for="invoiceDetailsDueDate"
                        style={{width: "6rem"}}
                        className="col-form-label float-left"
                    >
                        * Due Date
                    </Label>
                    <FormGroup
                        className="float-left"
                        style={{
                            width: "100%",
                            maxWidth: "16rem"
                        }}
                    >
                        <Input
                            type="date"
                            name="invoiceDetailsDueDate"
                            placeholder="Enter Date"
                            required={true}
                            className="mb-2"
                            value={invoice.paymentDueDate}
                            onChange={e => {
                                dispatch(setPurchaseInvoiceDueDate(e.target.value));
                            }}
                            hidden={!editable}
                            invalid={invalidPaymentDueDate}
                        />
                        <div
                            className="float-left"
                            style={{ lineHeight: "2rem", verticalAlign: "middle" }}
                            width="100%"
                            hidden={editable}>
                            {invoice.paymentDueDate || "-"}
                        </div>
                        <FormFeedback>{
                            !invoice.paymentDueDate
                                ? "Due date must not be empty"
                                : "Invalid purchase invoice field"
                        }
                        </FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
        </React.Fragment>
    );
}