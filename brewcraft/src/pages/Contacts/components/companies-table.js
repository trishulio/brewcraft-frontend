import React, { useCallback } from "react";
import { Button } from '@material-ui/core';
import { map } from "lodash";
import ReactBootstrapTable from '../../../component/Tables/tables-react-bootstrap';

export default function CompaniesTable({ data, editCompany, deleteCompany, addCompany, refreshTable }) {

  const columns = [{
    text: "Name",
    dataField: "name",
    sort: false
  },
  {
    text: "Address",
    dataField: "address",
    sort: false
  },
  {
    text: "Country",
    dataField: "country",
    sort: false
  },
  {
    text: "Province",
    dataField: "province",
    sort: false
  },
  {
    text: "City",
    dataField: "city",
    sort: false
  },
  {
    text: "Postal Code",
    dataField: "postalCode",
    sort: false
  }
  ];

  const rowEvent = useCallback(() => {
    return map(data, (row) => {
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
  }, [data]);

  const onDelete = (rowsSelected) => {
    const idsToDelete = rowsSelected?.map(d => data[d].id); // array of all ids to to be deleted
    idsToDelete.map((id) => deleteCompany(id));
  }

  const onEdit = (rowsSelected) => {
    const idToEdit = data[rowsSelected[0]].id;
    editCompany(idToEdit);
  }

  return (
    <ReactBootstrapTable
      columns={columns}
      data={rowEvent()}
      tableName="Company"
      editAction={onEdit}
      deleteAction={onDelete}
      addAction={addCompany}
      refreshAction={refreshTable}
    />
  )
}