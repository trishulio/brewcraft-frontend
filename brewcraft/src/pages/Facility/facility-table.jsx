import React from "react";
import { MDBDataTableV5 } from "mdbreact";

/**
 *
 * @param {Object} facilities facilities should be non-empty array object for table rendering
 * @param {Function}  editFn non-mandatory javascript function
 */

export default function FacilityTable({ facilities, editFn }) {
  return (
    <div>
      <MDBDataTableV5
        hover
        data={facilities}
        responsive
        striped
        scrollY
        maxHeight="500px"
        materialSearch
      >
        <div>search anuj </div>
        </MDBDataTableV5>
    </div>
  );
}
