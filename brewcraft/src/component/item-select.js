import React, { Fragment } from "react";
import { Input } from "reactstrap";
import { AvField } from "availity-reactstrap-validation";

/**
 * @param {any} value 
 * @param {string} name required 
 * @param {function} changefn required 
 * @returns {} react component (select)
 */
export function ItemSelect(props) {
  const { changefn, value, name } = props;

  return (
    <Fragment>
      <Input type="select" name={name} onChange={changefn} value={value}>
        <option value="" disabled defaultValue="">
          Select{" "}
        </option>
        {props.children}
      </Input>
    </Fragment>
  );
}
/**
 * use this fields into the AVForm Validation
 * @author	Anuj Gupta
 * @param {any} value 
 * @param {string} name required 
 * @param {boolean} required 
 * @param {string} label  
 * @returns {} react component (select)
 */
export function ItemSelectAV(props) {
  const { value, name, required, label } = props;
  /**
   * conditioanl props
   */
  const selectprop = {
    ...(required && required),
    ...(label && label),
    ...(value && { value: value }),
  };
  /**
   * conditioanl props
   */

  return (
    <Fragment>
      <AvField type="select" name={name} {...selectprop}>
        <option value="" disabled {...(!value && { value: "" })}>
          Select{" "}
        </option>
        {props.children}
      </AvField>
    </Fragment>
  );
}
