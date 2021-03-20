import React from "react";
import { MDBDataTable } from "mdbreact";

/**
 *
 * @param {Object} facilities facilities should be non-empty array object for table rendering
 * @param {Function}  editFn non-mandatory javascript function
 */

export default function FacilityTable({ facilities, editFn }) {
  return (
    <div>
      <MDBDataTable
        hover
        data={facilities}
        responsive
        striped
        scrollY
        maxHeight="500px"
      />
    </div>
  );
}
