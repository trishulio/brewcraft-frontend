import React,{useCallback} from "react";
import { MDBDataTable } from "mdbreact";
import {map} from "lodash";
import {
  Button
} from 'reactstrap';

export default function ContactsTable({data, editCompany, editContact, deleteContact}) {
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
    },
    {
      label: "",
      field: "edit"
    },{
      label: "",
      field: "delete"
    }
  ];
  const rowEvent = useCallback(() => {
    return map(data, (row) => {
      return {
        ...row,
        contactName: row.firstName,
        companyName: row.supplier.name,
        edit: (
          <Button onClick={() => editContact(row.id)}>Edit</Button>
        ),
        delete: (
          <Button onClick={() => deleteContact(row.id)}>Delete</Button>
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
        rows: rowEvent()
      }}
    />
  );
}
