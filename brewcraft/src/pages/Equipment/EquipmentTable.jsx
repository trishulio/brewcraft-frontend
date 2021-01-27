import React, { useCallback } from "react";
import { MDBDataTable } from "mdbreact";
import { map } from "lodash";
import {Button} from "reactstrap";
/**
 *
 * @param {Object} facilities facilities should be non-empty array object for table rendering
 * @param {Function}  editFn non-mandatory javascript function
 */
export default function EquipmentTable({ facilities, editFn }) {
  const tabledata = [
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 150,
      // attributes: {
      //   'aria-controls': 'name',
      //   'aria-label': 'Name',
      // },
    },
    {
      label: "Status",
      field: "status",
      sort: "asc",
      width: 270,
    },
    {
      label: "Type",
      field: "type",
      sort: "asc",
      width: 200,
    },
    {
      label: "value",
      field: "value",
      sort: "asc",
      width: 200,
    },
    {
      label: "symbol",
      field: "symbol",
      sort: "asc",
      width: 200,
    },
  ];
  const rowEvent = useCallback(() => {
    return map(facilities, (row) => {
      return {
        ...row,
        name: (
          <Button color="link" onClick={() => editFn(row.id)} className="btnParent">
            {row.name}
          </Button>
        ),
      };
    });
  }, [facilities]);
  return (
    <MDBDataTable
      responsive
      hover
      bordered
      data={{
        columns: tabledata,
        rows: rowEvent(),
      }}
    />
  );
}
