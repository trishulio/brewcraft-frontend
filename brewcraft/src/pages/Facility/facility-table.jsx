import React, { useCallback } from "react";
import { MDBDataTable } from "mdbreact";
import { map } from "lodash";
/**
 * 
 * @param {Object} facilities facilities should be non-empty array object for table rendering
 * @param {Function}  editFn non-mandatory javascript function
 */
export default function FacilityTable({ facilities, editFn }) {
  const tabledata = [
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 150,
      // <onClick: className="0">.</onClick:>,
    },
    {
      label: "Phone Number",
      field: "phoneNumber",
      sort: "asc",
      width: 270,
    },
    {
      label: "Address Line 1",
      field: "addressLine1",
      sort: "asc",
      width: 200,
    },
    {
      label: "Address Line 2",
      field: "addressLine2",
      sort: "asc",
      width: 200,
    },
    {
      label: "City",
      field: "city",
      sort: "asc",
      width: 200,
    },
    {
      label: "Country",
      field: "country",
      sort: "asc",
      width: 200,
    },
  ];
  const rowEvent = useCallback(() => {
    return map(facilities, (row) => {
      return {
        ...row,
        cName: (
          <span onClick={() => editFn(row.id)} className="btnParent">
            {row.cName}
          </span>
        ),
      };
    });
  }, [facilities]);
  return (
    <MDBDataTable
      responsive
      striped
      scrollY
      maxHeight="500px"
      data={{
        columns: tabledata,
        rows: rowEvent(),
      }}
    />
  );
}
