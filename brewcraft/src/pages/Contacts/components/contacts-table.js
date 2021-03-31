import React, { useCallback } from "react";
import { Button } from '@material-ui/core';
import { map } from "lodash";
import ReactBootstrapTable from '../../../component/Tables/tables-react-bootstrap';

export default function ContactsTable({ data, editContact, deleteContact, addContact, refreshTable }) {

  const columns = [{
    text: "First Name",
    dataField: "contactName",
    sort: true
  }, {
    text: "Last Name",
    dataField: "lastName",
    sort: true
  }, {
    text: "Company",
    dataField: "companyName",
    sort: true
  }, {
    text: "Position",
    dataField: "position",
    sort: false,
  }, {
    text: "Phone",
    dataField: "phoneNumber",
    sort: false
  }, {
    text: "Email",
    dataField: "email",
    sort: false
  }];


  const onDelete = (rowsSelected) => {
    const idsToDelete = rowsSelected?.map(d => data[d].id); // array of all ids to to be deleted
    idsToDelete.map((id) => deleteContact(id));
  }

  const onEdit = (rowsSelected) => {
    const idToEdit = data[rowsSelected[0]].id;
    editContact(idToEdit);
  }

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
    <ReactBootstrapTable
      columns={columns}
      data={rowEvent()}
      tableName="Supplier"
      editAction={onEdit}
      deleteAction={onDelete}
      addAction={addContact}
      refreshAction={refreshTable}
    />
  )
}
