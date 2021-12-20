import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useQuery } from "../../../helpers/utils";
import Toolbar from "../../../component/Common/toolbar";

export default function PurchaseInvoicesToolbar() {
    const history = useHistory();
    const query = useQuery();

    const suppliers = useSelector((state) => {
        return state.Suppliers.all;
    });

    return (
        <Toolbar>
            <div className="clearfix">
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect mr-2"
                    onClick={() => {
                        history.push({
                            pathname: "/purchases/invoices/new",
                            search: "?edit=true",
                        });
                    }}
                >
                    New Invoice
                </Button>
                <Button
                    type="button"
                    color="secondary"
                    size="sm"
                    className="waves-effect mr-2"
                    outline={true}
                    onClick={() => {
                        history.push("/suppliers");
                    }}
                >
                    Suppliers
                </Button>
                <FormGroup className="waves-effect float-right mb-2">
                    <Label
                        for="purchaseInvoicesFromDate"
                        className="waves-effect float-left mt-1 mr-1"
                    >
                        Invoice from
                    </Label>
                    <Input
                        bsSize="sm"
                        type="date"
                        name="purchaseInvoicesFromDate"
                        className="waves-effect float-left"
                        style={{ width: 170 }}
                        value={query.get("invoiceFrom") || ""}
                        onChange={(e) => {
                            query.delete("invoiceFrom");
                            if (e.target.value) {
                                query.append("invoiceFrom", e.target.value);
                            }
                            history.push({ search: query.toString() });
                        }}
                    />
                    <Label
                        for="purchaseInvoicesToDate"
                        className="waves-effect float-left mt-1 mr-1 ml-2"
                    >
                        Invoice to
                    </Label>
                    <Input
                        bsSize="sm"
                        type="date"
                        name="purchaseInvoicesToDate"
                        className="waves-effect float-left"
                        style={{ width: 170 }}
                        value={query.get("invoiceTo") || ""}
                        onChange={(e) => {
                            query.delete("invoiceTo");
                            if (e.target.value) {
                                query.append("invoiceTo", e.target.value);
                            }
                            history.push({ search: query.toString() });
                        }}
                    />
                    <Button
                        type="button"
                        color="primary"
                        size="sm"
                        className="waves-effect float-left ml-2"
                        disabled={
                            !(
                                query.get("invoiceTo") ||
                                query.get("invoiceFrom")
                            )
                        }
                        onClick={() => {
                            query.delete("invoiceTo");
                            query.delete("invoiceFrom");
                            history.push({ search: query.toString() });
                        }}
                    >
                        Reset
                    </Button>
                </FormGroup>
            </div>
            <div className="clearfix">
                <Input
                    type="select"
                    bsSize="sm"
                    className="waves-effect float-right mb-3 ml-2"
                    style={{ width: 100 }}
                    value={query.get("status") || ""}
                    onChange={(e) => {
                        query.delete("status");
                        if (e.target.value) {
                            query.append("status", e.target.value);
                        }
                        history.push({ search: query.toString() });
                    }}
                >
                    <option value="">Status</option>
                    <option value="1">Unpaid</option>
                    <option value="2">Paid</option>
                </Input>
                <Input
                    type="select"
                    bsSize="sm"
                    className="waves-effect float-right mb-3 ml-2"
                    style={{ width: 100 }}
                    value={query.get("supplier") || ""}
                    onChange={(e) => {
                        query.delete("supplier");
                        if (e.target.value) {
                            query.append("supplier", e.target.value);
                        }
                        history.push({ search: query.toString() });
                    }}
                >
                    <option value="">Supplier</option>
                    {suppliers.map((value, index) => (
                        <option key={index} value={value.id}>
                            {value.name}
                        </option>
                    ))}
                </Input>
            </div>
        </Toolbar>
    );
}
