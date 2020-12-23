import React,{useCallback} from "react";
import { MDBDataTable } from "mdbreact";
import {map} from "lodash"
export default function VendorListTable({suppliers, editCompany, editContact}) {
  const tabledata = [
    {
      label: "Company Name",
      field: "cName",
      sort: "asc",
      width: 150,
      onClick:editCompany,
    },
    {
      label: "Contact",
      field: "firstName",
      sort: "asc",
      width: 270,
    },
    {
      label: "Phone",
      field: "phoneNumber",
      sort: "asc",
      width: 200,
    },
    {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 200,
    },
  ];
  const rowEvent = useCallback(() => {
    return map(suppliers, (row) => {
      return {
        ...row,
        cName: (
          <span onClick={() => editCompany(row.cId)} className="btnParent">
              {row.cName}
         </span>
        ),
        firstName: (
          <span onClick={() => editContact(row.id)} className="btnParent">
              {row.firstName}
          </span>
        ),
      };
    });
  }, [suppliers]);
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
