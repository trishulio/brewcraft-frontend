import React, { useEffect, useState, Fragment } from "react";
import { setBreadcrumbItems } from "../../store/actions";
import {
    Card,
    Col,
    Row as Rowtable,
    CardBody,
    Button,
    Alert,
} from "reactstrap";
import arrayMove from "array-move";
import { DragableTable, DragableItem } from "./dragable-table";
import { parseInt, map, findIndex, get, set } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { AvForm } from "availity-reactstrap-validation";
import InvoiceDate from "./invoice-date";
import { Modal } from "../../component/Common/modal";
import { ItemSelect } from "../../component/Invoice/item-select";
import { saveInvoice } from "../../store/Invoice/actions";
import { useHistory } from "react-router-dom";
const darkimg =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAAAkCAYAAABWkaL6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcyNTBGN0M2OUM4MDExRThBRkU4Q0Q3RUVDRDJDNzQ0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcyNTBGN0M3OUM4MDExRThBRkU4Q0Q3RUVDRDJDNzQ0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzI1MEY3QzQ5QzgwMTFFOEFGRThDRDdFRUNEMkM3NDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzI1MEY3QzU5QzgwMTFFOEFGRThDRDdFRUNEMkM3NDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7aXGOPAAALz0lEQVR42uxce3BU1Rn/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";

