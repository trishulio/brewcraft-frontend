import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { filter, map } from "lodash";
import {
    Button,
    Input
} from "reactstrap";
import {
    setPurchaseInvoicesSelectedClass,
    setPurchaseInvoicesSelectedType,
} from "../../../store/actions";
import Toolbar from "../../../component/Common/toolbar";

export default function PurchaseInvoicesToolbar() {

    const dispatch = useDispatch();
    const history = useHistory();

    const { selectedClass, selectedType } = useSelector(state => {
        return state.PurchaseInvoices;
    });

    const allCategories = useSelector(state => {
        return state.PurchaseInvoices.data;
    });

    return (
        <Toolbar>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push({
                        pathname: "/purchases/invoices/new",
                        search: "?edit=true"
                    });
                }}
            >
                    New Invoice
            </Button>
            <Button
                type="button"
                color="secondary"
                size="sm"
                className="waves-effect mr-2 mb-3"
                onClick={() => {
                    history.push("/products");
                }}
            >
                    Suppliers
            </Button>
            {/* <Input
                type="select"
                size="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
                value={selectedStyle ? selectedStyle.id : ""}
                onChange={e => {
                    if (e.target.value) {
                        const category = allCategories.find(c => c.id === parseInt(e.target.value));
                        dispatch(setPurchaseInvoicesSelectedStyle(category));
                    } else {
                        dispatch(setPurchaseInvoicesSelectedStyle(""));
                    }
                }}
                disabled={!selectedType}
            >
                <option value="">Style</option>
                {
                    selectedType &&
                    map(filter(allCategories, c => c.parentCategoryId === selectedType.id), (value, index) => (
                        <option value={value.id} key={index}>
                            {value.name}
                        </option>
                    ))
                }
            </Input> */}
            <Input
                type="select"
                size="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
                // value="unpaid"
            >
                <option value="unpaid">Unpaid</option>
                <option value="unpaid">Paid</option>
                <option value="unpaid">All</option>
            </Input>
            <Input
                type="select"
                size="sm"
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 100 }}
                value=""
            >
                <option value="">Supplier</option>
            </Input>
            <Input
                size="sm"
                type="search"
                name="purchaseInvoicesToDate"
                id="purchaseInvoicesToDate"
                placeholder="Date to .."
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 170 }}
            />
            <Input
                size="sm"
                type="search"
                name="purchaseInvoicesFromDate"
                id="purchaseInvoicesFromDate"
                placeholder="Date from .."
                className="waves-effect float-right mb-3 ml-2"
                style={{ width: 170 }}
            />
        </Toolbar>
    );
}