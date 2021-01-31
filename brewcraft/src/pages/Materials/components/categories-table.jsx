import React,{useCallback} from "react";
import { MDBDataTable } from "mdbreact";
import {map} from "lodash"
export default function MaterialsTable({data, editFn}) {
  const tabledata = [
    {
      label: "Category",
      field: "categoryName",
      sort: "asc",
      width: 300
    },
    {
      label: "Parent",
      field: "parentCategory",
      sort: "asc",
      width: 300
    },
    {
      label: "# Materials",
      field: "categoryQuantity",
      sort: "asc",
      width: 50
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
