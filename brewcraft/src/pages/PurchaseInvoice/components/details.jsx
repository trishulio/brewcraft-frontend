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
    setPurchaseInvoicePurchaseOrder,
    setInvalidInvoiceSupplier,
    setInvalidInvoiceDate,
    setInvalidInvoiceNumber,
    setInvalidDueDate,
    setInvalidPurchaseOrder
} from "../../../store/actions";

export default function PurchaseInvoiceDetails({ editable }) {

    const dispatch = useDispatch();

    const invoice = useSelector(state => {
        return state.PurchaseInvoice.data;
    });

    const suppliers = useSelector(state => {
        return state.Suppliers.all;
    });

    function onFormInputChange(e) {
        switch(e.target.name) {
            case "invoiceDetailsSupplier":
                dispatch(setInvalidInvoiceSupplier(!e.target.value));
                dispatch(
                    setPurchaseInvoiceSupplier(suppliers.find(s => s.id === parseInt(e.target.value)) || "")
                );
                break;
            case "invoiceDetailsInvoiceDate":
                dispatch(setInvalidInvoiceDate(false));
                dispatch(setPurchaseInvoiceInvoiceDate(e.target.value));
                break;
            case "invoiceDetailsInvoiceNumber":
                dispatch(setInvalidInvoiceNumber(!e.target.value));
                dispatch(setPurchaseInvoiceInvoiceNumber(e.target.value));
                break;
            case "invoiceDetailsDueDate":
                dispatch(setInvalidDueDate(false));
                dispatch(setPurchaseInvoiceDueDate(e.target.value));
                break;
            case "invoiceDetailsPoSo":
                dispatch(setInvalidPurchaseOrder(false));
                dispatch(setPurchaseInvoicePurchaseOrder(e.target.value));
                break;
            default:
                break;
        }
    }

    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col sm="4">
                    <FormGroup>
                        <Label
                            for="invoiceDetailsSupplier"
                            style={{width: "6rem"}}
                            className="col-form-label float-left"
                        >
                            Supplier
                        </Label>
                        <Input
                            type="select"
                            name="invoiceDetailsSupplier"
                            className="mb-2 float-left"
                            style={{maxWidth: "16rem"}}
                            value={invoice.purchaseOrder.supplier.id || ""}
                            onChange={onFormInputChange}
                            hidden={!editable}
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
                            style={{ lineHeight: "2rem", verticalAlign: "middle" }}
                            width="100%"
                            hidden={editable}>
                            {invoice.purchaseOrder.supplier ? invoice.purchaseOrder.supplier.name : "-"}
                        </div>
                        <FormFeedback>Enter a valid supplier.</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm="4">
                    <FormGroup>
                        <Label
                            for="invoiceDetailsInvoiceDate"
                            style={{width: "6rem"}}
                            className="col-form-label float-left"
                        >
                            Invoice Date
                        </Label>
                        <Input
                            type="date"
                            name="invoiceDetailsInvoiceDate"
                            placeholder="Enter Date"
                            className="mb-2 float-left"
                            style={{maxWidth: "16rem"}}
                            value={invoice.generatedOn}
                            onChange={onFormInputChange}
                            hidden={!editable}
                        />
                        <div
                            className="float-left"
                            style={{ lineHeight: "2rem", verticalAlign: "middle" }}
                            width="100%"
                            hidden={editable}>
                            {invoice.generatedOn || "-"}
                        </div>
                        <FormFeedback>Enter a valid date.</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm="4">
                    <FormGroup>
                        <Label
                            for="invoiceDetailsInvoiceNumber"
                            style={{width: "6rem"}}
                            className="col-form-label float-left"
                        >
                            Invoice #
                        </Label>
                        <Input
                            type="text"
                            name="invoiceDetailsInvoiceNumber"
                            required={true}
                            className="mb-2 float-left"
                            style={{maxWidth: "16rem"}}
                            value={invoice.invoiceNumber}
                            onChange={onFormInputChange}
                            hidden={!editable}
                        />
                        <div
                            className="float-left"
                            style={{ lineHeight: "2rem", verticalAlign: "middle" }}
                            width="100%"
                            hidden={editable}>
                            {invoice.invoiceNumber || "-"}
                        </div>
                        <FormFeedback>Enter a valid invoice number.</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col sm={{ offset: 4, size: 4}}>
                    <FormGroup>
                        <Label
                            for="invoiceDetailsDueDate"
                            style={{width: "6rem"}}
                            className="col-form-label float-left"
                        >
                            Due Date
                        </Label>
                        <Input
                            type="date"
                            name="invoiceDetailsDueDate"
                            placeholder="Enter Date"
                            required={true}
                            className="mb-2 float-left"
                            style={{maxWidth: "16rem"}}
                            value={invoice.paymentDueDate}
                            onChange={onFormInputChange}
                            hidden={!editable}
                        />
                        <div
                            className="float-left"
                            style={{ lineHeight: "2rem", verticalAlign: "middle" }}
                            width="100%"
                            hidden={editable}>
                            {invoice.paymentDueDate || "-"}
                        </div>
                        <FormFeedback>Enter a valid date.</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm="4">
                    <FormGroup>
                        <Label
                            for="invoiceDetailsPoSo"
                            style={{width: "6rem"}}
                            className="col-form-label float-left"
                        >
                            P.O./S.O.
                        </Label>
                        <Input
                            type="text"
                            name="invoiceDetailsPoSo"
                            className="mb-2 float-left"
                            style={{maxWidth: "16rem"}}
                            value={invoice.purchaseOrder.orderNumber || ""}
                            onChange={onFormInputChange}
                            hidden={!editable}
                        />
                        <div
                            className="float-left"
                            style={{ lineHeight: "2rem", verticalAlign: "middle" }}
                            width="100%"
                            hidden={editable}>
                            {invoice.purchaseOrder.orderNumber || "-"}
                        </div>
                        <FormFeedback>Enter a valid order number.</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
        </React.Fragment>
    );
}