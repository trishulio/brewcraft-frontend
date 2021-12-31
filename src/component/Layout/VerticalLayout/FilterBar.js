import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import {
    Button,
    Col,
    Collapse,
    FormGroup,
    Input,
    Label,
    Nav,
    Row,
} from "reactstrap";
import { toggleFilterBar } from "../../../store/FilterBar/actions";

const ARROW_RIGHT_ICON = "ion ion-ios-arrow-forward";
const ARROW_DOWN_ICON = "ion ion-ios-arrow-down";

export const FilterBarIcon = () => {
    const { visible } = useSelector((state) => state.FilterBar);
    const dispatch = useDispatch();
    const location = useLocation();
    const pagesKey = location.pathname.replace(/\//g, "");

    return (
        <Button
            type="button"
            size="sm"
            className="waves-effect float-right mr-2 my-2 "
            outline={true}
            onClick={() => {
                dispatch(toggleFilterBar(pagesKey));
            }}
            style={{
                backgroundColor: visible[pagesKey] && "#7a6fbe",
                color: visible[pagesKey] && "#FFFFFF",
                borderColor: "#ced4da",
            }}
        >
            <i className="mdi mdi-filter font-size-12 p-0" />
        </Button>
    );
};

export const FilterBar = ({
    label = "Invoice",
    onSubmitFilter,
    data,
    submitDisabled,
    clearFilter,
}) => {
    const [collapsed, setCollapsed] = useState({});
    const { visible } = useSelector((state) => state.FilterBar);
    const location = useLocation();
    const pagesKey = location.pathname.replace(/\//g, "");

    const dispatch = useDispatch();

    function handleCollapse(field) {
        setCollapsed({
            ...collapsed,
            [field]: !collapsed[field],
        });
    }

    function renderSubFilter(data) {
        let fieldType = `search-field-${label}-${data.label}`;
        switch (data.type) {
            case "select":
                return renderSelectFilter(data, fieldType);
            case "select-multiple":
                return renderMultiSelectFilter(data, fieldType);
            case "date":
                return renderDateFilter(data, fieldType);
            case "input":
                return renderInputFilter(data, fieldType);
            case "input-range":
                return renderInputRangeFilter(data, fieldType);

            default:
                break;
        }
    }

    function renderSelectFilter(data, fieldType) {
        return (
            <Col key={`${data.id}`} className="p-2">
                <Label
                    type="button"
                    className="font-weight-bold font-size-14"
                    onClick={() => handleCollapse(fieldType)}
                >
                    <i
                        className={
                            collapsed[fieldType]
                                ? ARROW_DOWN_ICON
                                : ARROW_RIGHT_ICON
                        }
                    />{" "}
                    &nbsp;{data.label}
                </Label>
                <Collapse isOpen={collapsed[fieldType]} id={fieldType}>
                    <Select
                        name={fieldType}
                        value={data.value}
                        placeholder={`Select ${data.label.toLowerCase()}`}
                        options={data.options}
                        onChange={data.onChange}
                    />
                </Collapse>
            </Col>
        );
    }

    function renderMultiSelectFilter(data, fieldType) {
        return (
            <Col key={`${data.id}`} className="p-2">
                <Label
                    type="button"
                    className="font-weight-bold font-size-14"
                    onClick={() => handleCollapse(fieldType)}
                >
                    <i
                        className={
                            collapsed[fieldType]
                                ? ARROW_DOWN_ICON
                                : ARROW_RIGHT_ICON
                        }
                    />{" "}
                    &nbsp;{data.label}
                </Label>
                <Collapse isOpen={collapsed[fieldType]} id={fieldType}>
                    <Select
                        isMulti
                        name={fieldType}
                        value={data.value}
                        defaultValue={data.defaultValue && data.defaultValue}
                        placeholder={`Select ${data.label.toLowerCase()}`}
                        options={data.options}
                        onChange={data.onChange}
                        styles={{
                            control: (styles) => ({
                                ...styles,
                                width: "240px",
                                "@media screen and (max-width: 750px)": {
                                    width: "100%",
                                },
                            }),
                        }}
                    />
                </Collapse>
            </Col>
        );
    }

    function renderDateFilter(data, fieldType) {
        return (
            <Col key={`${data.id}`} className="p-2">
                <Label
                    type="button"
                    className="font-weight-bold font-size-14"
                    onClick={() => handleCollapse(fieldType)}
                >
                    <i
                        className={
                            collapsed[fieldType]
                                ? ARROW_DOWN_ICON
                                : ARROW_RIGHT_ICON
                        }
                    />{" "}
                    &nbsp;{data.label}
                </Label>
                <Collapse isOpen={collapsed[fieldType]}>
                    <FormGroup className="waves-effect mb-2">
                        <Label
                            for="purchaseInvoicesFromDate"
                            className="waves-effect mt-1 mb-1"
                        >
                            From
                        </Label>
                        <Input
                            type="date"
                            name="purchaseInvoicesFromDate"
                            value={data.valueFrom}
                            onChange={data.onChangeFrom}
                        />
                        <Label
                            for="purchaseInvoicesToDate"
                            className="waves-effect mt-2"
                        >
                            To
                        </Label>
                        <Input
                            type="date"
                            name="purchaseInvoicesToDate"
                            className="waves-effect"
                            value={data.valueTo}
                            onChange={data.onChangeTo}
                        />
                        <Button
                            type="button"
                            color="primary"
                            size="sm"
                            className="waves-effect mt-2"
                            disabled={data.disabled}
                            onClick={data.onReset}
                        >
                            Reset
                        </Button>
                    </FormGroup>
                </Collapse>
            </Col>
        );
    }

    function renderInputFilter(data, fieldType) {
        return (
            <Col key={`${data.id}`} className="p-2">
                <Label
                    type="button"
                    className="font-weight-bold font-size-14"
                    onClick={() => handleCollapse(fieldType)}
                >
                    <i
                        className={
                            collapsed[fieldType]
                                ? ARROW_DOWN_ICON
                                : ARROW_RIGHT_ICON
                        }
                    />{" "}
                    &nbsp;{data.label}
                </Label>
                <Collapse isOpen={collapsed[fieldType]} id={fieldType}>
                    {(data.inputType === "radio" ||
                        data.inputType === "checkbox") &&
                        data.options?.map((o) => {
                            return (
                                <Row
                                    key={`${o.id}`}
                                    className="row px-3 mb-1 align-items-center"
                                >
                                    <input
                                        id={`${o.value}0${o.id + 1}`}
                                        value={o.value}
                                        name={o.label}
                                        type={data.inputType}
                                        onChange={o.onChange}
                                        checked={o.checked}
                                        disabled={o.disabled}
                                    />
                                    <span
                                        className="pl-2"
                                        style={{ maxWidth: "90%" }}
                                    >
                                        {o.label}
                                    </span>
                                </Row>
                            );
                        })}

                    {data.inputType === "text" && (
                        <Input
                            value={data.value}
                            name={data.label}
                            onChange={data.onChange}
                            placeholder={`${label} ${data.label.toLowerCase()}`}
                        />
                    )}
                </Collapse>
            </Col>
        );
    }

    function renderInputRangeFilter(data, fieldType) {
        return (
            <Col key={`${data.id}`} className="p-2">
                <Label
                    type="button"
                    className="font-weight-bold font-size-14"
                    onClick={() => handleCollapse(fieldType)}
                >
                    <i
                        className={
                            collapsed[fieldType]
                                ? ARROW_DOWN_ICON
                                : ARROW_RIGHT_ICON
                        }
                    />{" "}
                    &nbsp;{data.label}
                </Label>
                <Collapse isOpen={collapsed[fieldType]} id={fieldType}>
                    <Row>
                        <Col>
                            <Label
                                for={`${data.label}FromDate`}
                                className="waves-effect mb-1"
                            >
                                From
                            </Label>
                            <Input
                                type={data.inputType}
                                name={`${data.label}FromDate`}
                                value={data.valueFrom}
                                onChange={data.onChangeFrom}
                            />
                        </Col>
                        <Col>
                            <Label
                                for={`${data.label}ToDate`}
                                className="waves-effect mb-1"
                            >
                                To
                            </Label>
                            <Input
                                type={data.inputType}
                                name={`${data.label}ToDate`}
                                className="waves-effect"
                                value={data.valueTo}
                                onChange={data.onChangeTo}
                            />
                        </Col>
                    </Row>
                </Collapse>
            </Col>
        );
    }

    function toggleSidebar() {
        dispatch(toggleFilterBar());
    }
    return (
        <Col
            xs={12}
            style={{
                maxWidth: visible[pagesKey] && "280px",
                position: !visible[pagesKey] && "fixed",
            }}
        >
            <Nav
                key={`sidebar-filter-${label}`}
                vertical
                className={
                    visible[pagesKey]
                        ? `filter-bar-menu filter-open`
                        : `filter-bar-menu`
                }
                style={{ backgroundColor: "whitesmoke" }}
            >
                <div className="d-flex flex-column h-100">
                    <Col
                        className="filter-bar-top-content waves-effect"
                        style={{ flex: 0.5 }}
                        onClick={toggleSidebar}
                    >
                        <div type="button" className="float-right px-2 py-3">
                            Hide <i className="ion ion-md-close" />
                        </div>
                        <div>
                            <Label
                                className="d-flex py-2 bottom-0"
                                style={{ position: "absolute", bottom: 0 }}
                            >
                                Add filters
                            </Label>
                        </div>
                    </Col>
                    <Col
                        className="p-2 flex-4"
                        style={{ flex: 4, overflow: "auto" }}
                    >
                        {data.map((filter) => {
                            return renderSubFilter(filter);
                        })}
                        <div
                            style={{
                                display: "flex",
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                type="button"
                                color="primary"
                                className="d-inline-block waves-effect m-2 float-bottom"
                                style={{
                                    flex: 3,
                                    maxWidth: "200px",
                                }}
                                disabled={submitDisabled}
                                onClick={onSubmitFilter}
                            >
                                Apply Filters
                            </Button>
                            <Button
                                type="button"
                                color="secondary"
                                className="d-inline-block waves-effect m-2 float-bottom"
                                style={{
                                    flex: 1,
                                    maxWidth: "200px",
                                }}
                                onClick={clearFilter}
                            >
                                Clear
                            </Button>
                        </div>
                    </Col>
                </div>
            </Nav>
        </Col>
    );
};

export const stateToOptionsMultiple = (array) => {
    return array.map((x) => {
        return {
            value: x.id,
            label: x.name,
        };
    });
};