const rowSample = {
    item: "",
    description: "",
    quantity: 1,
    price: 0,
    tax: "",
    taxpercentage: 0,
};
export default function CreateInvoice(props) {
    const [stateData, setStateData] = useState([{ ...rowSample, id: 1 }]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [show, setShow] = useState(false);
    const [slectVlaue, setSlectVlaue] = useState();
    const [customer, setCustomer] = useState({});
    const dispatch = useDispatch();
    const usehistory = useHistory();
    // fetch redux data from store
    const store = useSelector((state) => ({
        driver: get(state, "Driver"),
        inventory: get(state, "Inventory"),
        tax: get(state, "Tax"),
        customer: get(state, "Tax"),
        // chagne this tax to customer when branch implement. to get
    }));
    const { data, loading, error, formLoading } = get(store, "driver");
    const {
        data: inventoryData,
        loading: inventoryLoading,
        error: inventoryError,
    } = get(store, "inventory");
    const {
        data: taxData,
        loading: taxLoading,
        error: taxError,
    } = get(store, "tax");
    const {
        data: customerData,
        loading: customerLoading,
        error: customerError,
    } = get(store, "tax");
    // if inventory is fatching first time
    let options = [];
    map(inventoryData, (value, index) => {
        options.push(
            <option key={index} value={value.id}>
                {value.label}
            </option>
        );
    });
    // if inventory is fatching first time
    let taxoption = [];
    map(taxData, (value, index) => {
        taxoption.push(
            <option key={`tax_${index}`} value={value.id}>
                {value.label}
            </option>
        );
    });
    // if inventory is fatching first time
    let customeroption = [];
    map(customerData, (value, index) => {
        customeroption.push(
            <option key={`customer_${index}`} value={value.id}>
                {value.label}
            </option>
        );
    });
    // component did mount alternative for functional component
    useEffect(() => {
        dispatch(
            setBreadcrumbItems("Invoices", [
                { title: "Dashboard", link: "/dashboard" },
                { title: "Invoices", link: "/invoices" },
            ])
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // if contacts is fatching first time
    if (loading) {
        return <div>Loading...</div>;
    }
    // somthing wrong first time
    if (error) {
        return <div>Error</div>;
    }
    // unconditional error occur
    if (!data) {
        return null;
    }
    // on sort end fn trigger
    const onSortEnd = ({ oldIndex, newIndex }) =>
        setStateData(arrayMove(stateData, oldIndex, newIndex));
    //  change quanitty fn
    const quanittyHandler = (rowId, value, name) => {
        const valueSOrted = stateData.slice();

        if (name == "description") {
            valueSOrted[rowId][name] = value;
        } else {
            const valueSOrted = stateData.slice();

            const valueCasted = parseInt(value);

            if (isNaN(valueCasted) || Math.abs(valueCasted) === 0) {
                valueSOrted[rowId][name] = 1;
            } else {
                valueSOrted[rowId][name] = Math.abs(valueCasted);
            }
        }
        setStateData([...valueSOrted]);
    };
    // change item select
    const selectHandler = (rowId, value) => {
        const valueSOrted = stateData.slice();
        const indexStore = findIndex(inventoryData, (o) => {
            return o.id === value;
        });
        const inventoryObject = get(inventoryData, indexStore);
        set(valueSOrted, `${rowId}.item`, value);
        set(
            valueSOrted,
            `${rowId}.description`,
            get(inventoryObject, "description")
        );
        set(valueSOrted, `${rowId}.price`, get(inventoryObject, "price"));
        setStateData([...valueSOrted]);
        setErrorMessage(null);
    };
    // tax select
    const taxHandler = (rowId, value) => {
        const valueSOrted = stateData.slice();
        const indexStore = findIndex(taxData, (o) => {
            return o.id === value;
        });
        const taxDataObject = get(taxData, indexStore);
        set(valueSOrted, `${rowId}.tax`, value);
        set(
            valueSOrted,
            `${rowId}.taxpercentage`,
            get(taxDataObject, "percentage")
        );
        setStateData([...valueSOrted]);
    };
    // add row on the invoice
    const addProductRow = () => {
        const valueSOrted = stateData.slice();

        valueSOrted.push({ ...rowSample, id: Math.random() });

        setStateData([...valueSOrted]);
    };
    // delete row on the invoice
    const removeProductRow = (rowId) => {
        if (stateData.length > 1) {
            const valueSOrted = stateData.slice();

            valueSOrted.splice(rowId, 1);

            setStateData([...valueSOrted]);
        }
    };
    // create form
    const creatInvoice = (event, values) => {
        let valid = 0;
        map(stateData, (value, index) => {
            if (get(value, "item") === "") {
                valid += 1;
            }
        });
        if (!get(customer, "name")) {
            setErrorMessage("Please select customer.");
            return;
        }
        if (valid === 0) {
            dispatch(
                saveInvoice({
                    user: customer,
                    dateform: stateData,
                    productlist: values,
                    sFn: afterSuccessFn,
                })
            );
        } else {
            setErrorMessage("Please select product.");
        }
    };
    // choose a diifferent call
    const chooseCustomer = () => {
        setShow(true);
    };
    // modalclose fn
    const modalClose = () => setShow(false);
    // slect customer fn
    const selectCustomer = (e) => setSlectVlaue(get(e, "target.value"));
    // set customer data to state
    const setCustomerstate = () => {
        const userIndex = findIndex(customerData, (o) => o.id == slectVlaue);
        if (userIndex != -1) {
            // change when you attached customer redux store
            setCustomer({
                name: get(customerData, `[${userIndex}].label`),
                address1: get(customerData, `[${userIndex}].label`),
                address2: get(customerData, `[${userIndex}].label`),
            });
            setShow(false);
        }
    };
    // after sucess call fn
    const afterSuccessFn = ({ success, message }) => {
        if (success) {
            usehistory.push("./invoices");
        } else {
            // if invoice fail
            // console.log(message);
        }
    };

    return (
        <Fragment>
            <Rowtable>
                <Col xs="12">
                    <Card>
                        <CardBody>
                            <Rowtable>
                                <Col xs="12">
                                    <div className="invoice-title">
                                        <h3 className="mt-0">
                                            <img
                                                src={darkimg}
                                                alt="logo"
                                                height="24"
                                            />
                                        </h3>
                                    </div>
                                    <hr />
                                </Col>
                            </Rowtable>
                            <AvForm onValidSubmit={creatInvoice}>
                                <InvoiceDate
                                    choosefn={chooseCustomer}
                                    customer={customer}
                                />
                                <Rowtable>
                                    <Col xs="12">
                                        <div>
                                            <div className="p-2">
                                                <h3 className="font-size-16">
                                                    <strong>
                                                        Order summary
                                                    </strong>
                                                </h3>
                                            </div>
                                            <div>
                                                <div className="table-responsive">
                                                    <DragableTable
                                                        onSortEnd={onSortEnd}
                                                        useDragHandle
                                                        calculation={stateData}
                                                        addrow={addProductRow}
                                                    >
                                                        {stateData.map(
                                                            (value, index) => (
                                                                <DragableItem
                                                                    key={`item-${index}`}
                                                                    index={
                                                                        index
                                                                    }
                                                                    item={value}
                                                                    rowid={
                                                                        index
                                                                    }
                                                                    selectoption={
                                                                        options
                                                                    }
                                                                    taxoption={
                                                                        taxoption
                                                                    }
                                                                    quanityhandler={
                                                                        quanittyHandler
                                                                    }
                                                                    selecthandler={
                                                                        selectHandler
                                                                    }
                                                                    taxHandler={
                                                                        taxHandler
                                                                    }
                                                                    removerow={
                                                                        removeProductRow
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </DragableTable>
                                                </div>
                                                <div className="d-print-none">
                                                    <Rowtable>
                                                        <Col>
                                                            {errorMessage && (
                                                                <Alert
                                                                    color="danger"
                                                                    className="mt-2"
                                                                >
                                                                    {
                                                                        errorMessage
                                                                    }
                                                                </Alert>
                                                            )}
                                                        </Col>
                                                        <Col>
                                                            <div className="float-right">
                                                                <Button
                                                                    type="submit"
                                                                    color="primary"
                                                                    className="mt-3 mr-1"
                                                                    name="submit"
                                                                >
                                                                    Create
                                                                    Invoice
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                    </Rowtable>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Rowtable>
                            </AvForm>
                        </CardBody>
                    </Card>
                </Col>
            </Rowtable>

            {show && (
                <Modal
                    show={show}
                    close={modalClose}
                    title="change customer"
                    size="xs"
                >
                    <Rowtable>
                        <Col xs="8">
                            <ItemSelect
                                changefn={selectCustomer}
                                value={slectVlaue}
                                name="selectcustomer"
                            >
                                {customeroption}
                            </ItemSelect>
                        </Col>
                        <Col>
                            <Button color="primary" onClick={setCustomerstate}>
                                Ok
                            </Button>
                        </Col>
                    </Rowtable>
                </Modal>
            )}
        </Fragment>
    );
}
