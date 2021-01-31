import React,{useCallback} from "react";
import { MDBDataTable } from "mdbreact";
import {map} from "lodash";

export default function VendorListTable({suppliers, editCompany, editContact}) {
  const tabledata = [
    {
      label: "Name",
      field: "contactName",
      sort: "asc",
      width: 200,
      onClick: editContact
    },
    {
      label: "Company",
      field: "companyName",
      sort: "asc",
      width: 200,
      onClick: editCompany
    },
    {
      label: "Phone",
      field: "phoneNumber",
      sort: "asc",
      width: 100,
    },
    {
      label: "Email",
      field: "email",
      sort: "asc",
      width: 100,
    }
  ];
  const rowEvent = useCallback(() => {
    return map(suppliers, (row) => {
      return {
        ...row,
        contactName: (
          <span style={{cursor: "pointer"}} onClick={() => editContact(row.id)} className="btn-link">
              {row.firstName}
          </span>
        ),
        companyName: (
          <span style={{cursor: "pointer"}} onClick={() => editCompany(row.cId)} className="btn-link">
              {row.cName}
         </span>
        )
      };
    });
  }, [suppliers]);
  return (
    <MDBDataTable
      responsive
      bordered
      data={{
        columns: tabledata,
        rows: rowEvent()
      }}
    />
  );
}
