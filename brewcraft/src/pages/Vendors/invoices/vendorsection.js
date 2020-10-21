import { get, map } from "lodash";
import React, { Fragment, useContext, useCallback, useMemo } from "react";
import { Col, Row, FormGroup, Label, Input } from "reactstrap";
import { ItemSelectAV } from "../../../component/item-select";
import { AvField, AvInput } from "availity-reactstrap-validation";
import ItemExpenseContext from "./item-expense-context";
/**
 *
 * @param {any} vendor for pre filled the form data
 * @description PO header section
 * @author Anuj Gupta
 *
 */
export default function Vendorsection({ vendor }) {
 
  const selectOption = useContext(ItemExpenseContext);

  /**
   *
   * @param {any} vendorData data from vendor reducer
   *
   */
  const vendorOption = (vendorData) =>
    map(vendorData, (value, index) => {
      console.log(value);
      return (
        <option value={get(value, "id")} key={`${index}_vendor`}>
          {get(value, "label")}
        </option>
      );
    });

  /**
   *
   *  @description Option List creating for select
   * 
   */
  const renderSelect = useCallback(
    () => vendorOption(get(selectOption, "vendors")),
    [get(selectOption, "vendors")]
  );

  const renderSelectCurrency = useCallback(
    () => vendorOption(get(selectOption, "currency")),
    [get(selectOption, "currency")]
  );

  // useMemo()
  return (
    <Fragment>
      <Row>
        <Col>
          <FormGroup row>
            <Label for="example-text-input" className="col-sm-3 col-form-label">
              Vendor
            </Label>
            <Col sm="7">
              <ItemSelectAV
                value={get(vendor, "vendors")}
                name="vendor"
                required={true}
              >
                {renderSelect()}
              </ItemSelectAV>
            </Col>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup row>
            <Label for="example-text-input" className="col-sm-3 col-form-label">
              Date
            </Label>
            <Col sm="7">
              <AvField
                type="datetime-local"
                name="date"
                placeholder="Please Enter Date"
                errorMessage="Please Enter Date"
                validate={{ required: { value: true } }}
                value={get(vendor, "date")}
              />
            </Col>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup row>
            <Label for="example-text-input" className="col-sm-3 col-form-label">
              Bill #
            </Label>
            <Col sm="7">
              <AvField
                type="text"
                name="bill"
                validate={{ required: { value: false } }}
                value={get(vendor, "bill")}
              />
            </Col>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup row>
            <Label for="example-text-input" className="col-sm-3 col-form-label">
              Currency
            </Label>
            <Col sm="7">
              <ItemSelectAV
                value={get(vendor, "currency")}
                name="currency"
                required={true}
              >
                {renderSelectCurrency()}
                </ItemSelectAV>
            </Col>
          </FormGroup>
        </Col>
        <Col>
          <Row>
            <Col>
              <FormGroup row>
                <Label
                  for="example-text-input"
                  className="col-sm-3 col-form-label"
                >
                  Due Date
                </Label>
                <Col sm="7">
                  <AvField
                    type="datetime-local"
                    name="dueDate"
                    placeholder="Please Enter Date"
                    errorMessage="Please Enter Date"
                    validate={{ required: { value: true } }}
                    value={get(vendor, "dueDate")}
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup row>
                <Label
                  for="example-text-input"
                  className="col-sm-3 col-form-label"
                >
                  P.O./S.O.
                </Label>
                <Col sm="7">
                  <AvField
                    type="text"
                    name="po_so"
                    validate={{ required: { value: false } }}
                    value={get(vendor, "po_so")}
                  />
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </Col>
        <Col>
          <FormGroup row>
            <Label for="example-text-input" className="col-sm-3 col-form-label">
              Notes
            </Label>
            <Col sm="7">
              <AvInput
                type="textarea"
                name="notes"
                placeholder="notes"
                required
                rows="3"
                value={get(vendor, "notes")}
              />
            </Col>
          </FormGroup>
        </Col>
      </Row>
    </Fragment>
  );
}
