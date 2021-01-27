import React,{useCallback} from "react";
import { MDBDataTable } from "mdbreact";
import {map} from "lodash"
export default function RawMaterials({data, editFn}) {
  const tabledata = [
    {
      label: "Name",
      field: "Name",
      sort: "asc",
      width: 150,
    },
    {
      label: "Type",
      field: "firstName",
      sort: "asc",
      width: 270,
    },
    {
      label: "Available (kg)",
      field: "phoneNumber",
      sort: "asc",
      width: 200,
    },
    {
      label: "Current (s)",
      field: "email",
      sort: "asc",
      width: 200,
    },
    {
      label: "Cost/kg(s/kg)",
      field: "email",
      sort: "asc",
      width: 200,
    },
    {
      label: "Used (kg)",
      field: "email",
      sort: "asc",
      width: 200,
    },
    {
      label: "Waste (kg)",
      field: "email",
      sort: "asc",
      width: 200,
    },
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
