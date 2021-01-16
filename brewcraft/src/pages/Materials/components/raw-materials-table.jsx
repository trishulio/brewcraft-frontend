import React,{useCallback} from "react";
import { MDBDataTable } from "mdbreact";
import {map} from "lodash"
export default function RawMaterials({facilities, editFn}) {
  const tabledata = [
    {
      label: "Name",
      field: "cName",
      sort: "asc",
      width: 150,
      // <onClick: className="0">.</onClick:>,
    },
    {
      label: "Type",
      field: "firstName",
      sort: "asc",
      width: 270,
    },
    {
      label: "Status",
      field: "phoneNumber",
      sort: "asc",
      width: 200,
    },
    {
      label: "Capacity",
      field: "email",
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
        )
      };
    });
  }, [facilities]);
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
