import React,{useCallback} from "react";
import { MDBDataTable } from "mdbreact";
import {map} from "lodash"
export default function RawMaterials({data, editFn}) {
  const tabledata = [
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 300,
    },
    {
      label: "Category",
      field: "category",
      sort: "asc"
    },
    {
      label: "Available",
      field: "quantity",
      sort: "asc"
    }
  ];
  const rowEvent = useCallback(() => {
    return map(data, (row) => {
      return {
        ...row,
        cName: (
          <span onClick={() => editFn(row.id)} className="btnParent">
              {row.cName}
         </span>
        )
      };
    });
  }, [data]);
  return (
    <MDBDataTable
      responsive
      bordered
      data={{
        columns: tabledata,
        rows: rowEvent(),
      }}
    />
  );
}
