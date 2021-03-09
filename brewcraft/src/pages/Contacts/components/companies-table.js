import React,{useCallback} from "react";
import { MDBDataTable } from "mdbreact";
import {map} from "lodash";
import {
  Button
} from 'reactstrap';

export default function CompaniesTable({companies, editCompany, deleteCompany}) {
  const columns = [
    {
      label: "Name",
      field: "name",
      sort: "asc",
      width: 200
    },
    {
      label: "Address",
      field: "address",
      sort: "asc",
      width: 200
    },
    {
      label: "Country",
      field: "country",
      sort: "asc",
      width: 100,
    },
    {
      label: "Province",
      field: "province",
      sort: "asc",
      width: 100,
    },
    {
      label: "City",
      field: "city",
      sort: "asc",
      width: 100,
    },
    {
      label: "Postal Code",
      field: "postalCode",
      sort: "asc",
      width: 100,
    },
    {
      label: "",
      field: "edit"
    },
    {
      label: "",
      field: "delete"
    }
  ];
  const rowEvent = useCallback(() => {
    return map(companies, (row) => {
      const address = row.address || {};
      return {
        ...row,
        address: address.addressLine1 + (address.addressLine2 ? " " + address.addressLine2 : ""),
        country: address.country,
        city: address.city,
        province: address.province,
        postalCode: address.postalCode,
        edit: (
          <Button onClick={() => editCompany(row.id)}>Edit</Button>
        ),
        delete: (
          <Button onClick={() => deleteCompany(row.id)}>Delete</Button>
        )
      };
    });
  }, [companies]);
  return (
    <MDBDataTable
      responsive
      bordered
      data={{
        columns: columns,
        rows: rowEvent()
      }}
    />
  );
}
